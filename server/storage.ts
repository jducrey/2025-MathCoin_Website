import { users, contactRequests, type User, type InsertUser, type ContactRequest, type InsertContactRequest } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactRequest(request: InsertContactRequest): Promise<ContactRequest>;
  getContactRequests(): Promise<ContactRequest[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactRequests: Map<number, ContactRequest>;
  private currentUserId: number;
  private currentContactId: number;

  constructor() {
    this.users = new Map();
    this.contactRequests = new Map();
    this.currentUserId = 1;
    this.currentContactId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactRequest(insertRequest: InsertContactRequest): Promise<ContactRequest> {
    const id = this.currentContactId++;
    const request: ContactRequest = {
      id,
      demandeur: insertRequest.demandeur,
      niveau: insertRequest.niveau,
      besoin: insertRequest.besoin,
      modalite: insertRequest.modalite,
      volume: insertRequest.volume,
      objectif: insertRequest.objectif,
      disponibilites: insertRequest.disponibilites,
      message: insertRequest.message || null,
      createdAt: new Date(),
    };
    this.contactRequests.set(id, request);
    return request;
  }

  async getContactRequests(): Promise<ContactRequest[]> {
    return Array.from(this.contactRequests.values());
  }
}

export const storage = new MemStorage();
