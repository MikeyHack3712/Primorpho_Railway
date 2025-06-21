import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  boolean,
  integer,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table (mandatory for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table (mandatory for Replit Auth)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Contact submissions table
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  business: text("business"),
  phone: text("phone"),
  package: text("package"),
  details: text("details"),
  isAuditRequest: boolean("is_audit_request").default(false),
  websiteUrl: text("website_url"),
  priority: text("priority").default("normal"),
  status: text("status").default("new"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Slot reservations table
export const slotReservations = pgTable("slot_reservations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  business: text("business"),
  phone: text("phone"),
  package: text("package").notNull(),
  preferredSlot: text("preferred_slot").notNull(),
  projectDetails: text("project_details"),
  budget: text("budget"),
  timeline: text("timeline"),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Website audit results table
export const auditResults = pgTable("audit_results", {
  id: serial("id").primaryKey(),
  websiteUrl: text("website_url").notNull(),
  loadTime: integer("load_time"),
  overallScore: integer("overall_score"),
  performanceScore: integer("performance_score"),
  seoScore: integer("seo_score"),
  securityScore: integer("security_score"),
  mobileScore: integer("mobile_score"),
  accessibilityScore: integer("accessibility_score"),
  technicalScore: integer("technical_score"),
  contentScore: integer("content_score"),
  recommendations: jsonb("recommendations"),
  metrics: jsonb("metrics"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Mood boards table
export const moodBoards = pgTable("mood_boards", {
  id: serial("id").primaryKey(),
  projectName: text("project_name").notNull(),
  projectType: text("project_type").notNull(),
  targetAudience: text("target_audience").notNull(),
  businessGoals: text("business_goals").notNull(),
  brandPersonality: text("brand_personality").array().notNull(),
  colorPreferences: text("color_preferences").array().notNull(),
  stylePreferences: text("style_preferences").array().notNull(),
  inspirationDescription: text("inspiration_description"),
  generatedBoard: jsonb("generated_board"),
  clientEmail: text("client_email"),
  status: text("status").default("draft"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Schema types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

export type InsertSlotReservation = typeof slotReservations.$inferInsert;
export type SlotReservation = typeof slotReservations.$inferSelect;

export type InsertAuditResult = typeof auditResults.$inferInsert;
export type AuditResult = typeof auditResults.$inferSelect;

export type InsertMoodBoard = typeof moodBoards.$inferInsert;
export type MoodBoard = typeof moodBoards.$inferSelect;

// Validation schemas
export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions);
export const insertSlotReservationSchema = createInsertSchema(slotReservations);
export const insertAuditResultSchema = createInsertSchema(auditResults);
export const insertMoodBoardSchema = createInsertSchema(moodBoards);

// Form schemas with validation
export const contactFormSchema = insertContactSubmissionSchema.pick({
  name: true,
  email: true,
  business: true,
  phone: true,
  package: true,
  details: true,
  websiteUrl: true,
});

export const slotReservationFormSchema = insertSlotReservationSchema.pick({
  name: true,
  email: true,
  business: true,
  phone: true,
  package: true,
  preferredSlot: true,
  projectDetails: true,
  budget: true,
  timeline: true,
});

export const auditFormSchema = z.object({
  websiteUrl: z.string().min(1, "Please enter a website URL").trim(),
});
