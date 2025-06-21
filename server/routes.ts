import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { sendEmail } from "./sendgrid";
import {
  contactFormSchema,
  slotReservationFormSchema,
  auditFormSchema,
} from "@shared/schema";
import { z } from "zod";
import * as cheerio from "cheerio";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Contact form submission
  app.post('/api/contact', async (req, res) => {
    try {
      const validatedData = contactFormSchema.parse(req.body);
      
      // Determine if this is an audit request
      const isAuditRequest = !!validatedData.websiteUrl;
      const priority = isAuditRequest ? "high" : "normal";
      
      const submission = await storage.createContactSubmission({
        ...validatedData,
        isAuditRequest,
        priority,
      });

      // Send email notification
      const emailSubject = isAuditRequest 
        ? `🚨 HIGH PRIORITY: Website Audit Request from ${validatedData.name}`
        : `New Contact Form Submission from ${validatedData.name}`;

      const emailHtml = `
        <div style="font-family: 'Courier New', monospace; background: #0a0a0a; color: #00ffff; padding: 20px;">
          <h1 style="color: #ffff00; text-shadow: 0 0 10px #ffff00;">PRIMORPHO.EXE - ${isAuditRequest ? 'AUDIT REQUEST' : 'CONTACT SUBMISSION'}</h1>
          
          ${isAuditRequest ? '<div style="background: #ff0080; color: #000; padding: 10px; margin: 10px 0; font-weight: bold;">⚡ HIGH PRIORITY - RESPONSE REQUIRED WITHIN 1 HOUR ⚡</div>' : ''}
          
          <div style="background: rgba(0, 255, 255, 0.1); padding: 15px; margin: 10px 0; border: 1px solid #00ffff;">
            <h3 style="color: #b266ff;">CLIENT DATA:</h3>
            <p><strong>Name:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>Business:</strong> ${validatedData.business || 'Not specified'}</p>
            <p><strong>Phone:</strong> ${validatedData.phone || 'Not provided'}</p>
            <p><strong>Package:</strong> ${validatedData.package || 'Not specified'}</p>
            ${validatedData.websiteUrl ? `<p><strong>Website URL:</strong> ${validatedData.websiteUrl}</p>` : ''}
          </div>
          
          <div style="background: rgba(255, 255, 0, 0.1); padding: 15px; margin: 10px 0; border: 1px solid #ffff00;">
            <h3 style="color: #ffff00;">PROJECT DETAILS:</h3>
            <p>${validatedData.details || 'No details provided'}</p>
          </div>
          
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

      await sendEmail(
        process.env.SENDGRID_API_KEY || '',
        {
          to: process.env.ADMIN_EMAIL || 'admin@primorpho.com',
          from: process.env.FROM_EMAIL || 'noreply@primorpho.com',
          subject: emailSubject,
          html: emailHtml,
        }
      );

      res.json({ 
        success: true, 
        message: isAuditRequest ? "Audit request submitted successfully! We'll analyze your website within 1 hour." : "Contact submission successful! We'll respond within 24 hours.",
        submissionId: submission.id
      });
    } catch (error) {
      console.error("Contact form error:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Validation error", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to submit contact form" });
      }
    }
  });

  // Slot reservation
  app.post('/api/reserve-slot', async (req, res) => {
    try {
      const validatedData = slotReservationFormSchema.parse(req.body);
      
      const reservation = await storage.createSlotReservation(validatedData);

      // Send email notification
      const emailHtml = `
        <div style="font-family: 'Courier New', monospace; background: #0a0a0a; color: #00ffff; padding: 20px;">
          <h1 style="color: #b266ff; text-shadow: 0 0 10px #b266ff;">PRIMORPHO.EXE - SLOT RESERVATION</h1>
          
          <div style="background: rgba(178, 102, 255, 0.1); padding: 15px; margin: 10px 0; border: 1px solid #b266ff;">
            <h3 style="color: #b266ff;">RESERVATION DATA:</h3>
            <p><strong>Name:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>Business:</strong> ${validatedData.business || 'Not specified'}</p>
            <p><strong>Phone:</strong> ${validatedData.phone || 'Not provided'}</p>
            <p><strong>Package:</strong> ${validatedData.package}</p>
            <p><strong>Preferred Slot:</strong> ${validatedData.preferredSlot}</p>
            <p><strong>Budget:</strong> ${validatedData.budget || 'Not specified'}</p>
            <p><strong>Timeline:</strong> ${validatedData.timeline || 'Not specified'}</p>
          </div>
          
          <div style="background: rgba(255, 255, 0, 0.1); padding: 15px; margin: 10px 0; border: 1px solid #ffff00;">
            <h3 style="color: #ffff00;">PROJECT DETAILS:</h3>
            <p>${validatedData.projectDetails || 'No details provided'}</p>
          </div>
        </div>
      `;

      await sendEmail(
        process.env.SENDGRID_API_KEY || '',
        {
          to: process.env.ADMIN_EMAIL || 'admin@primorpho.com',
          from: process.env.FROM_EMAIL || 'noreply@primorpho.com',
          subject: `🎯 New Slot Reservation: ${validatedData.package} - ${validatedData.name}`,
          html: emailHtml,
        }
      );

      res.json({ 
        success: true, 
        message: "Slot reserved successfully! We'll confirm your booking within 24 hours.",
        reservationId: reservation.id
      });
    } catch (error) {
      console.error("Slot reservation error:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Validation error", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to reserve slot" });
      }
    }
  });

  // Website audit tool
  app.post('/api/audit', async (req, res) => {
    try {
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
      
      // Check if we have a recent audit for this URL
      const existingAudit = await storage.getAuditResultByUrl(websiteUrl);
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      
      if (existingAudit && existingAudit.createdAt && existingAudit.createdAt > oneDayAgo) {
        return res.json({
          success: true,
          audit: existingAudit,
          cached: true
        });
      }

      // Perform comprehensive website audit
      let auditResults;
      
      try {
        const startTime = Date.now();
        const response = await fetch(websiteUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; PrimorphoBot/1.0; +https://primorpho.com/bot)'
          }
        });
        const loadTime = Date.now() - startTime;
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Website not found. Please check the URL and try again.");
          } else if (response.status >= 500) {
            throw new Error("Website is currently unavailable. Please try again later.");
          } else if (response.status === 403) {
            throw new Error("Access denied. The website may be blocking automated requests.");
          } else {
            throw new Error(`Unable to access website (HTTP ${response.status}). Please verify the URL is correct.`);
          }
        }
        
        const html = await response.text();
        const $ = cheerio.load(html);
        
        // Comprehensive performance analysis with real metrics
        const performanceData = calculatePerformanceScore($, html, loadTime, response);
        
        // Advanced SEO analysis
        const seoData = calculateSEOScore($);
        
        // Professional security analysis
        const securityData = calculateSecurityScore($, response);
        
        // Mobile analysis with real device considerations
        const mobileData = calculateMobileScore($);
        
        // Accessibility analysis with WCAG compliance
        const accessibilityData = calculateAccessibilityScore($);
        
        // Technical architecture analysis
        const techData = calculateTechnicalScore($, html, response);
        
        // Content quality analysis
        const contentData = calculateContentScore($, html);
        
        // Calculate overall score and priority recommendations
        const overallScore = Math.round(
          (performanceData.score + seoData.score + securityData.score + 
           mobileData.score + accessibilityData.score + techData.score + contentData.score) / 7
        );
        
        // Combine all recommendations with priority ranking
        const allRecommendations = {
          performance: performanceData.recommendations,
          seo: seoData.recommendations,
          security: securityData.recommendations,
          mobile: mobileData.recommendations,
          accessibility: accessibilityData.recommendations,
          technical: techData.recommendations,
          content: contentData.recommendations,
          priority: [
            ...securityData.recommendations.filter((r: string) => r.includes('Critical')),
            ...performanceData.recommendations.filter((r: string) => r.includes('large') || r.includes('slow') || loadTime > 3000 ? 'Page load time exceeds 3 seconds - critical for user experience' : ''),
            ...seoData.recommendations.filter((r: string) => r.includes('Missing') || r.includes('title')),
            ...accessibilityData.recommendations.filter((r: string) => r.includes('missing'))
          ].filter(r => r && r.length > 0).slice(0, 8) // Top 8 priority issues
        };
        
        // Prepare audit results for database storage
        const auditForDatabase = {
          websiteUrl,
          loadTime,
          overallScore,
          performanceScore: performanceData.score,
          seoScore: seoData.score,
          securityScore: securityData.score,
          mobileScore: mobileData.score,
          accessibilityScore: accessibilityData.score,
          technicalScore: techData.score,
          contentScore: contentData.score,
          recommendations: allRecommendations,
          metrics: {
            htmlSize: html.length,
            totalElements: $('*').length,
            images: $('img').length,
            scripts: $('script').length,
            stylesheets: $('link[rel="stylesheet"]').length
          }
        };
        
        auditResults = auditForDatabase;
        
      } catch (error) {
        console.error("Website audit error:", error);
        
        let errorMessage = "Failed to audit website";
        let suggestions = ['Check if the website is accessible and properly configured'];
        
        if (error instanceof Error) {
          if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
            errorMessage = "Website not found. Please check if the domain name is correct.";
            suggestions = ['Verify the website address is spelled correctly', 'Make sure the website exists and is online'];
          } else if (error.message.includes('ECONNREFUSED')) {
            errorMessage = "Connection refused. The website may be down or blocking requests.";
            suggestions = ['Try again later', 'Check if the website is online in your browser'];
          } else if (error.message.includes('timeout') || error.message.includes('ETIMEDOUT')) {
            errorMessage = "Website took too long to respond. It may be slow or unavailable.";
            suggestions = ['Try again in a few minutes', 'Check if the website loads in your browser'];
          } else {
            errorMessage = error.message;
          }
        }
        
        auditResults = {
          websiteUrl,
          performanceScore: 0,
          seoScore: 0,
          securityScore: 0,
          mobileScore: 0,
          accessibilityScore: 0,
          recommendations: {
            error: errorMessage,
            suggestions: suggestions
          }
        };
      }

      // Save audit results
      const savedAudit = await storage.createAuditResult(auditResults);

      res.json({
        success: true,
        audit: savedAudit,
        cached: false
      });
      
    } catch (error) {
      console.error("Audit request error:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid URL provided", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to perform website audit" });
      }
    }
  });

  // Admin routes (protected)
  app.get('/api/admin/submissions', isAuthenticated, async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      res.status(500).json({ message: "Failed to fetch submissions" });
    }
  });

  app.get('/api/admin/reservations', isAuthenticated, async (req, res) => {
    try {
      const reservations = await storage.getSlotReservations();
      res.json(reservations);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      res.status(500).json({ message: "Failed to fetch reservations" });
    }
  });

  app.get('/api/admin/audits', isAuthenticated, async (req, res) => {
    try {
      const audits = await storage.getAuditResults();
      res.json(audits);
    } catch (error) {
      console.error("Error fetching audits:", error);
      res.status(500).json({ message: "Failed to fetch audits" });
    }
  });

  app.patch('/api/admin/submission/:id/status', isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      await storage.updateContactSubmissionStatus(parseInt(id), status);
      res.json({ success: true });
    } catch (error) {
      console.error("Error updating submission status:", error);
      res.status(500).json({ message: "Failed to update submission status" });
    }
  });

  app.patch('/api/admin/reservation/:id/status', isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      await storage.updateSlotReservationStatus(parseInt(id), status);
      res.json({ success: true });
    } catch (error) {
      console.error("Error updating reservation status:", error);
      res.status(500).json({ message: "Failed to update reservation status" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Helper functions for website audit
function calculatePerformanceScore($: cheerio.CheerioAPI, html: string, loadTime?: number, response?: Response): { score: number; recommendations: string[] } {
  let score = 100;
  const recommendations: string[] = [];
  
  // Real load time analysis
  if (loadTime) {
    if (loadTime > 5000) {
      score -= 35;
      recommendations.push(`Critical: Page load time is ${(loadTime/1000).toFixed(1)}s. Target under 3 seconds for good user experience.`);
    } else if (loadTime > 3000) {
      score -= 20;
      recommendations.push(`Page load time is ${(loadTime/1000).toFixed(1)}s. Optimize to under 3 seconds for better performance.`);
    } else if (loadTime > 2000) {
      score -= 10;
      recommendations.push(`Page load time is ${(loadTime/1000).toFixed(1)}s. Consider optimizations for faster loading.`);
    }
  }
  
  // Server response analysis
  if (response) {
    const serverHeader = response.headers.get('server');
    const cacheControl = response.headers.get('cache-control');
    const contentEncoding = response.headers.get('content-encoding');
    
    if (!contentEncoding || !contentEncoding.includes('gzip')) {
      score -= 15;
      recommendations.push("Enable gzip/brotli compression on server to reduce transfer size by 60-80%.");
    }
    
    if (!cacheControl || !cacheControl.includes('max-age')) {
      score -= 10;
      recommendations.push("Set proper cache headers to improve repeat visit performance.");
    }
  }
  
  // Check HTML size and complexity
  if (html.length > 500000) {
    score -= 20;
    recommendations.push("HTML size is large (>500KB). Consider minification and code splitting.");
  } else if (html.length > 300000) {
    score -= 10;
    recommendations.push("HTML size is moderate (>300KB). Consider optimizing content and structure.");
  }
  
  // Check for excessive inline styles
  const inlineStyles = $('[style]').length;
  if (inlineStyles > 20) {
    score -= 20;
    recommendations.push(`${inlineStyles} inline styles found. Move to external CSS files for better caching and performance.`);
  } else if (inlineStyles > 10) {
    score -= 10;
    recommendations.push(`${inlineStyles} inline styles found. Consider moving some to external CSS.`);
  }
  
  // Enhanced image optimization checks
  const images = $('img').length;
  const imagesWithoutSizes = $('img:not([width]):not([height])').length;
  const largeImages = $('img[src*=".jpg"], img[src*=".png"], img[src*=".jpeg"]').length;
  const webpImages = $('img[src*=".webp"], img[src*=".avif"]').length;
  
  if (images > 0) {
    if (webpImages === 0 && largeImages > 3) {
      score -= 15;
      recommendations.push("No modern image formats detected. Use WebP or AVIF for better compression.");
    }
    if (imagesWithoutSizes > images * 0.5) {
      score -= 10;
      recommendations.push("Many images lack width/height attributes. Add dimensions to prevent layout shift.");
    }
    if (!$('img[loading="lazy"]').length && images > 5) {
      score -= 10;
      recommendations.push("No lazy loading detected. Implement lazy loading for below-fold images.");
    }
  }
  
  // Enhanced JavaScript optimization
  const scriptTags = $('script[src]').length;
  const inlineScripts = $('script:not([src])').length;
  const deferredScripts = $('script[defer]').length;
  const asyncScripts = $('script[async]').length;
  
  if (scriptTags > 15) {
    score -= 25;
    recommendations.push(`${scriptTags} external scripts detected. Implement script bundling and code splitting.`);
  } else if (scriptTags > 8) {
    score -= 15;
    recommendations.push(`${scriptTags} external scripts detected. Consider bundling and minification.`);
  }
  
  if (scriptTags > 0 && (deferredScripts + asyncScripts) === 0) {
    score -= 15;
    recommendations.push("No async/defer attributes on scripts. Add defer/async to non-critical scripts.");
  }
  
  if (inlineScripts > 5) {
    score -= 15;
    recommendations.push("Multiple large inline scripts found. Move to external files for better caching.");
  }
  
  // Enhanced CSS optimization
  const linkTags = $('link[rel="stylesheet"]').length;
  const inlineStyleBlocks = $('style').length;
  
  if (linkTags > 8) {
    score -= 15;
    recommendations.push(`${linkTags} CSS files detected. Combine stylesheets to reduce HTTP requests.`);
  }
  
  if (inlineStyleBlocks > 3) {
    score -= 10;
    recommendations.push("Multiple inline style blocks found. Consider consolidating CSS.");
  }
  
  // Performance optimization features
  const hasPreload = $('link[rel="preload"]').length > 0;
  const hasPrefetch = $('link[rel="prefetch"]').length > 0;
  const hasServiceWorker = html.includes('serviceWorker') || html.includes('sw.js');
  
  if (!hasPreload && scriptTags > 3) {
    score -= 8;
    recommendations.push("Add preload directives for critical resources (fonts, CSS, key scripts).");
  }
  
  if (!hasPrefetch && linkTags > 3) {
    score -= 5;
    recommendations.push("Consider prefetch directives for next-page resources.");
  }
  
  if (!hasServiceWorker && scriptTags > 5) {
    score -= 10;
    recommendations.push("Implement service worker for caching and offline functionality.");
  }
  
  // Check for critical rendering path optimization
  const criticalCSS = $('style').text().length;
  if (criticalCSS === 0 && linkTags > 2) {
    score -= 8;
    recommendations.push("Consider inlining critical CSS for faster first paint.");
  }
  
  // Font optimization
  const fontLinks = $('link[href*="fonts"]').length;
  const fontPreloads = $('link[rel="preload"][as="font"]').length;
  if (fontLinks > 0 && fontPreloads === 0) {
    score -= 10;
    recommendations.push("Preload web fonts to prevent text layout shift.");
  }
  
  return { score: Math.max(0, score), recommendations };
}

function calculateSEOScore($: cheerio.CheerioAPI): { score: number; recommendations: string[] } {
  let score = 100;
  const recommendations: string[] = [];
  
  // Enhanced title tag analysis
  const title = $('title').text();
  if (!title) {
    score -= 25;
    recommendations.push("Missing title tag. Add a descriptive, keyword-rich page title.");
  } else {
    if (title.length < 30) {
      score -= 12;
      recommendations.push(`Title too short (${title.length} chars). Expand to 30-60 characters for better SEO.`);
    } else if (title.length > 60) {
      score -= 8;
      recommendations.push(`Title too long (${title.length} chars). Shorten to 30-60 characters to avoid truncation.`);
    }
    
    // Check for brand in title
    if (!title.includes('|') && !title.includes('-')) {
      score -= 5;
      recommendations.push("Consider adding brand name to title for better recognition.");
    }
  }
  
  // Enhanced meta description analysis
  const metaDesc = $('meta[name="description"]').attr('content');
  if (!metaDesc) {
    score -= 25;
    recommendations.push("Missing meta description. Add compelling 120-160 character description with target keywords.");
  } else {
    if (metaDesc.length < 120) {
      score -= 10;
      recommendations.push(`Meta description too short (${metaDesc.length} chars). Expand to 120-160 characters.`);
    } else if (metaDesc.length > 160) {
      score -= 8;
      recommendations.push(`Meta description too long (${metaDesc.length} chars). Shorten to prevent truncation.`);
    }
  }
  
  // Enhanced heading structure analysis
  const h1Tags = $('h1').length;
  const h2Tags = $('h2').length;
  const h3Tags = $('h3').length;
  
  if (h1Tags === 0) {
    score -= 20;
    recommendations.push("Missing H1 tag. Add a primary heading that matches your target keyword.");
  } else if (h1Tags > 1) {
    score -= 10;
    recommendations.push(`${h1Tags} H1 tags found. Use only one H1 per page for proper hierarchy.`);
  }
  
  if (h2Tags === 0 && $('body').text().length > 1000) {
    score -= 8;
    recommendations.push("No H2 tags found. Use H2-H6 tags to structure longer content.");
  }
  
  // Open Graph and social media tags
  const ogTitle = $('meta[property="og:title"]').attr('content');
  const ogDesc = $('meta[property="og:description"]').attr('content');
  const ogImage = $('meta[property="og:image"]').attr('content');
  
  if (!ogTitle) {
    score -= 8;
    recommendations.push("Missing Open Graph title. Add for better social media sharing.");
  }
  if (!ogDesc) {
    score -= 6;
    recommendations.push("Missing Open Graph description. Add for improved social previews.");
  }
  if (!ogImage) {
    score -= 6;
    recommendations.push("Missing Open Graph image. Add for attractive social media cards.");
  }
  
  // Structured data/Schema markup
  const jsonLd = $('script[type="application/ld+json"]').length;
  const microdata = $('[itemtype]').length;
  
  if (jsonLd === 0 && microdata === 0) {
    score -= 12;
    recommendations.push("No structured data found. Add Schema.org markup for rich snippets.");
  }
  
  // Canonical URL
  const canonical = $('link[rel="canonical"]').attr('href');
  if (!canonical) {
    score -= 8;
    recommendations.push("Missing canonical URL. Add to prevent duplicate content issues.");
  }
  
  // Meta robots and indexing
  const metaRobots = $('meta[name="robots"]').attr('content');
  const noindex = metaRobots && metaRobots.includes('noindex');
  if (noindex) {
    score -= 15;
    recommendations.push("Page set to noindex. Review if this page should be searchable.");
  }
  
  // Enhanced image SEO analysis
  const imagesWithoutAlt = $('img:not([alt])').length;
  if (imagesWithoutAlt > 0) {
    score -= Math.min(20, imagesWithoutAlt * 5);
    recommendations.push(`${imagesWithoutAlt} images missing alt attributes. Add descriptive alt text for accessibility.`);
  }
  
  // Check for proper heading structure
  const headings = $('h1, h2, h3, h4, h5, h6');
  if (headings.length === 0) {
    score -= 10;
    recommendations.push("No heading tags found. Use proper heading hierarchy (H1-H6).");
  }
  
  // Check for Open Graph tags
  const ogTags = $('meta[property^="og:"]').length;
  if (ogTags === 0) {
    score -= 10;
    recommendations.push("Missing Open Graph tags. Add for better social media sharing.");
  }
  
  return { score: Math.max(0, score), recommendations };
}

function calculateSecurityScore($: cheerio.CheerioAPI, response: Response): { score: number; recommendations: string[] } {
  let score = 100;
  const recommendations: string[] = [];
  
  // Enhanced HTTPS and SSL analysis
  const isHttps = response.url.startsWith('https://');
  if (!isHttps) {
    score -= 35;
    recommendations.push("Critical: Website not using HTTPS. Implement SSL certificate immediately for secure connections.");
  }
  
  // Security headers analysis
  const headers = response.headers;
  const securityHeaders = {
    'content-security-policy': 'Content Security Policy missing. Add CSP headers to prevent XSS attacks.',
    'x-frame-options': 'X-Frame-Options missing. Add to prevent clickjacking attacks.',
    'x-content-type-options': 'X-Content-Type-Options missing. Add "nosniff" to prevent MIME type confusion.',
    'strict-transport-security': 'HSTS header missing. Add to enforce HTTPS connections.',
    'x-xss-protection': 'X-XSS-Protection header missing. Add basic XSS protection.'
  };
  
  Object.entries(securityHeaders).forEach(([header, message]) => {
    if (!headers.get(header)) {
      score -= 8;
      recommendations.push(message);
    }
  });
  
  // Enhanced mixed content analysis
  const httpResources = $('script[src^="http:"], link[href^="http:"], img[src^="http:"], iframe[src^="http:"]').length;
  if (httpResources > 0) {
    score -= 25;
    recommendations.push(`Critical: ${httpResources} insecure HTTP resources found. Update all URLs to HTTPS.`);
  }
  
  // Advanced XSS vulnerability checks
  const inlineScripts = $('script:not([src])').length;
  const inlineEvents = $('[onclick], [onload], [onerror], [onmouseover]').length;
  
  if (inlineScripts > 5) {
    score -= 20;
    recommendations.push(`High risk: ${inlineScripts} inline scripts detected. Move to external files with CSP.`);
  } else if (inlineScripts > 0) {
    score -= 10;
    recommendations.push(`${inlineScripts} inline scripts found. Consider moving to external files for better security.`);
  }
  
  if (inlineEvents > 0) {
    score -= 15;
    recommendations.push(`${inlineEvents} inline event handlers found. Use addEventListener() instead to prevent XSS.`);
  }
  
  // Enhanced form security analysis
  const forms = $('form');
  const formsWithoutMethod = $('form:not([method])').length;
  const formsWithoutAction = $('form:not([action])').length;
  const passwordInputs = $('input[type="password"]').length;
  const formsOverHttp = $('form[action^="http:"]').length;
  
  if (formsWithoutMethod > 0) {
    score -= 12;
    recommendations.push(`${formsWithoutMethod} forms missing method attribute. Specify POST/GET explicitly.`);
  }
  
  if (formsWithoutAction > 0) {
    score -= 8;
    recommendations.push(`${formsWithoutAction} forms missing action attribute. Define form submission endpoints.`);
  }
  
  if (passwordInputs > 0 && !isHttps) {
    score -= 30;
    recommendations.push("Critical: Password forms over HTTP. Implement HTTPS immediately.");
  }
  
  if (formsOverHttp > 0) {
    score -= 20;
    recommendations.push(`${formsOverHttp} forms submitting over HTTP. Use HTTPS endpoints only.`);
  }
  
  // CSRF protection analysis
  const csrfTokens = $('input[name*="csrf"], input[name*="token"], meta[name="csrf-token"]').length;
  if (forms.length > 0 && csrfTokens === 0) {
    score -= 15;
    recommendations.push("No CSRF tokens detected. Implement CSRF protection for form submissions.");
  }
  
  // External resource security
  let externalScripts = 0;
  $('script[src]').each((_, el) => {
    const src = $(el).attr('src');
    if (src && !src.startsWith('/') && !src.includes(new URL(response.url).hostname)) {
      externalScripts++;
    }
  });
  
  if (externalScripts > 3) {
    score -= 12;
    recommendations.push(`${externalScripts} external scripts loaded. Review third-party dependencies for security.`);
  }
  
  // Cookie security (basic check)
  const cookieScripts = $('script').text().match(/document\.cookie/g);
  if (cookieScripts && cookieScripts.length > 0) {
    score -= 10;
    recommendations.push("JavaScript cookie access detected. Use secure, HttpOnly cookies when possible.");
  }
  
  // Iframe security
  const iframes = $('iframe').length;
  const sandboxedIframes = $('iframe[sandbox]').length;
  if (iframes > 0 && sandboxedIframes === 0) {
    score -= 10;
    recommendations.push(`${iframes} iframes without sandbox attribute. Add sandbox for better security.`);
  }
  
  return { score: Math.max(0, score), recommendations };
}

function calculateMobileScore($: cheerio.CheerioAPI): { score: number; recommendations: string[] } {
  let score = 100;
  const recommendations: string[] = [];
  
  // Check for viewport meta tag
  const viewport = $('meta[name="viewport"]').attr('content');
  if (!viewport) {
    score -= 30;
    recommendations.push("Missing viewport meta tag. Add <meta name='viewport' content='width=device-width, initial-scale=1'>");
  } else if (!viewport.includes('width=device-width')) {
    score -= 15;
    recommendations.push("Viewport meta tag should include 'width=device-width' for proper mobile scaling.");
  }
  
  // Check for responsive design indicators
  const responsiveClasses = $('[class*="responsive"], [class*="mobile"], [class*="tablet"]').length;
  if (responsiveClasses === 0) {
    score -= 20;
    recommendations.push("No responsive design classes detected. Implement mobile-responsive CSS.");
  }
  
  // Check for mobile-unfriendly elements
  let smallText = 0;
  $('[style*="font-size"][style*="px"]').each((_, el) => {
    const fontSize = $(el).attr('style')?.match(/font-size:\s*(\d+)px/);
    if (fontSize) {
      const size = parseInt(fontSize[1]);
      if (size < 14) smallText++;
    }
  });
  if (smallText > 0) {
    score -= 15;
    recommendations.push(`${smallText} elements with small text detected. Use minimum 14px font size for mobile readability.`);
  }
  
  return { score: Math.max(0, score), recommendations };
}

function calculateAccessibilityScore($: cheerio.CheerioAPI): { score: number; recommendations: string[] } {
  let score = 100;
  const recommendations: string[] = [];
  
  // Enhanced image accessibility analysis
  const images = $('img');
  const imagesWithoutAlt = $('img:not([alt])').length;
  const imagesWithEmptyAlt = $('img[alt=""]').length;
  const decorativeImages = imagesWithEmptyAlt; // Assuming empty alt means decorative
  
  if (imagesWithoutAlt > 0) {
    score -= Math.min(25, imagesWithoutAlt * 5);
    recommendations.push(`${imagesWithoutAlt} images missing alt attributes. Add descriptive alt text for screen readers.`);
  }
  
  if (images.length > 0 && decorativeImages === 0 && imagesWithoutAlt === 0) {
    // Check if all images have meaningful alt text (not just single words)
    let poorAltText = 0;
    images.each((_, img) => {
      const alt = $(img).attr('alt');
      if (alt && alt.length < 10 && !alt.includes(' ')) {
        poorAltText++;
      }
    });
    if (poorAltText > 0) {
      score -= 8;
      recommendations.push(`${poorAltText} images have very short alt text. Use descriptive phrases instead of single words.`);
    }
  }
  
  // Enhanced form accessibility analysis
  const inputs = $('input, select, textarea');
  let inputsWithoutLabels = 0;
  $('input:not([aria-label]):not([aria-labelledby])').each((_, input) => {
    const id = $(input).attr('id');
    if (!id || $(`label[for="${id}"]`).length === 0) {
      inputsWithoutLabels++;
    }
  });
  
  if (inputsWithoutLabels > 0) {
    score -= Math.min(25, inputsWithoutLabels * 6);
    recommendations.push(`${inputsWithoutLabels} form inputs missing proper labels. Add label elements or aria-label attributes.`);
  }
  
  // Check for required field indicators
  const requiredInputs = $('input[required], select[required], textarea[required]').length;
  const requiredIndicators = $('input[required][aria-required], select[required][aria-required], textarea[required][aria-required]').length;
  if (requiredInputs > 0 && requiredIndicators < requiredInputs) {
    score -= 10;
    recommendations.push("Required form fields missing aria-required attributes. Mark required fields for screen readers.");
  }
  
  // Enhanced heading hierarchy analysis
  const h1Count = $('h1').length;
  const h2Count = $('h2').length;
  const h3Count = $('h3').length;
  const h4Count = $('h4').length;
  
  if (h1Count === 0) {
    score -= 20;
    recommendations.push("Missing H1 heading. Add a main page heading for proper document structure.");
  } else if (h1Count > 1) {
    score -= 12;
    recommendations.push(`${h1Count} H1 headings found. Use only one H1 per page for proper hierarchy.`);
  }
  
  // Check for skipped heading levels
  if (h1Count > 0 && h3Count > 0 && h2Count === 0) {
    score -= 10;
    recommendations.push("Heading hierarchy skips levels (H1 to H3). Use H2 before H3 for proper structure.");
  }
  
  // Enhanced ARIA and semantic analysis
  const ariaElements = $('[aria-label], [aria-describedby], [aria-labelledby], [role]').length;
  const semanticElements = $('main, nav, header, footer, section, article, aside').length;
  
  if (ariaElements === 0 && semanticElements === 0) {
    score -= 20;
    recommendations.push("No ARIA attributes or semantic HTML5 elements found. Use landmarks and ARIA for screen reader navigation.");
  } else if (semanticElements === 0) {
    score -= 12;
    recommendations.push("No semantic HTML5 elements found. Use main, nav, header, footer for better structure.");
  }
  
  // Check for keyboard navigation support
  const focusableElements = $('a, button, input, select, textarea, [tabindex]').length;
  const elementsWithNegativeTabIndex = $('[tabindex="-1"]').length;
  const customFocusable = $('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])').length;
  
  if (customFocusable > 0) {
    score -= 8;
    recommendations.push("Custom tab order detected. Use tabindex='0' or natural tab order for better accessibility.");
  }
  
  // Color contrast analysis (basic)
  const elementsWithInlineColors = $('[style*="color"]').length;
  if (elementsWithInlineColors > 5) {
    score -= 10;
    recommendations.push("Many inline color styles detected. Ensure sufficient color contrast ratios (4.5:1 minimum).");
  }
  
  // Check for focus indicators
  const linksAndButtons = $('a, button').length;
  const hasCustomFocus = $('style, link[rel="stylesheet"]').text().includes(':focus');
  if (linksAndButtons > 0 && !hasCustomFocus) {
    score -= 8;
    recommendations.push("No custom focus styles detected. Add visible focus indicators for keyboard navigation.");
  }
  
  // Check for skip links
  const skipLinks = $('a[href^="#"]').filter((_, link) => {
    const text = $(link).text().toLowerCase();
    return text.includes('skip') && (text.includes('content') || text.includes('main'));
  }).length;
  
  if (skipLinks === 0 && $('nav').length > 0) {
    score -= 8;
    recommendations.push("No skip links found. Add 'skip to main content' link for keyboard users.");
  }
  
  return { score: Math.max(0, score), recommendations };
}

function calculateTechnicalScore($: cheerio.CheerioAPI, html: string, response: Response): { score: number; recommendations: string[] } {
  let score = 100;
  const recommendations: string[] = [];
  
  // Framework and technology detection
  const hasModuleScripts = $('script[type="module"]').length > 0;
  const hasES6Features = html.includes('const ') || html.includes('let ') || html.includes('=>');
  
  if (!hasModuleScripts && !hasES6Features) {
    score -= 15;
    recommendations.push("Consider using modern JavaScript (ES6+) and module bundling for better performance.");
  }
  
  // CDN usage analysis
  const cdnDomains = ['cdn.', 'cloudfront', 'cloudflare', 'jsdelivr', 'unpkg'];
  let cdnUsage = 0;
  $('script[src], link[href]').each((_, el) => {
    const src = $(el).attr('src') || $(el).attr('href');
    if (src && cdnDomains.some(domain => src.includes(domain))) {
      cdnUsage++;
    }
  });
  
  if (cdnUsage === 0) {
    score -= 10;
    recommendations.push("Consider using CDN for faster global content delivery.");
  }
  
  // Build optimization detection
  const minifiedAssets = $('script[src*=".min."], link[href*=".min."]').length;
  const totalAssets = $('script[src], link[href]').length;
  
  if (totalAssets > 0 && minifiedAssets / totalAssets < 0.5) {
    score -= 12;
    recommendations.push("Minify JavaScript and CSS files to reduce load times.");
  }
  
  // Image optimization
  const modernImageFormats = $('img[src*=".webp"], img[src*=".avif"], picture').length;
  const totalImages = $('img').length;
  
  if (totalImages > 3 && modernImageFormats === 0) {
    score -= 15;
    recommendations.push("Use modern image formats (WebP, AVIF) for 25-50% smaller file sizes.");
  }
  
  // Progressive Web App features
  const hasManifest = $('link[rel="manifest"]').length > 0;
  const hasServiceWorker = html.includes('serviceWorker') || html.includes('sw.js');
  
  if (!hasManifest && !hasServiceWorker) {
    score -= 8;
    recommendations.push("Consider implementing PWA features for better user experience.");
  }
  
  return { score: Math.max(0, score), recommendations };
}

function calculateContentScore($: cheerio.CheerioAPI, html: string): { score: number; recommendations: string[] } {
  let score = 100;
  const recommendations: string[] = [];
  
  // Content length and quality analysis
  const bodyText = $('body').text().trim();
  const wordCount = bodyText.split(/\s+/).filter(word => word.length > 0).length;
  
  if (wordCount < 300) {
    score -= 20;
    recommendations.push(`Content is too short (${wordCount} words). Add more valuable content for better SEO.`);
  } else if (wordCount > 3000) {
    score -= 5;
    recommendations.push("Very long content. Consider breaking into multiple pages or sections.");
  }
  
  // Heading structure for content hierarchy
  const headings = $('h1, h2, h3, h4, h5, h6');
  const contentSections = headings.length;
  
  if (wordCount > 500 && contentSections < 3) {
    score -= 10;
    recommendations.push("Add more headings to structure long content for better readability.");
  }
  
  // Call-to-action analysis
  const ctaKeywords = ['buy', 'purchase', 'contact', 'sign up', 'subscribe', 'download', 'get started', 'learn more'];
  let ctaElements = 0;
  $('button, a').each((_, el) => {
    const text = $(el).text().toLowerCase();
    if (ctaKeywords.some(keyword => text.includes(keyword))) {
      ctaElements++;
    }
  });
  
  if (ctaElements === 0) {
    score -= 15;
    recommendations.push("Add clear call-to-action buttons to guide user engagement.");
  }
  
  // Contact information analysis
  const hasContactInfo = bodyText.includes('@') || bodyText.includes('phone') || bodyText.includes('contact');
  if (!hasContactInfo) {
    score -= 10;
    recommendations.push("Include contact information to build trust and accessibility.");
  }
  
  // Social media presence
  const socialLinks = $('a[href*="facebook"], a[href*="twitter"], a[href*="linkedin"], a[href*="instagram"]').length;
  if (socialLinks === 0) {
    score -= 8;
    recommendations.push("Add social media links to increase brand visibility and engagement.");
  }
  
  // Multimedia content
  const hasVideo = $('video, iframe[src*="youtube"], iframe[src*="vimeo"]').length > 0;
  const hasImages = $('img').length > 0;
  
  if (!hasImages && !hasVideo && wordCount > 800) {
    score -= 10;
    recommendations.push("Add images or videos to break up text and improve engagement.");
  }
  
  return { score: Math.max(0, score), recommendations };
}
