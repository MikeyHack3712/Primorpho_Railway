import {
  users,
  contactSubmissions,
  slotReservations,
  auditResults,
  type User,
  type UpsertUser,
  type ContactSubmission,
  type InsertContactSubmission,
  type SlotReservation,
  type InsertSlotReservation,
  type AuditResult,
  type InsertAuditResult,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Contact submissions
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  updateContactSubmissionStatus(id: number, status: string): Promise<void>;
  
  // Slot reservations
  createSlotReservation(reservation: InsertSlotReservation): Promise<SlotReservation>;
  getSlotReservations(): Promise<SlotReservation[]>;
  updateSlotReservationStatus(id: number, status: string): Promise<void>;
  
  // Audit results
  createAuditResult(audit: InsertAuditResult): Promise<AuditResult>;
  getAuditResults(): Promise<AuditResult[]>;
  getAuditResultByUrl(url: string): Promise<AuditResult | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User operations (mandatory for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Contact submissions
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [result] = await db
      .insert(contactSubmissions)
      .values(submission)
      .returning();
    return result;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return await db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt));
  }

  async updateContactSubmissionStatus(id: number, status: string): Promise<void> {
    await db
      .update(contactSubmissions)
      .set({ status })
      .where(eq(contactSubmissions.id, id));
  }

  // Slot reservations
  async createSlotReservation(reservation: InsertSlotReservation): Promise<SlotReservation> {
    const [result] = await db
      .insert(slotReservations)
      .values(reservation)
      .returning();
    return result;
  }

  async getSlotReservations(): Promise<SlotReservation[]> {
    return await db
      .select()
      .from(slotReservations)
      .orderBy(desc(slotReservations.createdAt));
  }

  async updateSlotReservationStatus(id: number, status: string): Promise<void> {
    await db
      .update(slotReservations)
      .set({ status })
      .where(eq(slotReservations.id, id));
  }

  // Audit results
  async createAuditResult(audit: InsertAuditResult): Promise<AuditResult> {
    const [result] = await db
      .insert(auditResults)
      .values(audit)
      .returning();
    return result;
  }

  async getAuditResults(): Promise<AuditResult[]> {
    return await db
      .select()
      .from(auditResults)
      .orderBy(desc(auditResults.createdAt));
  }

  async getAuditResultByUrl(url: string): Promise<AuditResult | undefined> {
    const [result] = await db
      .select()
      .from(auditResults)
      .where(eq(auditResults.websiteUrl, url))
      .orderBy(desc(auditResults.createdAt))
      .limit(1);
    return result;
  }
}

export const storage = new DatabaseStorage();
