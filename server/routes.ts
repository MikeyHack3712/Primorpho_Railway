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
      // Call Google PageSpeed Insights API for both mobile and desktop
      const mobileUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(websiteUrl)}&key=${apiKey}&strategy=mobile&category=performance&category=seo&category=accessibility&category=best-practices`;
      const desktopUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(websiteUrl)}&key=${apiKey}&strategy=desktop&category=performance&category=seo&category=accessibility&category=best-practices`;

      console.log('Calling Google PageSpeed Insights API...');
      const [mobileResponse, desktopResponse] = await Promise.all([
        fetch(mobileUrl),
        fetch(desktopUrl)
      ]);

      if (!mobileResponse.ok || !desktopResponse.ok) {
        const errorData = !mobileResponse.ok ? await mobileResponse.json() : await desktopResponse.json();
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

      const mobileData = await mobileResponse.json();
      const desktopData = await desktopResponse.json();

      // Extract Lighthouse scores (using desktop scores as primary, mobile for mobile-specific)
      const lighthouseResult = desktopData.lighthouseResult;
      const mobileLighthouseResult = mobileData.lighthouseResult;
      
      const performanceScore = Math.round((lighthouseResult.categories.performance?.score || 0) * 100);
      const seoScore = Math.round((lighthouseResult.categories.seo?.score || 0) * 100);
      const accessibilityScore = Math.round((lighthouseResult.categories.accessibility?.score || 0) * 100);
      const bestPracticesScore = Math.round((lighthouseResult.categories['best-practices']?.score || 0) * 100);
      const mobilePerformanceScore = Math.round((mobileLighthouseResult.categories.performance?.score || 0) * 100);

      // Calculate overall score
      const overallScore = Math.round(
        (performanceScore * 0.25) +
        (seoScore * 0.25) +
        (bestPracticesScore * 0.20) +
        (mobilePerformanceScore * 0.15) +
        (accessibilityScore * 0.15)
      );

      // Extract key metrics
      const audits = lighthouseResult.audits;
      const mobileAudits = mobileLighthouseResult.audits;

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
        mobile: extractLighthouseRecommendations(mobileLighthouseResult, 'performance'),
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
        mobileScore: mobilePerformanceScore,
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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: white; padding: 30px; border-radius: 15px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #00ffff; font-size: 28px; margin: 0; text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);">PRIMORPHO</h1>
            <div style="color: #b266ff; font-size: 14px; margin-top: 5px;">NEURAL WEB SOLUTIONS</div>
          </div>
          
          <div style="background: rgba(255, 215, 0, 0.1); padding: 15px; margin: 20px 0; border: 2px solid #ffd700; border-radius: 10px; text-align: center;">
            <h2 style="color: #ffd700; margin: 0; font-size: 20px;">🚀 PROJECT SLOT RESERVED 🚀</h2>
            <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 18px;">Package: <strong>${formData.package}</strong></p>
            <p style="color: #ffffff; margin: 5px 0 0 0; font-size: 16px;">Preferred Slot: <strong>${formData.preferredSlot}</strong></p>
          </div>
          
          <div style="background: rgba(0, 255, 255, 0.1); padding: 20px; margin: 20px 0; border: 1px solid #00ffff; border-radius: 10px;">
            <h3 style="color: #00ffff; margin-top: 0;">CLIENT DETAILS:</h3>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            ${formData.business ? `<p><strong>Business:</strong> ${formData.business}</p>` : ''}
            ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
            ${formData.timeline ? `<p><strong>Timeline:</strong> ${formData.timeline}</p>` : ''}
            ${formData.budget ? `<p><strong>Budget:</strong> ${formData.budget}</p>` : ''}
          </div>
          
          ${formData.projectDetails ? `
          <div style="background: rgba(178, 102, 255, 0.1); padding: 20px; margin: 20px 0; border: 1px solid #b266ff; border-radius: 10px;">
            <h3 style="color: #b266ff; margin-top: 0;">PROJECT DETAILS:</h3>
            <p style="line-height: 1.6;">${formData.projectDetails}</p>
          </div>
          ` : ''}
          
          <div style="background: rgba(255, 215, 0, 0.1); padding: 15px; margin: 20px 0; border: 1px solid #ffd700; border-radius: 10px;">
            <h3 style="color: #ffd700; margin-top: 0;">URGENT ACTIONS REQUIRED:</h3>
            <ul style="margin: 10px 0;">
              <li><strong>Response deadline: 24 hours</strong></li>
              <li>Send confirmation email to client</li>
              <li>Schedule discovery call within 2 days</li>
              <li>Admin panel: <a href="${process.env.REPLIT_DOMAINS?.split(',')[0] || 'localhost:5000'}/admin" style="color: #00ffff;">View reservation</a></li>
              <li>Update project pipeline and availability</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding: 20px; background: rgba(0, 255, 255, 0.05); border-radius: 10px;">
            <p style="color: #00ffff; font-size: 16px; margin: 0;">
              <strong>Reservation ID:</strong> #${reservation.id}
            </p>
            <p style="color: #ffffff; font-size: 14px; margin: 10px 0 0 0;">
              Time to convert this lead into a paying client! 💼
            </p>
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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: white; padding: 30px; border-radius: 15px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #00ffff; font-size: 28px; margin: 0; text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);">PRIMORPHO</h1>
            <div style="color: #b266ff; font-size: 14px; margin-top: 5px;">NEURAL WEB SOLUTIONS</div>
          </div>
          
          <div style="background: rgba(255, 20, 147, 0.1); padding: 15px; margin: 20px 0; border: 2px solid #ff1493; border-radius: 10px; text-align: center;">
            <h2 style="color: #ff1493; margin: 0; font-size: 20px;">🎨 MOOD BOARD GENERATED 🎨</h2>
            <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 18px;">Project: <strong>${formData.projectName}</strong></p>
            <p style="color: #ffffff; margin: 5px 0 0 0; font-size: 16px;">Type: <strong>${formData.projectType}</strong></p>
          </div>
          
          <div style="background: rgba(0, 255, 255, 0.1); padding: 20px; margin: 20px 0; border: 1px solid #00ffff; border-radius: 10px;">
            <h3 style="color: #00ffff; margin-top: 0;">PROJECT DETAILS:</h3>
            <p><strong>Target Audience:</strong> ${formData.targetAudience}</p>
            <p><strong>Business Goals:</strong> ${formData.businessGoals}</p>
            <p><strong>Brand Personality:</strong> ${Array.isArray(formData.brandPersonality) ? formData.brandPersonality.join(', ') : formData.brandPersonality}</p>
            <p><strong>Color Preferences:</strong> ${Array.isArray(formData.colorPreferences) ? formData.colorPreferences.join(', ') : formData.colorPreferences}</p>
            <p><strong>Style Preferences:</strong> ${Array.isArray(formData.stylePreferences) ? formData.stylePreferences.join(', ') : formData.stylePreferences}</p>
            ${formData.clientEmail ? `<p><strong>Client Email:</strong> ${formData.clientEmail}</p>` : ''}
          </div>
          
          ${formData.inspirationDescription ? `
          <div style="background: rgba(178, 102, 255, 0.1); padding: 20px; margin: 20px 0; border: 1px solid #b266ff; border-radius: 10px;">
            <h3 style="color: #b266ff; margin-top: 0;">INSPIRATION DETAILS:</h3>
            <p style="line-height: 1.6;">${formData.inspirationDescription}</p>
          </div>
          ` : ''}
          
          <div style="background: rgba(255, 20, 147, 0.1); padding: 15px; margin: 20px 0; border: 1px solid #ff1493; border-radius: 10px;">
            <h3 style="color: #ff1493; margin-top: 0;">NEXT ACTIONS:</h3>
            <ul style="margin: 10px 0;">
              <li>Review generated mood board in admin panel</li>
              <li>Contact client if email provided</li>
              <li>Use insights for project proposal</li>
              <li>Admin panel: <a href="${process.env.REPLIT_DOMAINS?.split(',')[0] || 'localhost:5000'}/admin" style="color: #00ffff;">View mood board</a></li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding: 20px; background: rgba(0, 255, 255, 0.05); border-radius: 10px;">
            <p style="color: #00ffff; font-size: 16px; margin: 0;">
              <strong>Mood Board ID:</strong> #${moodBoard.id}
            </p>
            <p style="color: #ffffff; font-size: 14px; margin: 10px 0 0 0;">
              Creative vision captured! 🎨
            </p>
          </div>
        </div>
      `;

      await sendEmailViaGmail({
        to: 'primorpho.solutions@gmail.com',
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