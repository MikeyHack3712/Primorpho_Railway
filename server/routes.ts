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
      const { websiteUrl } = auditFormSchema.parse(req.body);
      
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

      // Perform actual website audit using Cheerio
      let auditResults;
      
      try {
        const response = await fetch(websiteUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; PrimorphoBot/1.0; +https://primorpho.com/bot)'
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const html = await response.text();
        const $ = cheerio.load(html);
        
        // Performance analysis
        const performanceScore = calculatePerformanceScore($, html);
        
        // SEO analysis
        const seoScore = calculateSEOScore($);
        
        // Security analysis
        const securityScore = calculateSecurityScore($, response);
        
        // Mobile analysis
        const mobileScore = calculateMobileScore($);
        
        // Accessibility analysis
        const accessibilityScore = calculateAccessibilityScore($);
        
        // Generate recommendations
        const recommendations = generateRecommendations({
          performance: performanceScore,
          seo: seoScore,
          security: securityScore,
          mobile: mobileScore,
          accessibility: accessibilityScore
        }, $);
        
        auditResults = {
          websiteUrl,
          performanceScore,
          seoScore,
          securityScore,
          mobileScore,
          accessibilityScore,
          recommendations
        };
        
      } catch (error) {
        console.error("Website audit error:", error);
        auditResults = {
          websiteUrl,
          performanceScore: 0,
          seoScore: 0,
          securityScore: 0,
          mobileScore: 0,
          accessibilityScore: 0,
          recommendations: {
            error: `Failed to audit website: ${error instanceof Error ? error.message : 'Unknown error'}`,
            suggestions: ['Check if the website is accessible and properly configured']
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
function calculatePerformanceScore($: cheerio.CheerioAPI, html: string): number {
  let score = 100;
  
  // Check for large HTML size
  if (html.length > 500000) score -= 20;
  
  // Check for excessive inline styles
  const inlineStyles = $('[style]').length;
  if (inlineStyles > 10) score -= 15;
  
  // Check for missing compression indicators
  if (!html.includes('gzip') && !html.includes('br')) score -= 10;
  
  // Check for excessive JavaScript files
  const scriptTags = $('script[src]').length;
  if (scriptTags > 10) score -= 15;
  
  // Check for excessive CSS files
  const linkTags = $('link[rel="stylesheet"]').length;
  if (linkTags > 5) score -= 10;
  
  return Math.max(0, score);
}

function calculateSEOScore($: cheerio.CheerioAPI): number {
  let score = 100;
  
  // Check for title tag
  const title = $('title').text();
  if (!title) score -= 20;
  else if (title.length < 30 || title.length > 60) score -= 10;
  
  // Check for meta description
  const metaDesc = $('meta[name="description"]').attr('content');
  if (!metaDesc) score -= 20;
  else if (metaDesc.length < 120 || metaDesc.length > 160) score -= 10;
  
  // Check for h1 tags
  const h1Tags = $('h1').length;
  if (h1Tags === 0) score -= 15;
  else if (h1Tags > 1) score -= 5;
  
  // Check for alt attributes on images
  const imagesWithoutAlt = $('img:not([alt])').length;
  if (imagesWithoutAlt > 0) score -= Math.min(20, imagesWithoutAlt * 5);
  
  // Check for proper heading structure
  const headings = $('h1, h2, h3, h4, h5, h6');
  if (headings.length === 0) score -= 10;
  
  return Math.max(0, score);
}

function calculateSecurityScore($: cheerio.CheerioAPI, response: Response): number {
  let score = 100;
  
  // Check for HTTPS
  const isHttps = response.url.startsWith('https://');
  if (!isHttps) score -= 30;
  
  // Check for mixed content
  const httpResources = $('script[src^="http:"], link[href^="http:"], img[src^="http:"]').length;
  if (httpResources > 0) score -= 20;
  
  // Check for inline scripts (potential XSS risk)
  const inlineScripts = $('script:not([src])').length;
  if (inlineScripts > 3) score -= 15;
  
  // Check for form security
  const formsWithoutMethod = $('form:not([method])').length;
  if (formsWithoutMethod > 0) score -= 10;
  
  return Math.max(0, score);
}

function calculateMobileScore($: cheerio.CheerioAPI): number {
  let score = 100;
  
  // Check for viewport meta tag
  const viewport = $('meta[name="viewport"]').attr('content');
  if (!viewport) score -= 30;
  else if (!viewport.includes('width=device-width')) score -= 15;
  
  // Check for responsive design indicators
  const responsiveClasses = $('[class*="responsive"], [class*="mobile"], [class*="tablet"]').length;
  if (responsiveClasses === 0) score -= 20;
  
  // Check for mobile-unfriendly elements
  const smallText = $('[style*="font-size"][style*="px"]').filter((_, el) => {
    const fontSize = $(el).css('font-size');
    const size = parseInt(fontSize);
    return size < 14;
  }).length;
  if (smallText > 0) score -= 15;
  
  return Math.max(0, score);
}

function calculateAccessibilityScore($: cheerio.CheerioAPI): number {
  let score = 100;
  
  // Check for alt attributes on images
  const imagesWithoutAlt = $('img:not([alt])').length;
  if (imagesWithoutAlt > 0) score -= Math.min(25, imagesWithoutAlt * 5);
  
  // Check for form labels
  const inputsWithoutLabels = $('input:not([aria-label]):not([id])').length;
  if (inputsWithoutLabels > 0) score -= Math.min(20, inputsWithoutLabels * 5);
  
  // Check for proper heading hierarchy
  const h1Count = $('h1').length;
  if (h1Count !== 1) score -= 10;
  
  // Check for color contrast indicators
  const colorStyles = $('[style*="color"]').length;
  if (colorStyles === 0) score -= 5;
  
  // Check for ARIA attributes
  const ariaElements = $('[aria-label], [aria-describedby], [role]').length;
  if (ariaElements === 0) score -= 15;
  
  return Math.max(0, score);
}

function generateRecommendations(scores: any, $: cheerio.CheerioAPI) {
  const recommendations = {
    performance: [] as string[],
    seo: [] as string[],
    security: [] as string[],
    mobile: [] as string[],
    accessibility: [] as string[],
    priority: [] as string[]
  };

  // Performance recommendations
  if (scores.performance < 80) {
    recommendations.performance.push('Optimize images and enable compression');
    recommendations.performance.push('Minimize CSS and JavaScript files');
    recommendations.performance.push('Implement caching strategies');
    recommendations.priority.push('Performance optimization is critical for user experience');
  }

  // SEO recommendations
  if (scores.seo < 80) {
    if (!$('title').text()) recommendations.seo.push('Add a descriptive title tag');
    if (!$('meta[name="description"]').attr('content')) recommendations.seo.push('Add a meta description');
    if ($('img:not([alt])').length > 0) recommendations.seo.push('Add alt attributes to all images');
    recommendations.priority.push('SEO improvements will increase search visibility');
  }

  // Security recommendations
  if (scores.security < 80) {
    recommendations.security.push('Implement HTTPS if not already enabled');
    recommendations.security.push('Remove or secure inline scripts');
    recommendations.security.push('Add Content Security Policy headers');
    recommendations.priority.push('Security vulnerabilities pose significant risks');
  }

  // Mobile recommendations
  if (scores.mobile < 80) {
    if (!$('meta[name="viewport"]').attr('content')) {
      recommendations.mobile.push('Add viewport meta tag for mobile optimization');
    }
    recommendations.mobile.push('Test and improve mobile responsiveness');
    recommendations.mobile.push('Optimize touch targets and font sizes');
  }

  // Accessibility recommendations
  if (scores.accessibility < 80) {
    recommendations.accessibility.push('Improve color contrast ratios');
    recommendations.accessibility.push('Add ARIA labels and descriptions');
    recommendations.accessibility.push('Ensure keyboard navigation works properly');
    recommendations.priority.push('Accessibility improvements help all users');
  }

  return recommendations;
}
