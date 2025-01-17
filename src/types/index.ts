import { ProgramCategory } from '@/types/dtos';

export interface Post {
    id: number;
    title: string;
    content: string;
    imageUrl: string;
    videoUrl?: string;
    category: 'news' | 'events' | 'updates';
    createdAt: Date;
    status: 'draft' | 'published';
    publishedAt?: string;
    updatedAt: string;
}

export interface Coach {
    id: number;
    name: string;
    role: string;
    bio: string;
    imageUrl: string;
    specialties: string[];
}
export interface GalleryItem {
    id: string
    title: string
    category: "events" | "facilities" | "training" | "competitions" | "all"
    imageUrl: string
    date: string
}

export interface Facility {
    id: number
    name: string
    description: string
    features: string[]
    imageUrl: string
    equipment: string[]
}

export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export interface Program {
    createdAt: string;
    updatedAt: string;
    id: string;
    name: string;
    description: string;
    duration: string;
    price: number;
    schedule: string;
    category: ProgramCategory;
    imageUrl: string;
    isActive: boolean;
    maxParticipants: number;
}

export interface RegistrationFormData {
    // Personal Information
    firstName: string
    lastName: string
    email: string
    phone: string
    dateOfBirth: string
    // Program Selection
    programId: number
    startDate: string
    // Emergency Contact
    emergencyName: string
    emergencyPhone: string
    emergencyRelation: string
    // Medical Information
    medicalConditions: string
    allergies: string
    medications: string
    // Status
    status?: 'pending' | 'approved' | 'rejected'
}
