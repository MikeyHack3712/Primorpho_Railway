import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { sendEmail } from "./sendgrid";
import {
  contactFormSchema,
  slotReservationFormSchema,
  auditFormSchema,
  moodBoardFormSchema,
} from "@shared/schema";
import { z } from "zod";
import * as cheerio from "cheerio";
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    res.json({ user: req.user });
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const formData = contactFormSchema.parse(req.body);
      
      const submission = await storage.createContactSubmission({
        ...formData,
        isAuditRequest: !!formData.websiteUrl,
        priority: formData.websiteUrl ? "high" : "normal",
        status: "new"
      });

      // Send email notification
      const isAuditRequest = !!formData.websiteUrl;
      const emailSubject = isAuditRequest 
        ? `🚨 URGENT: Website Audit Request from ${formData.name}`
        : `📬 New Contact: ${formData.name}`;

      const emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: white; padding: 30px; border-radius: 15px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #00ffff; font-size: 28px; margin: 0; text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);">PRIMORPHO</h1>
            <div style="color: #b266ff; font-size: 14px; margin-top: 5px;">NEURAL WEB SOLUTIONS</div>
          </div>
          
          ${isAuditRequest ? `
          <div style="background: rgba(255, 0, 100, 0.1); padding: 15px; margin: 20px 0; border: 2px solid #ff0064; border-radius: 10px; text-align: center;">
            <h2 style="color: #ff0064; margin: 0; font-size: 20px;">⚡ PRIORITY AUDIT REQUEST ⚡</h2>
            <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px;">Website: <strong>${formData.websiteUrl}</strong></p>
          </div>
          ` : ''}
          
          <div style="background: rgba(0, 255, 255, 0.1); padding: 20px; margin: 20px 0; border: 1px solid #00ffff; border-radius: 10px;">
            <h3 style="color: #00ffff; margin-top: 0;">CLIENT DETAILS:</h3>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            ${formData.business ? `<p><strong>Business:</strong> ${formData.business}</p>` : ''}
            ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
            ${formData.package ? `<p><strong>Package Interest:</strong> ${formData.package}</p>` : ''}
          </div>
          
          ${formData.details ? `
          <div style="background: rgba(178, 102, 255, 0.1); padding: 20px; margin: 20px 0; border: 1px solid #b266ff; border-radius: 10px;">
            <h3 style="color: #b266ff; margin-top: 0;">PROJECT DETAILS:</h3>
            <p style="line-height: 1.6;">${formData.details}</p>
          </div>
          ` : ''}
          
          <div style="background: rgba(178, 102, 255, 0.1); padding: 15px; margin: 10px 0; border: 1px solid #b266ff;">
            <h3 style="color: #b266ff;">NEXT ACTIONS:</h3>
            <ul>
              <li>Response deadline: ${isAuditRequest ? '1 hour' : '24 hours'}</li>
              <li>Admin panel: <a href="${process.env.REPLIT_DOMAINS?.split(',')[0] || 'localhost:5000'}/admin" style="color: #00ffff;">View submission</a></li>
              ${isAuditRequest ? '<li>Conduct website audit immediately</li>' : ''}
            </ul>
          </div>
        </div>
      `;

      await sendEmail(process.env.SENDGRID_API_KEY || '', {
        to: 'primorpho.solutions@gmail.com',
        from: 'primorpho.solutions@gmail.com',
        subject: emailSubject,
        html: emailContent
      });

      res.json({ 
        success: true, 
        message: isAuditRequest ? "Audit request submitted! We'll analyze your website and respond within 1 hour." : "Message sent successfully! We'll respond within 24 hours.",
        submission 
      });

    } catch (error: any) {
      console.error("Contact form error:", error);
      res.status(400).json({ 
        success: false, 
        error: error.message || "Failed to submit form" 
      });
    }
  });

  // Instant website analysis with basic metrics
  app.post('/api/audit', async (req, res) => {
    const { websiteUrl: rawUrl } = auditFormSchema.parse(req.body);
    
    // Normalize URL - add https:// if no protocol specified
    let websiteUrl = rawUrl.trim();
    if (!websiteUrl.startsWith('http://') && !websiteUrl.startsWith('https://')) {
      websiteUrl = 'https://' + websiteUrl;
    }
    
    // Basic URL validation
    try {
      new URL(websiteUrl);
    } catch (error) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid URL format. Please enter a valid website address." 
      });
    }
    
    console.log(`Running instant analysis for: ${websiteUrl}`);
    
    try {
      // Fetch website content for analysis
      const startTime = Date.now();
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      
      const response = await fetch(websiteUrl, {
        method: 'GET',
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Primorpho-Audit/1.0)'
        }
      });
      clearTimeout(timeoutId);
      const loadTime = Date.now() - startTime;
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const html = await response.text();
      const $ = cheerio.load(html);

      // Basic performance analysis
      const performanceScore = calculateBasicPerformanceScore(loadTime, html.length);
      
      // SEO analysis
      const seoAnalysis = analyzeSEO($, html);
      
      // Security analysis
      const securityAnalysis = analyzeBasicSecurity($, response);
      
      // Mobile analysis
      const mobileAnalysis = analyzeMobile($);
      
      // Accessibility analysis
      const accessibilityAnalysis = analyzeAccessibility($);
      
      // Calculate overall score
      const overallScore = Math.round((performanceScore.score + seoAnalysis.score + securityAnalysis.score + mobileAnalysis.score + accessibilityAnalysis.score) / 5);

      const auditResult = await storage.createAuditResult({
        websiteUrl,
        loadTime,
        overallScore,
        performanceScore: performanceScore.score,
        seoScore: seoAnalysis.score,
        securityScore: securityAnalysis.score,
        mobileScore: mobileAnalysis.score,
        accessibilityScore: accessibilityAnalysis.score,
        technicalScore: securityAnalysis.score,
        contentScore: seoAnalysis.score,
        recommendations: {
          performance: performanceScore.recommendations,
          seo: seoAnalysis.recommendations,
          security: securityAnalysis.recommendations,
          mobile: mobileAnalysis.recommendations,
          accessibility: accessibilityAnalysis.recommendations,
          technical: securityAnalysis.recommendations,
          priority: [
            ...performanceScore.priority,
            ...seoAnalysis.priority,
            ...securityAnalysis.priority
          ].slice(0, 5)
        }
      });

      console.log(`Instant analysis completed for ${websiteUrl}. Overall score: ${overallScore}`);
      res.json({ success: true, audit: auditResult });

    } catch (error: any) {
      console.error("Analysis error:", error);
      
      // Provide helpful error messages
      let errorMessage = "Unable to analyze website.";
      const suggestions: string[] = [];

      if (error.message.includes('ERR_NAME_NOT_RESOLVED') || error.message.includes('ENOTFOUND')) {
        errorMessage = "Website not found. Please check the URL is correct.";
        suggestions.push("Verify the website URL is spelled correctly");
        suggestions.push("Ensure the website is currently accessible");
        suggestions.push("Check if the domain exists and is active");
      } else if (error.message.includes('ERR_CONNECTION_REFUSED') || error.message.includes('ECONNREFUSED')) {
        errorMessage = "Connection refused. The website may be blocking requests.";
        suggestions.push("Try again in a few minutes");
        suggestions.push("Check if the website is experiencing downtime");
      } else if (error.name === 'AbortError' || error.message.includes('timeout')) {
        errorMessage = "Website took too long to respond (15+ seconds).";
        suggestions.push("Website has slow loading times");
        suggestions.push("Try again shortly");
        suggestions.push("Consider performance optimization");
      } else if (error.message.includes('HTTP 4') || error.message.includes('HTTP 5')) {
        errorMessage = "Website returned an error response.";
        suggestions.push("Website may be temporarily experiencing issues");
        suggestions.push("Check website status and try again");
      } else {
        suggestions.push("Verify the website is accessible in your browser");
        suggestions.push("Try again shortly");
        suggestions.push("Contact us if the issue persists");
      }

      try {
        const errorRecord = await storage.createAuditResult({
          websiteUrl,
          loadTime: 0,
          overallScore: 0,
          performanceScore: 0,
          seoScore: 0,
          securityScore: 0,
          mobileScore: 0,
          accessibilityScore: 0,
          technicalScore: 0,
          contentScore: 0,
          recommendations: {
            error: errorMessage,
            suggestions: suggestions
          }
        });

        res.json({ success: true, audit: errorRecord });
      } catch (dbError) {
        console.error("Database error:", dbError);
        res.status(500).json({ success: false, error: "Internal server error" });
      }
    }
  });

  // Slot reservation endpoint
  app.post("/api/reserve-slot", async (req, res) => {
    try {
      const formData = slotReservationFormSchema.parse(req.body);
      
      const reservation = await storage.createSlotReservation({
        ...formData,
        status: "pending"
      });

      res.json({ success: true, message: "Slot reserved successfully!", reservation });
    } catch (error: any) {
      console.error("Slot reservation error:", error);
      res.status(400).json({ success: false, error: error.message || "Failed to reserve slot" });
    }
  });

  // Mood board generation endpoint
  app.post("/api/mood-board", async (req, res) => {
    try {
      const formData = moodBoardFormSchema.parse(req.body);
      
      const generatedBoard = generateMoodBoard(formData);
      
      const moodBoard = await storage.createMoodBoard({
        ...formData,
        generatedBoard,
        status: "generated"
      });

      res.json({ success: true, moodBoard });
    } catch (error: any) {
      console.error("Mood board error:", error);
      res.status(400).json({ success: false, error: error.message || "Failed to generate mood board" });
    }
  });

  // Admin routes
  app.get("/api/admin/submissions", isAuthenticated, async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch submissions" });
    }
  });

  app.get("/api/admin/reservations", isAuthenticated, async (req, res) => {
    try {
      const reservations = await storage.getSlotReservations();
      res.json(reservations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reservations" });
    }
  });

  app.get("/api/admin/audits", isAuthenticated, async (req, res) => {
    try {
      const audits = await storage.getAuditResults();
      res.json(audits);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch audits" });
    }
  });

  app.get("/api/admin/mood-boards", isAuthenticated, async (req, res) => {
    try {
      const moodBoards = await storage.getMoodBoards();
      res.json(moodBoards);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch mood boards" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Helper function to extract recommendations from Lighthouse results
function extractLighthouseRecommendations(lhr: any, category: string): string[] {
  const recommendations: string[] = [];
  
  if (!lhr.categories[category] || !lhr.categories[category].auditRefs) {
    return recommendations;
  }

  for (const auditRef of lhr.categories[category].auditRefs) {
    const audit = lhr.audits[auditRef.id];
    if (audit && audit.score !== null && audit.score < 1 && audit.title && audit.description) {
      // Clean up the recommendation text
      const recommendation = `${audit.title}: ${audit.description.replace(/<[^>]*>/g, '')}`;
      recommendations.push(recommendation.substring(0, 200)); // Limit length
    }
  }

  return recommendations.slice(0, 5); // Return top 5 recommendations
}

// Mood board generation function
function generateMoodBoard(data: any) {
  const colorPalettes = generateColorPalettes(data.colorPreferences, data.brandPersonality);
  const styleElements = generateStyleElements(data.projectType, data.stylePreferences);
  const typography = generateTypography(data.brandPersonality, data.projectType);
  const layoutConcepts = generateLayoutConcepts(data.projectType, data.targetAudience);

  return {
    projectOverview: {
      name: data.projectName,
      type: data.projectType,
      audience: data.targetAudience,
      goals: data.businessGoals,
      personality: data.brandPersonality
    },
    colorPalettes,
    styleElements,
    typography,
    layoutConcepts,
    inspirationSummary: data.inspirationDescription || "Modern, engaging design focused on user experience",
    generatedAt: new Date().toISOString()
  };
}

function generateColorPalettes(colorPrefs: string[], brandPersonality: string[]) {
  const palettes = [
    {
      name: "Primary Brand",
      colors: ["#2563eb", "#1d4ed8", "#1e40af", "#60a5fa", "#dbeafe"],
      description: "Professional and trustworthy palette for main brand elements"
    },
    {
      name: "Accent & Energy",
      colors: ["#dc2626", "#b91c1c", "#991b1b", "#fca5a5", "#fee2e2"],
      description: "High-impact colors for calls-to-action and highlights"
    },
    {
      name: "Neutral Foundation",
      colors: ["#1f2937", "#374151", "#6b7280", "#d1d5db", "#f9fafb"],
      description: "Versatile neutrals for backgrounds and supporting elements"
    }
  ];

  return palettes;
}

function generateStyleElements(projectType: string, stylePrefs: string[]) {
  return [
    {
      name: "Modern Minimalism",
      description: "Clean lines, generous whitespace, focused content presentation",
      tags: ["clean", "minimal", "modern"]
    },
    {
      name: "Bold Typography",
      description: "Strong, readable fonts that convey confidence and clarity",
      tags: ["typography", "bold", "readable"]
    },
    {
      name: "Interactive Elements",
      description: "Engaging hover states, smooth transitions, intuitive interactions",
      tags: ["interactive", "engaging", "smooth"]
    }
  ];
}

function generateTypography(brandPersonality: string[], projectType: string) {
  return {
    headingFont: {
      name: "Inter Bold",
      description: "Modern, highly legible sans-serif for headings",
      example: "Transform Your Business"
    },
    bodyFont: {
      name: "Inter Regular",
      description: "Clean, readable text for all content",
      example: "Clear communication drives results. Our design approach prioritizes readability and user experience."
    },
    accentFont: {
      name: "Inter Medium",
      description: "Emphasis text for highlights and callouts",
      example: "Key Benefits & Features"
    }
  };
}

function generateLayoutConcepts(projectType: string, targetAudience: string) {
  return [
    {
      name: "Hero-Focused Landing",
      description: "Strong opening statement with clear value proposition",
      elements: ["Hero section", "Key benefits", "Social proof", "Clear CTA"]
    },
    {
      name: "Content-Rich Pages",
      description: "Detailed information presented in digestible sections",
      elements: ["Section headers", "Content blocks", "Visual breaks", "Progressive disclosure"]
    },
    {
      name: "Conversion-Optimized",
      description: "Strategic placement of calls-to-action and trust signals",
      elements: ["Multiple CTAs", "Trust indicators", "Risk reduction", "Urgency elements"]
    }
  ];
}

// Instant analysis functions for immediate audit results
function calculateBasicPerformanceScore(loadTime: number, htmlSize: number): { score: number; recommendations: string[]; priority: string[] } {
  const recommendations: string[] = [];
  const priority: string[] = [];
  
  let score = 100;
  
  // Load time scoring
  if (loadTime > 3000) {
    score -= 30;
    recommendations.push("Reduce server response time (currently " + Math.round(loadTime/1000) + "s)");
    priority.push("Slow server response time");
  } else if (loadTime > 1500) {
    score -= 15;
    recommendations.push("Optimize server response time");
  }
  
  // HTML size scoring
  if (htmlSize > 500000) {
    score -= 20;
    recommendations.push("Reduce HTML payload size (currently " + Math.round(htmlSize/1024) + "KB)");
    priority.push("Large HTML payload");
  } else if (htmlSize > 200000) {
    score -= 10;
    recommendations.push("Consider reducing HTML size");
  }
  
  if (score > 90) {
    recommendations.push("Excellent performance baseline");
  } else if (score > 70) {
    recommendations.push("Good performance with room for optimization");
  } else {
    recommendations.push("Performance improvements needed");
  }
  
  return { score: Math.max(0, score), recommendations, priority };
}

function analyzeSEO($: cheerio.CheerioAPI, html: string): { score: number; recommendations: string[]; priority: string[] } {
  const recommendations: string[] = [];
  const priority: string[] = [];
  let score = 100;
  
  // Title tag analysis
  const title = $('title').text();
  if (!title) {
    score -= 20;
    recommendations.push("Add a title tag");
    priority.push("Missing title tag");
  } else if (title.length < 30 || title.length > 60) {
    score -= 10;
    recommendations.push("Optimize title length (30-60 characters)");
  }
  
  // Meta description
  const metaDesc = $('meta[name="description"]').attr('content');
  if (!metaDesc) {
    score -= 15;
    recommendations.push("Add meta description");
    priority.push("Missing meta description");
  } else if (metaDesc.length < 120 || metaDesc.length > 160) {
    score -= 5;
    recommendations.push("Optimize meta description length (120-160 characters)");
  }
  
  // Heading structure
  const h1Count = $('h1').length;
  if (h1Count === 0) {
    score -= 15;
    recommendations.push("Add H1 heading");
  } else if (h1Count > 1) {
    score -= 5;
    recommendations.push("Use only one H1 heading per page");
  }
  
  // Images without alt text
  const imagesWithoutAlt = $('img:not([alt])').length;
  if (imagesWithoutAlt > 0) {
    score -= Math.min(15, imagesWithoutAlt * 3);
    recommendations.push(`Add alt text to ${imagesWithoutAlt} image(s)`);
  }
  
  // Open Graph tags
  const ogTitle = $('meta[property="og:title"]').attr('content');
  const ogDesc = $('meta[property="og:description"]').attr('content');
  if (!ogTitle || !ogDesc) {
    score -= 5;
    recommendations.push("Add Open Graph tags for social sharing");
  }
  
  return { score: Math.max(0, score), recommendations, priority };
}

function analyzeBasicSecurity($: cheerio.CheerioAPI, response: Response): { score: number; recommendations: string[]; priority: string[] } {
  const recommendations: string[] = [];
  const priority: string[] = [];
  let score = 100;
  
  // HTTPS check
  const url = new URL(response.url);
  if (url.protocol !== 'https:') {
    score -= 30;
    recommendations.push("Enable HTTPS/SSL");
    priority.push("Not using HTTPS");
  }
  
  // Security headers
  const headers = response.headers;
  if (!headers.get('strict-transport-security')) {
    score -= 10;
    recommendations.push("Add Strict-Transport-Security header");
  }
  
  if (!headers.get('x-frame-options') && !headers.get('content-security-policy')) {
    score -= 10;
    recommendations.push("Add X-Frame-Options or CSP frame-ancestors");
  }
  
  if (!headers.get('x-content-type-options')) {
    score -= 5;
    recommendations.push("Add X-Content-Type-Options header");
  }
  
  // Inline scripts (basic check)
  const inlineScripts = $('script:not([src])').length;
  if (inlineScripts > 0) {
    score -= 5;
    recommendations.push("Consider moving inline scripts to external files");
  }
  
  if (score >= 90) {
    recommendations.push("Strong security implementation");
  } else if (score >= 70) {
    recommendations.push("Good security with minor improvements needed");
  }
  
  return { score: Math.max(0, score), recommendations, priority };
}

function analyzeMobile($: cheerio.CheerioAPI): { score: number; recommendations: string[]; priority: string[] } {
  const recommendations: string[] = [];
  const priority: string[] = [];
  let score = 100;
  
  // Viewport meta tag
  const viewport = $('meta[name="viewport"]').attr('content');
  if (!viewport) {
    score -= 30;
    recommendations.push("Add viewport meta tag");
    priority.push("Missing viewport meta tag");
  } else if (!viewport.includes('width=device-width')) {
    score -= 15;
    recommendations.push("Set viewport width=device-width");
  }
  
  // Touch targets (basic check for common interactive elements)
  const buttons = $('button, a, input[type="button"], input[type="submit"]').length;
  if (buttons > 0) {
    recommendations.push("Ensure touch targets are at least 44px");
  }
  
  if (score >= 90) {
    recommendations.push("Excellent mobile optimization");
  } else if (score >= 70) {
    recommendations.push("Good mobile support with room for improvement");
  }
  
  return { score: Math.max(0, score), recommendations, priority };
}

function analyzeAccessibility($: cheerio.CheerioAPI): { score: number; recommendations: string[]; priority: string[] } {
  const recommendations: string[] = [];
  const priority: string[] = [];
  let score = 100;
  
  // Images without alt text
  const imagesWithoutAlt = $('img:not([alt])').length;
  if (imagesWithoutAlt > 0) {
    score -= Math.min(20, imagesWithoutAlt * 4);
    recommendations.push(`Add alt text to ${imagesWithoutAlt} image(s)`);
    priority.push("Images missing alt text");
  }
  
  // Form labels
  const inputsWithoutLabels = $('input:not([type="hidden"]):not([aria-label]):not([aria-labelledby])').filter(function() {
    const id = $(this).attr('id');
    return !id || $(`label[for="${id}"]`).length === 0;
  }).length;
  
  if (inputsWithoutLabels > 0) {
    score -= Math.min(15, inputsWithoutLabels * 5);
    recommendations.push(`Add labels to ${inputsWithoutLabels} form input(s)`);
  }
  
  // Page language
  const htmlLang = $('html').attr('lang');
  if (!htmlLang) {
    score -= 10;
    recommendations.push("Add lang attribute to HTML element");
  }
  
  // Heading hierarchy
  const headings = $('h1, h2, h3, h4, h5, h6');
  if (headings.length === 0) {
    score -= 15;
    recommendations.push("Add proper heading structure");
  }
  
  if (score >= 90) {
    recommendations.push("Excellent accessibility implementation");
  } else if (score >= 70) {
    recommendations.push("Good accessibility with room for improvement");
  }
  
  return { score: Math.max(0, score), recommendations, priority };
}