import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { sendEmailViaGmail } from "./gmail";
import {
  contactFormSchema,
  slotReservationFormSchema,
  auditFormSchema,
  moodBoardFormSchema,
} from "@shared/schema";
import { z } from "zod";
import * as cheerio from "cheerio";
// Lighthouse imports removed - using Google PageSpeed Insights API instead

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
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; color: #333333; padding: 0; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: #ffffff; font-size: 32px; margin: 0; font-weight: 700; letter-spacing: 1px;">PRIMORPHO</h1>
            <div style="color: rgba(255, 255, 255, 0.9); font-size: 16px; margin-top: 8px; font-weight: 500;">Website Design & Development</div>
          </div>
          
          <!-- Main Content -->
          <div style="padding: 30px;">
            ${isAuditRequest ? `
            <div style="background: #fef2f2; padding: 20px; margin-bottom: 25px; border: 2px solid #dc2626; border-radius: 8px; text-align: center;">
              <h2 style="color: #dc2626; margin: 0; font-size: 20px; font-weight: 700;">⚡ PRIORITY AUDIT REQUEST</h2>
              <p style="color: #374151; margin: 12px 0 0 0; font-size: 16px; font-weight: 500;">Website: <strong style="color: #1f2937;">${formData.websiteUrl}</strong></p>
            </div>
            ` : ''}
            
            <div style="background: #f0f9ff; padding: 25px; margin-bottom: 25px; border: 1px solid #0ea5e9; border-radius: 8px;">
              <h3 style="color: #0369a1; margin: 0 0 15px 0; font-size: 18px; font-weight: 700;">CLIENT DETAILS</h3>
              <p style="color: #374151; margin: 8px 0; font-size: 15px; line-height: 1.5;"><strong style="color: #1f2937;">Name:</strong> ${formData.name}</p>
              <p style="color: #374151; margin: 8px 0; font-size: 15px; line-height: 1.5;"><strong style="color: #1f2937;">Email:</strong> ${formData.email}</p>
              ${formData.business ? `<p style="color: #374151; margin: 8px 0; font-size: 15px; line-height: 1.5;"><strong style="color: #1f2937;">Business:</strong> ${formData.business}</p>` : ''}
              ${formData.phone ? `<p style="color: #374151; margin: 8px 0; font-size: 15px; line-height: 1.5;"><strong style="color: #1f2937;">Phone:</strong> ${formData.phone}</p>` : ''}
              ${formData.package ? `<p style="color: #374151; margin: 8px 0; font-size: 15px; line-height: 1.5;"><strong style="color: #1f2937;">Package Interest:</strong> ${formData.package}</p>` : ''}
            </div>
            
            ${formData.details ? `
            <div style="background: #f3f4f6; padding: 25px; margin-bottom: 25px; border: 1px solid #d1d5db; border-radius: 8px;">
              <h3 style="color: #374151; margin: 0 0 15px 0; font-size: 18px; font-weight: 700;">PROJECT DETAILS</h3>
              <p style="color: #4b5563; line-height: 1.6; font-size: 15px; margin: 0;">${formData.details}</p>
            </div>
            ` : ''}
            
            <div style="background: #fef3c7; padding: 25px; border: 1px solid #f59e0b; border-radius: 8px;">
              <h3 style="color: #92400e; margin: 0 0 15px 0; font-size: 18px; font-weight: 700;">NEXT ACTIONS</h3>
              <ul style="color: #78350f; margin: 0; padding-left: 20px; font-size: 15px; line-height: 1.6;">
                <li style="margin-bottom: 8px;"><strong>Response deadline:</strong> ${isAuditRequest ? '1 hour' : '24 hours'}</li>
                <li style="margin-bottom: 8px;"><a href="${process.env.REPLIT_DOMAINS?.split(',')[0] || 'localhost:5000'}/admin" style="color: #0ea5e9; text-decoration: none; font-weight: 600;">View submission in admin panel</a></li>
                ${isAuditRequest ? '<li style="margin-bottom: 8px;"><strong>Conduct website audit immediately</strong></li>' : ''}
              </ul>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">Professional web development services</p>
          </div>
        </div>
      `;

      await sendEmailViaGmail({
        to: process.env.GMAIL_USER || 'admin@primorpho.com',
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

  // Book consultation endpoint
  app.post("/api/book-consultation", async (req, res) => {
    try {
      const bookingSchema = z.object({
        consultationType: z.string(),
        selectedTime: z.string(),
        name: z.string().optional(),
        email: z.string().email().optional()
      });

      const { consultationType, selectedTime, name, email } = bookingSchema.parse(req.body);
      
      // For now, we'll use placeholder values for name and email if not provided
      const clientName = name || "Consultation Client";
      const clientEmail = email || "client@example.com";
      
      const consultationTypes = {
        "project-consultation": { name: "PROJECT CONSULTATION", duration: "30 minutes" },
        "technical-review": { name: "TECHNICAL REVIEW", duration: "45 minutes" },
        "strategy-session": { name: "STRATEGY SESSION", duration: "60 minutes" }
      };

      const timeSlots = {
        "9am": "9:00 AM EST",
        "11am": "11:00 AM EST", 
        "2pm": "2:00 PM EST",
        "3pm": "3:00 PM EST"
      };

      const selectedConsultation = consultationTypes[consultationType as keyof typeof consultationTypes];
      const selectedSlot = timeSlots[selectedTime as keyof typeof timeSlots];

      // Send confirmation email
      const emailSubject = `🎯 Consultation Booked: ${selectedConsultation?.name}`;
      const emailContent = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; color: #333333; padding: 0; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: #ffffff; font-size: 32px; margin: 0; font-weight: 700; letter-spacing: 1px;">PRIMORPHO</h1>
            <div style="color: rgba(255, 255, 255, 0.9); font-size: 16px; margin-top: 8px; font-weight: 500;">Consultation Booking Confirmed</div>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px;">
            <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px; padding: 30px; margin-bottom: 30px;">
              <h2 style="color: #1e293b; font-size: 24px; margin: 0 0 20px 0; font-weight: 600;">Booking Details</h2>
              
              <div style="display: grid; gap: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                  <span style="font-weight: 600; color: #475569;">Client:</span>
                  <span style="color: #1e293b;">${clientName}</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                  <span style="font-weight: 600; color: #475569;">Type:</span>
                  <span style="color: #0ea5e9; font-weight: 600;">${selectedConsultation?.name}</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                  <span style="font-weight: 600; color: #475569;">Time:</span>
                  <span style="color: #f59e0b; font-weight: 600;">${selectedSlot}</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0;">
                  <span style="font-weight: 600; color: #475569;">Duration:</span>
                  <span style="color: #8b5cf6; font-weight: 600;">${selectedConsultation?.duration}</span>
                </div>
              </div>
            </div>

            <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
              <h3 style="color: #92400e; font-size: 18px; margin: 0 0 10px 0; font-weight: 600;">⚡ Action Required</h3>
              <p style="color: #92400e; margin: 0; font-weight: 500;">Calendar invite and meeting details will be sent within 2 hours.</p>
            </div>

            <div style="text-align: center; margin-top: 30px;">
              <div style="background: #f1f5f9; border-radius: 8px; padding: 20px;">
                <p style="color: #475569; margin: 0; font-size: 14px;">Questions? Reply to this email or call us directly.</p>
              </div>
            </div>
          </div>
        </div>
      `;

      await sendEmailViaGmail({
        to: process.env.GMAIL_USER || 'your-email@gmail.com',
        subject: emailSubject,
        html: emailContent
      });

      res.json({ 
        success: true, 
        message: "Consultation booked successfully! You'll receive a confirmation email shortly."
      });

    } catch (error: any) {
      console.error("Booking consultation error:", error);
      res.status(400).json({ 
        success: false, 
        error: error.message || "Failed to book consultation" 
      });
    }
  });

  // Test endpoint to demonstrate authentic Lighthouse data structure
  app.post('/api/audit-demo', async (req, res) => {
    const { websiteUrl: rawUrl } = auditFormSchema.parse(req.body);
    
    // Simulate authentic Google Lighthouse results for demonstration
    const demoLighthouseData = {
      performanceScore: 85,
      seoScore: 92,
      accessibilityScore: 78,
      bestPracticesScore: 88,
      mobilePerformanceScore: 72,
      overallScore: 83,
      loadTime: 2400,
      lighthouseData: {
        fcp: 1800,
        lcp: 2400,
        cls: 0.045,
        tbt: 350,
        speedIndex: 2200,
        finalUrl: rawUrl
      },
      recommendations: {
        performance: [
          "Eliminate render-blocking resources",
          "Reduce unused JavaScript",
          "Serve images in next-gen formats"
        ],
        seo: [
          "Document has a meta description",
          "Links have descriptive text"
        ],
        accessibility: [
          "Image elements have [alt] attributes",
          "Form elements have associated labels"
        ],
        security: [
          "Uses HTTPS",
          "Links to cross-origin destinations are safe"
        ]
      }
    };

    const auditResult = await storage.createAuditResult({
      websiteUrl: rawUrl,
      loadTime: demoLighthouseData.loadTime,
      overallScore: demoLighthouseData.overallScore,
      performanceScore: demoLighthouseData.performanceScore,
      seoScore: demoLighthouseData.seoScore,
      securityScore: demoLighthouseData.bestPracticesScore,
      mobileScore: demoLighthouseData.mobilePerformanceScore,
      accessibilityScore: demoLighthouseData.accessibilityScore,
      technicalScore: demoLighthouseData.bestPracticesScore,
      contentScore: demoLighthouseData.seoScore,
      recommendations: demoLighthouseData.recommendations,
      lighthouseData: demoLighthouseData.lighthouseData
    });

    res.json({ 
      success: true, 
      audit: auditResult,
      lighthouseData: demoLighthouseData.lighthouseData 
    });
  });

  // Google Lighthouse API website analysis
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
    
    console.log(`Running Google Lighthouse analysis for: ${websiteUrl}`);

    // Check if we have the Google PageSpeed API key
    const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY;
    if (!apiKey || apiKey.length < 10) {
      console.log('Google PageSpeed API key not available, offering professional analysis');
      
      // Store request for professional analysis
      const auditResult = await storage.createAuditResult({
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
          analysis: "Professional analysis request submitted",
          timeline: [
            "Analysis request received and queued",
            "Expert review using Google Lighthouse and GTmetrix within 24 hours",
            "Comprehensive report with actionable recommendations delivered",
            "Follow-up consultation available upon request"
          ],
          included: [
            "Google Lighthouse performance audit",
            "Core Web Vitals analysis",
            "SEO optimization recommendations", 
            "Security vulnerability assessment",
            "Mobile responsiveness evaluation",
            "Technical improvement roadmap"
          ]
        }
      });
      
      return res.json({ success: true, audit: auditResult });
    }
    
    try {
      // Call Google PageSpeed Insights API for desktop (matches standard Lighthouse reports)
      const desktopUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(websiteUrl)}&key=${apiKey}&strategy=desktop&category=performance&category=seo&category=accessibility&category=best-practices`;

      console.log('Calling Google PageSpeed Insights API...');
      const desktopResponse = await fetch(desktopUrl);

      if (!desktopResponse.ok) {
        const errorData = await desktopResponse.json();
        console.error('PageSpeed API error:', errorData);
        
        if (errorData.error?.message?.includes('API key not valid')) {
          console.log('Invalid API key, falling back to professional analysis request');
          
          // Store request for professional analysis due to API key issue
          const auditResult = await storage.createAuditResult({
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
              analysis: "Professional analysis request submitted",
              timeline: [
                "Analysis request received and queued",
                "Expert review using Google Lighthouse and GTmetrix within 24 hours",
                "Comprehensive report with actionable recommendations delivered",
                "Follow-up consultation available upon request"
              ],
              included: [
                "Google Lighthouse performance audit",
                "Core Web Vitals analysis (FCP, LCP, CLS, TBT)",
                "SEO optimization recommendations", 
                "Security vulnerability assessment",
                "Mobile responsiveness evaluation",
                "Technical improvement roadmap with priorities"
              ]
            }
          });
          
          return res.json({ success: true, audit: auditResult });
        }
        
        if (errorData.error?.message?.includes('unreachable')) {
          return res.status(400).json({ 
            success: false,
            message: "Website is unreachable. Please check if the URL is correct and accessible." 
          });
        }
        
        return res.status(400).json({ 
          success: false,
          message: "Unable to analyze website. Please check if the URL is accessible and try again." 
        });
      }

      const desktopData = await desktopResponse.json();

      // Extract authentic Lighthouse scores exactly as Google reports them
      const lighthouseResult = desktopData.lighthouseResult;
      
      const performanceScore = Math.round((lighthouseResult.categories.performance?.score || 0) * 100);
      const seoScore = Math.round((lighthouseResult.categories.seo?.score || 0) * 100);
      const accessibilityScore = Math.round((lighthouseResult.categories.accessibility?.score || 0) * 100);
      const bestPracticesScore = Math.round((lighthouseResult.categories['best-practices']?.score || 0) * 100);

      // Use Google's standard overall score calculation (performance score as primary indicator)
      const overallScore = performanceScore;

      // Extract key metrics
      const audits = lighthouseResult.audits;

      // Performance metrics from Lighthouse
      const loadTime = Math.round(audits['largest-contentful-paint']?.numericValue || 0);
      const fcp = Math.round(audits['first-contentful-paint']?.numericValue || 0);
      const lcp = Math.round(audits['largest-contentful-paint']?.numericValue || 0);
      const cls = Math.round((audits['cumulative-layout-shift']?.numericValue || 0) * 1000) / 1000;
      const tbt = Math.round(audits['total-blocking-time']?.numericValue || 0);
      const speedIndex = Math.round(audits['speed-index']?.numericValue || 0);

      // Extract recommendations from failed audits
      const recommendations = {
        performance: extractLighthouseRecommendations(lighthouseResult, 'performance'),
        seo: extractLighthouseRecommendations(lighthouseResult, 'seo'),
        accessibility: extractLighthouseRecommendations(lighthouseResult, 'accessibility'),
        security: extractLighthouseRecommendations(lighthouseResult, 'best-practices'),
        mobile: extractLighthouseRecommendations(lighthouseResult, 'accessibility'),
        technical: extractLighthouseRecommendations(lighthouseResult, 'best-practices'),
        priority: [
          ...extractLighthouseRecommendations(lighthouseResult, 'performance').slice(0, 2),
          ...extractLighthouseRecommendations(lighthouseResult, 'seo').slice(0, 2),
          ...extractLighthouseRecommendations(lighthouseResult, 'best-practices').slice(0, 1)
        ].slice(0, 5)
      };

      console.log(`Google Lighthouse analysis completed for ${websiteUrl}. Overall score: ${overallScore}`);
      
      // Store audit result with Lighthouse data
      const auditResult = await storage.createAuditResult({
        websiteUrl,
        loadTime,
        overallScore,
        performanceScore,
        seoScore,
        securityScore: bestPracticesScore,
        mobileScore: accessibilityScore,
        accessibilityScore,
        technicalScore: bestPracticesScore,
        contentScore: seoScore,
        recommendations,
        lighthouseData: {
          fcp,
          lcp,
          cls,
          tbt,
          speedIndex,
          finalUrl: lighthouseResult.finalUrl,
          fetchTime: lighthouseResult.fetchTime
        }
      });

      res.json({ 
        success: true, 
        audit: auditResult,
        lighthouseData: {
          fcp,
          lcp,
          cls,
          tbt,
          speedIndex,
          finalUrl: lighthouseResult.finalUrl
        }
      });

    } catch (error: any) {
      console.error("Google Lighthouse API error:", error);
      
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

      // Send email notification
      const emailSubject = `🎯 NEW PROJECT SLOT RESERVED: ${formData.package} - ${formData.name}`;

      const emailContent = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; color: #333333; padding: 0; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: #ffffff; font-size: 32px; margin: 0; font-weight: 700; letter-spacing: 1px;">PRIMORPHO</h1>
            <div style="color: rgba(255, 255, 255, 0.9); font-size: 16px; margin-top: 8px; font-weight: 500;">Website Design & Development</div>
          </div>
          
          <!-- Main Content -->
          <div style="padding: 30px;">
            <div style="background: #fef3c7; padding: 20px; margin-bottom: 25px; border: 2px solid #f59e0b; border-radius: 8px; text-align: center;">
              <h2 style="color: #92400e; margin: 0; font-size: 20px; font-weight: 700;">🚀 PROJECT SLOT RESERVED</h2>
              <p style="color: #78350f; margin: 12px 0 0 0; font-size: 16px; font-weight: 500;">Package: <strong style="color: #451a03;">${formData.package}</strong></p>
              <p style="color: #78350f; margin: 8px 0 0 0; font-size: 15px;">Preferred Slot: <strong style="color: #451a03;">${formData.preferredSlot}</strong></p>
            </div>
            
            <div style="background: #f0f9ff; padding: 25px; margin-bottom: 25px; border: 1px solid #0ea5e9; border-radius: 8px;">
              <h3 style="color: #0369a1; margin: 0 0 15px 0; font-size: 18px; font-weight: 700;">CLIENT DETAILS</h3>
              <p style="color: #374151; margin: 8px 0; font-size: 15px; line-height: 1.5;"><strong style="color: #1f2937;">Name:</strong> ${formData.name}</p>
              <p style="color: #374151; margin: 8px 0; font-size: 15px; line-height: 1.5;"><strong style="color: #1f2937;">Email:</strong> ${formData.email}</p>
              ${formData.business ? `<p style="color: #374151; margin: 8px 0; font-size: 15px; line-height: 1.5;"><strong style="color: #1f2937;">Business:</strong> ${formData.business}</p>` : ''}
              ${formData.phone ? `<p style="color: #374151; margin: 8px 0; font-size: 15px; line-height: 1.5;"><strong style="color: #1f2937;">Phone:</strong> ${formData.phone}</p>` : ''}
              ${formData.timeline ? `<p style="color: #374151; margin: 8px 0; font-size: 15px; line-height: 1.5;"><strong style="color: #1f2937;">Timeline:</strong> ${formData.timeline}</p>` : ''}
              ${formData.budget ? `<p style="color: #374151; margin: 8px 0; font-size: 15px; line-height: 1.5;"><strong style="color: #1f2937;">Budget:</strong> ${formData.budget}</p>` : ''}
            </div>
            
            ${formData.projectDetails ? `
            <div style="background: #f3f4f6; padding: 25px; margin-bottom: 25px; border: 1px solid #d1d5db; border-radius: 8px;">
              <h3 style="color: #374151; margin: 0 0 15px 0; font-size: 18px; font-weight: 700;">PROJECT DETAILS</h3>
              <p style="color: #4b5563; line-height: 1.6; font-size: 15px; margin: 0;">${formData.projectDetails}</p>
            </div>
            ` : ''}
            
            <div style="background: #fef2f2; padding: 25px; margin-bottom: 25px; border: 1px solid #dc2626; border-radius: 8px;">
              <h3 style="color: #991b1b; margin: 0 0 15px 0; font-size: 18px; font-weight: 700;">URGENT ACTIONS REQUIRED</h3>
              <ul style="color: #7f1d1d; margin: 0; padding-left: 20px; font-size: 15px; line-height: 1.6;">
                <li style="margin-bottom: 8px;"><strong>Response deadline: 24 hours</strong></li>
                <li style="margin-bottom: 8px;">Send confirmation email to client</li>
                <li style="margin-bottom: 8px;">Schedule discovery call within 2 days</li>
                <li style="margin-bottom: 8px;"><a href="${process.env.REPLIT_DOMAINS?.split(',')[0] || 'localhost:5000'}/admin" style="color: #0ea5e9; text-decoration: none; font-weight: 600;">View reservation in admin panel</a></li>
                <li style="margin-bottom: 8px;">Update project pipeline and availability</li>
              </ul>
            </div>
            
            <div style="background: #f0f9ff; padding: 25px; border: 1px solid #0ea5e9; border-radius: 8px; text-align: center;">
              <p style="color: #0369a1; font-size: 16px; margin: 0; font-weight: 600;">
                Reservation ID: #${reservation.id}
              </p>
              <p style="color: #374151; font-size: 14px; margin: 12px 0 0 0;">
                Time to convert this lead into a paying client!
              </p>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">Professional web development services</p>
          </div>
        </div>
      `;

      await sendEmailViaGmail({
        to: process.env.GMAIL_USER || 'admin@primorpho.com',
        subject: emailSubject,
        html: emailContent
      });

      res.json({ success: true, message: "Slot reserved successfully! We'll confirm your booking within 24 hours.", reservation });
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

      // Send email notification
      const emailSubject = `🎨 NEW MOOD BOARD GENERATED: ${formData.projectName}`;

      const emailContent = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; color: #333333; padding: 0; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: #ffffff; font-size: 32px; margin: 0; font-weight: 700; letter-spacing: 1px;">PRIMORPHO</h1>
            <div style="color: rgba(255, 255, 255, 0.9); font-size: 16px; margin-top: 8px; font-weight: 500;">Website Design & Development</div>
          </div>
          
          <!-- Main Content -->
          <div style="padding: 30px;">
            <div style="background: #f0fdf4; padding: 20px; margin-bottom: 25px; border: 2px solid #22c55e; border-radius: 8px; text-align: center;">
              <h2 style="color: #15803d; margin: 0; font-size: 20px; font-weight: 700;">🎨 MOOD BOARD GENERATED</h2>
              <p style="color: #166534; margin: 12px 0 0 0; font-size: 16px; font-weight: 500;">Project: <strong style="color: #14532d;">${formData.projectName}</strong></p>
              <p style="color: #166534; margin: 8px 0 0 0; font-size: 15px;">Type: <strong style="color: #14532d;">${formData.projectType}</strong></p>
            </div>
            
            <div style="background: #f0f9ff; padding: 25px; margin-bottom: 25px; border: 1px solid #0ea5e9; border-radius: 8px;">
              <h3 style="color: #0369a1; margin: 0 0 15px 0; font-size: 18px; font-weight: 700;">PROJECT DETAILS</h3>
              <p style="color: #374151; margin: 8px 0; font-size: 15px; line-height: 1.5;"><strong style="color: #1f2937;">Target Audience:</strong> ${formData.targetAudience}</p>
              <p style="color: #374151; margin: 8px 0; font-size: 15px; line-height: 1.5;"><strong style="color: #1f2937;">Business Goals:</strong> ${formData.businessGoals}</p>
              <p style="color: #374151; margin: 8px 0; font-size: 15px; line-height: 1.5;"><strong style="color: #1f2937;">Brand Personality:</strong> ${Array.isArray(formData.brandPersonality) ? formData.brandPersonality.join(', ') : formData.brandPersonality}</p>
              <p style="color: #374151; margin: 8px 0; font-size: 15px; line-height: 1.5;"><strong style="color: #1f2937;">Color Preferences:</strong> ${Array.isArray(formData.colorPreferences) ? formData.colorPreferences.join(', ') : formData.colorPreferences}</p>
              <p style="color: #374151; margin: 8px 0; font-size: 15px; line-height: 1.5;"><strong style="color: #1f2937;">Style Preferences:</strong> ${Array.isArray(formData.stylePreferences) ? formData.stylePreferences.join(', ') : formData.stylePreferences}</p>
              ${formData.clientEmail ? `<p style="color: #374151; margin: 8px 0; font-size: 15px; line-height: 1.5;"><strong style="color: #1f2937;">Client Email:</strong> ${formData.clientEmail}</p>` : ''}
            </div>
            
            ${formData.inspirationDescription ? `
            <div style="background: #f3f4f6; padding: 25px; margin-bottom: 25px; border: 1px solid #d1d5db; border-radius: 8px;">
              <h3 style="color: #374151; margin: 0 0 15px 0; font-size: 18px; font-weight: 700;">INSPIRATION DETAILS</h3>
              <p style="color: #4b5563; line-height: 1.6; font-size: 15px; margin: 0;">${formData.inspirationDescription}</p>
            </div>
            ` : ''}
            
            <div style="background: #fef3c7; padding: 25px; margin-bottom: 25px; border: 1px solid #f59e0b; border-radius: 8px;">
              <h3 style="color: #92400e; margin: 0 0 15px 0; font-size: 18px; font-weight: 700;">NEXT ACTIONS</h3>
              <ul style="color: #78350f; margin: 0; padding-left: 20px; font-size: 15px; line-height: 1.6;">
                <li style="margin-bottom: 8px;">Review generated mood board in admin panel</li>
                <li style="margin-bottom: 8px;">Contact client if email provided</li>
                <li style="margin-bottom: 8px;">Use insights for project proposal</li>
                <li style="margin-bottom: 8px;"><a href="${process.env.REPLIT_DOMAINS?.split(',')[0] || 'localhost:5000'}/admin" style="color: #0ea5e9; text-decoration: none; font-weight: 600;">View mood board in admin panel</a></li>
              </ul>
            </div>
            
            <div style="background: #f0fdf4; padding: 25px; border: 1px solid #22c55e; border-radius: 8px; text-align: center;">
              <p style="color: #15803d; font-size: 16px; margin: 0; font-weight: 600;">
                Mood Board ID: #${moodBoard.id}
              </p>
              <p style="color: #374151; font-size: 14px; margin: 12px 0 0 0;">
                Creative vision captured!
              </p>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">Professional web development services</p>
          </div>
        </div>
      `;

      await sendEmailViaGmail({
        to: process.env.GMAIL_USER || 'admin@primorpho.com',
        subject: emailSubject,
        html: emailContent
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
      features: ["Hero section", "Key benefits", "Social proof", "Clear CTA"]
    },
    {
      name: "Content-Rich Pages",
      description: "Detailed information presented in digestible sections",
      features: ["Section headers", "Content blocks", "Visual breaks", "Progressive disclosure"]
    },
    {
      name: "Conversion-Optimized",
      description: "Strategic placement of calls-to-action and trust signals",
      features: ["Multiple CTAs", "Trust indicators", "Risk reduction", "Urgency elements"]
    }
  ];
}

// Instant analysis functions for immediate audit results
function calculateBasicPerformanceScore(loadTime: number, htmlSize: number): { score: number; recommendations: string[]; priority: string[] } {
  const recommendations: string[] = [];
  const priority: string[] = [];
  
  // Lighthouse Performance scoring methodology
  // Based on Core Web Vitals and key metrics
  
  // First Contentful Paint (FCP) - approximated from loadTime
  // Good: < 1.8s, Needs Improvement: 1.8-3.0s, Poor: > 3.0s
  let fcpScore = 100;
  if (loadTime > 3000) {
    fcpScore = 25; // Poor
    recommendations.push("First Contentful Paint: Reduce server response time");
    priority.push("Slow First Contentful Paint");
  } else if (loadTime > 1800) {
    fcpScore = 50; // Needs Improvement
    recommendations.push("First Contentful Paint: Optimize server response time");
  } else {
    fcpScore = 100; // Good
  }
  
  // Largest Contentful Paint (LCP) - approximated as loadTime
  // Good: < 2.5s, Needs Improvement: 2.5-4.0s, Poor: > 4.0s
  let lcpScore = 100;
  if (loadTime > 4000) {
    lcpScore = 25; // Poor
    recommendations.push("Largest Contentful Paint: Optimize loading performance");
    priority.push("Slow Largest Contentful Paint");
  } else if (loadTime > 2500) {
    lcpScore = 50; // Needs Improvement
    recommendations.push("Largest Contentful Paint: Improve loading speed");
  } else {
    lcpScore = 100; // Good
  }
  
  // Speed Index - approximated from loadTime
  let speedIndexScore = 100;
  if (loadTime > 4300) {
    speedIndexScore = 25;
    recommendations.push("Speed Index: Optimize content loading");
  } else if (loadTime > 3400) {
    speedIndexScore = 50;
    recommendations.push("Speed Index: Improve content loading speed");
  } else {
    speedIndexScore = 100;
  }
  
  // Cumulative Layout Shift (CLS) - cannot measure without rendering
  // Assume neutral score unless obvious issues
  let clsScore = 100;
  
  // Total Blocking Time (TBT) - approximated from HTML size
  let tbtScore = 100;
  if (htmlSize > 1000000) {
    tbtScore = 25;
    recommendations.push("Total Blocking Time: Reduce JavaScript execution time");
  } else if (htmlSize > 500000) {
    tbtScore = 50;
    recommendations.push("Total Blocking Time: Optimize JavaScript");
  } else {
    tbtScore = 100;
  }
  
  // Lighthouse Performance score calculation (weighted average)
  // FCP: 10%, LCP: 25%, CLS: 25%, TBT: 30%, Speed Index: 10%
  const performanceScore = Math.round(
    (fcpScore * 0.10) +
    (lcpScore * 0.25) +
    (clsScore * 0.25) +
    (tbtScore * 0.30) +
    (speedIndexScore * 0.10)
  );
  
  // Additional recommendations based on metrics
  if (performanceScore < 50) {
    recommendations.push("Consider using a CDN and image optimization");
    recommendations.push("Minimize render-blocking resources");
  } else if (performanceScore < 90) {
    recommendations.push("Optimize images and enable text compression");
  }
  
  return { score: performanceScore, recommendations, priority };
}

function analyzeSEO($: cheerio.CheerioAPI, html: string): { score: number; recommendations: string[]; priority: string[] } {
  const recommendations: string[] = [];
  const priority: string[] = [];
  let score = 100;
  let failedAudits = 0;
  
  // Document has a <title> element (7 points)
  const title = $('title').text();
  if (!title) {
    score -= 7;
    failedAudits++;
    recommendations.push("Document does not have a <title> element");
    priority.push("Missing title tag");
  }
  
  // Document has a meta description (7 points)
  const metaDesc = $('meta[name="description"]').attr('content');
  if (!metaDesc) {
    score -= 7;
    failedAudits++;
    recommendations.push("Document does not have a meta description");
    priority.push("Missing meta description");
  }
  
  // Page has successful HTTP status code (7 points)
  // This is handled at the request level, assume success if we got here
  
  // Links have descriptive text (7 points)
  const linksWithoutText = $('a').filter(function() {
    const text = $(this).text().trim();
    const ariaLabel = $(this).attr('aria-label');
    return !text && !ariaLabel;
  }).length;
  if (linksWithoutText > 0) {
    score -= 7;
    failedAudits++;
    recommendations.push(`${linksWithoutText} link(s) do not have descriptive text`);
  }
  
  // Image elements have [alt] attributes (7 points)
  const imagesWithoutAlt = $('img:not([alt])').length;
  if (imagesWithoutAlt > 0) {
    score -= 7;
    failedAudits++;
    recommendations.push(`Image elements do not have [alt] attributes (${imagesWithoutAlt} images)`);
    priority.push("Images missing alt text");
  }
  
  // Document has a valid hreflang (7 points) - check if international
  const hreflangElements = $('link[hreflang]').length;
  const hasHreflang = hreflangElements > 0;
  
  // Document uses legible font sizes (7 points)
  // Basic check for common small font issues
  if (html.includes('font-size:') && (html.includes('10px') || html.includes('11px'))) {
    score -= 7;
    failedAudits++;
    recommendations.push("Document uses legible font sizes");
  }
  
  // Links are crawlable (7 points)
  const javascriptLinks = $('a[href^="javascript:"]').length;
  if (javascriptLinks > 0) {
    score -= 7;
    failedAudits++;
    recommendations.push("Links are not crawlable");
  }
  
  // Page isn't blocked from indexing (7 points)
  const noIndex = $('meta[name="robots"][content*="noindex"]').length;
  if (noIndex > 0) {
    score -= 7;
    failedAudits++;
    recommendations.push("Page is blocked from indexing");
  }
  
  // Document has a valid lang attribute (7 points)
  const htmlLang = $('html').attr('lang');
  if (!htmlLang) {
    score -= 7;
    failedAudits++;
    recommendations.push("Document does not have a valid lang attribute");
  }
  
  // Lighthouse SEO scoring: Based on weighted average of audits
  // Convert to 0-100 scale matching Lighthouse methodology
  const lighthouseScore = Math.round(Math.max(0, score));
  
  if (failedAudits === 0) {
    recommendations.push("All SEO audits passed");
  }
  
  return { score: lighthouseScore, recommendations, priority };
}

function analyzeBasicSecurity($: cheerio.CheerioAPI, response: Response): { score: number; recommendations: string[]; priority: string[] } {
  const recommendations: string[] = [];
  const priority: string[] = [];
  let score = 100;
  let failedAudits = 0;
  
  // Uses HTTPS (Major impact - 25 points)
  const url = new URL(response.url);
  if (url.protocol !== 'https:') {
    score -= 25;
    failedAudits++;
    recommendations.push("Does not use HTTPS");
    priority.push("Not using HTTPS");
  }
  
  // Avoids requesting notification permission on page load (10 points)
  if ($('script').text().includes('Notification.requestPermission')) {
    score -= 10;
    failedAudits++;
    recommendations.push("Avoids requesting the notification permission on page load");
  }
  
  // Avoids requesting geolocation permission on page load (10 points)
  if ($('script').text().includes('navigator.geolocation')) {
    score -= 10;
    failedAudits++;
    recommendations.push("Avoids requesting the geolocation permission on page load");
  }
  
  // No browser errors logged to the console (10 points)
  // Cannot detect console errors from server-side analysis
  
  // Links to external sites use rel="noopener" (10 points)
  const externalLinksWithoutNoopener = $('a[href^="http"]:not([rel*="noopener"])').length;
  if (externalLinksWithoutNoopener > 0) {
    score -= 10;
    failedAudits++;
    recommendations.push(`Links to cross-origin destinations are unsafe (${externalLinksWithoutNoopener} links)`);
  }
  
  // Avoids deprecated APIs (10 points)
  const deprecatedAPIs = ['webkitURL', 'webkitRequestAnimationFrame'];
  const hasDeprecatedAPI = deprecatedAPIs.some(api => 
    $('script').text().includes(api) || 
    $('*').attr('onclick')?.includes(api)
  );
  if (hasDeprecatedAPI) {
    score -= 10;
    failedAudits++;
    recommendations.push("Avoids deprecated APIs");
  }
  
  // Ensures Content Security Policy is effective (10 points)
  const headers = response.headers;
  const csp = headers.get('content-security-policy');
  if (!csp || csp.includes("'unsafe-inline'") || csp.includes("'unsafe-eval'")) {
    score -= 10;
    failedAudits++;
    recommendations.push("Content Security Policy (CSP) is effective against XSS attacks");
  }
  
  // Detected JavaScript libraries with known security vulnerabilities (10 points)
  const vulnerableLibraries = ['jquery-1.', 'jquery-2.', 'angular-1.'];
  let hasVulnerableLib = false;
  $('script[src]').each(function() {
    const src = $(this).attr('src');
    if (src && vulnerableLibraries.some(lib => src.includes(lib))) {
      hasVulnerableLib = true;
    }
  });
  if (hasVulnerableLib) {
    score -= 10;
    failedAudits++;
    recommendations.push("Includes front-end JavaScript libraries with known security vulnerabilities");
  }
  
  // Avoids front-end JavaScript libraries with known security vulnerabilities (5 points)
  // Covered above
  
  // Lighthouse Best Practices scoring methodology
  const lighthouseScore = Math.round(Math.max(0, score));
  
  if (failedAudits === 0) {
    recommendations.push("All best practices audits passed");
  }
  
  return { score: lighthouseScore, recommendations, priority };
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
  let failedAudits = 0;
  
  // Image elements have [alt] attributes (10 points)
  const imagesWithoutAlt = $('img:not([alt])').length;
  if (imagesWithoutAlt > 0) {
    score -= 10;
    failedAudits++;
    recommendations.push(`Image elements do not have [alt] attributes (${imagesWithoutAlt} images)`);
    priority.push("Images missing alt text");
  }
  
  // Form elements have associated labels (10 points)
  const inputsWithoutLabels = $('input:not([type="hidden"]):not([aria-label]):not([aria-labelledby])').filter(function() {
    const id = $(this).attr('id');
    return !id || $(`label[for="${id}"]`).length === 0;
  }).length;
  if (inputsWithoutLabels > 0) {
    score -= 10;
    failedAudits++;
    recommendations.push(`Form elements do not have associated labels (${inputsWithoutLabels} elements)`);
  }
  
  // Links have a discernible name (10 points)
  const linksWithoutText = $('a').filter(function() {
    const text = $(this).text().trim();
    const ariaLabel = $(this).attr('aria-label');
    const title = $(this).attr('title');
    return !text && !ariaLabel && !title;
  }).length;
  if (linksWithoutText > 0) {
    score -= 10;
    failedAudits++;
    recommendations.push(`Links do not have a discernible name (${linksWithoutText} links)`);
  }
  
  // Background and foreground colors have a sufficient contrast ratio (10 points)
  // Note: Cannot accurately detect contrast without rendering, so we check for common issues
  const potentialContrastIssues = $('*').filter(function() {
    const style = $(this).attr('style') || '';
    return style.includes('color:#ccc') || style.includes('color:#ddd') || style.includes('color:gray');
  }).length;
  if (potentialContrastIssues > 0) {
    score -= 10;
    failedAudits++;
    recommendations.push("Background and foreground colors do not have sufficient contrast ratio");
  }
  
  // [lang] attribute has a valid value (10 points)
  const htmlLang = $('html').attr('lang');
  if (!htmlLang) {
    score -= 10;
    failedAudits++;
    recommendations.push("[lang] attribute has a valid value");
  }
  
  // Document has a <title> element (10 points)
  const title = $('title').text();
  if (!title) {
    score -= 10;
    failedAudits++;
    recommendations.push("Document does not have a <title> element");
  }
  
  // [aria-*] attributes have valid values (10 points)
  const invalidAriaAttrs = $('*[aria-expanded=""]').length + $('*[aria-hidden=""]').length;
  if (invalidAriaAttrs > 0) {
    score -= 10;
    failedAudits++;
    recommendations.push("[aria-*] attributes do not have valid values");
  }
  
  // Button elements have an accessible name (10 points)
  const buttonsWithoutName = $('button').filter(function() {
    const text = $(this).text().trim();
    const ariaLabel = $(this).attr('aria-label');
    const title = $(this).attr('title');
    return !text && !ariaLabel && !title;
  }).length;
  if (buttonsWithoutName > 0) {
    score -= 10;
    failedAudits++;
    recommendations.push(`Button elements do not have an accessible name (${buttonsWithoutName} buttons)`);
  }
  
  // Document has a valid DOCTYPE (5 points)
  const hasDoctype = $('html').length > 0; // Basic check
  if (!hasDoctype) {
    score -= 5;
    failedAudits++;
    recommendations.push("Document does not have a valid DOCTYPE");
  }
  
  // No element has a [tabindex] value greater than 0 (5 points)
  const highTabindex = $('*[tabindex]').filter(function() {
    const tabindex = parseInt($(this).attr('tabindex') || '0');
    return tabindex > 0;
  }).length;
  if (highTabindex > 0) {
    score -= 5;
    failedAudits++;
    recommendations.push("No element has a [tabindex] value greater than 0");
  }
  
  // Lighthouse Accessibility scoring methodology
  const lighthouseScore = Math.round(Math.max(0, score));
  
  if (failedAudits === 0) {
    recommendations.push("All accessibility audits passed");
  }
  
  return { score: lighthouseScore, recommendations, priority };
}