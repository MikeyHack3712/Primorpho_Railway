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

  // Professional website analysis request system
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
    
    console.log(`Processing analysis request for: ${websiteUrl}`);
    
    try {
      // Check if website is accessible
      const startTime = Date.now();
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const response = await fetch(websiteUrl, {
        method: 'HEAD',
        signal: controller.signal,
        headers: {
          'User-Agent': 'Primorpho-Analysis-Bot/1.0'
        }
      });
      clearTimeout(timeoutId);
      const loadTime = Date.now() - startTime;
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      // Create analysis request record
      const analysisRequest = await storage.createAuditResult({
        websiteUrl,
        loadTime,
        overallScore: 0, // Will be filled by professional analysis
        performanceScore: 0,
        seoScore: 0,
        securityScore: 0,
        mobileScore: 0,
        accessibilityScore: 0,
        technicalScore: 0,
        contentScore: 0,
        recommendations: {
          analysis: ["Professional analysis requested"],
          status: ["Analysis queued for expert review"],
          timeline: ["Detailed report will be delivered within 24 hours"],
          included: [
            "Google Lighthouse performance audit",
            "Core Web Vitals assessment", 
            "SEO optimization review",
            "Security vulnerability scan",
            "Mobile responsiveness check",
            "Accessibility compliance audit",
            "Technical best practices review",
            "Conversion optimization suggestions"
          ]
        }
      });

      // Send notification email for analysis request
      const emailSubject = `Professional Website Analysis Request - ${websiteUrl}`;
      const emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #06b6d4;">Professional Analysis Request</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #334155; margin-top: 0;">Website Analysis Requested</h3>
            <p><strong>Website URL:</strong> ${websiteUrl}</p>
            <p><strong>Initial Load Time:</strong> ${loadTime}ms</p>
            <p><strong>Request Time:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #065f46; margin-top: 0;">Analysis Scope</h3>
            <ul style="color: #374151;">
              <li>Google Lighthouse performance audit</li>
              <li>Core Web Vitals measurement</li>
              <li>SEO optimization review</li>
              <li>Security vulnerability assessment</li>
              <li>Mobile responsiveness evaluation</li>
              <li>Accessibility compliance check</li>
              <li>Technical best practices audit</li>
              <li>Conversion optimization recommendations</li>
            </ul>
          </div>
          <p style="color: #6b7280;">Professional analysis will be completed using industry-standard tools including Google Lighthouse, GTmetrix, and custom evaluation methods.</p>
        </div>
      `;

      await sendEmail(process.env.SENDGRID_API_KEY || '', {
        to: 'primorpho.solutions@gmail.com',
        from: 'primorpho.solutions@gmail.com',
        subject: emailSubject,
        html: emailContent
      });

      console.log(`Analysis request created for ${websiteUrl}`);
      res.json({ success: true, audit: analysisRequest });

    } catch (error: any) {
      console.error("Analysis request error:", error);
      
      // Provide helpful error messages
      let errorMessage = "Unable to access website for analysis.";
      const suggestions: string[] = [];

      if (error.message.includes('ERR_NAME_NOT_RESOLVED') || error.message.includes('ENOTFOUND')) {
        errorMessage = "Website not found. Please check the URL is correct.";
        suggestions.push("Verify the website URL is spelled correctly");
        suggestions.push("Ensure the website is currently accessible");
        suggestions.push("Check if the domain exists and is active");
      } else if (error.message.includes('ERR_CONNECTION_REFUSED') || error.message.includes('ECONNREFUSED')) {
        errorMessage = "Connection refused. The website may be temporarily unavailable.";
        suggestions.push("Try again in a few minutes");
        suggestions.push("Check if the website is experiencing downtime");
        suggestions.push("Contact us for manual analysis if issue persists");
      } else if (error.message.includes('timeout')) {
        errorMessage = "Website took too long to respond.";
        suggestions.push("Website may be experiencing slow loading times");
        suggestions.push("Try again shortly");
        suggestions.push("Contact us for comprehensive performance analysis");
      } else if (error.message.includes('HTTP 4') || error.message.includes('HTTP 5')) {
        errorMessage = "Website returned an error response.";
        suggestions.push("Website may be temporarily experiencing issues");
        suggestions.push("Contact us for detailed error analysis");
      } else {
        suggestions.push("Verify the website is accessible in your browser");
        suggestions.push("Try again shortly");
        suggestions.push("Contact us for professional analysis assistance");
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