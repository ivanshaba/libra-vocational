export interface Post {
    id: string;
    title: string;
    content: string;
    imageUrl?: string;
    videoUrl?: string;
    category: 'news' | 'events' | 'updates';
    createdAt: Date;
}

export interface Coach {
    id: string;
    name: string;
    role: string;
    bio: string;
    imageUrl: string;
    specialties: string[];
}
export interface GalleryItem {
    id: string
    title: string
    category: "events" | "facilities" | "training" | "competitions"
    imageUrl: string
    date: string
}

export interface Facility {
    id: string
    name: string
    description: string
    features: string[]
    imageUrl: string
    equipment: string[]
}

export interface ContactFormData {
    name: string
    email: string
    subject: string
    message: string
}

export interface Program {
    id: string;
    name: string;
    description: string;
    duration: string;
    price: number;
    schedule: string;
    category: 'training' | 'camp' | 'clinic';
    imageUrl: string;
}

export interface RegistrationFormData {
    // Personal Information
    firstName: string
    lastName: string
    email: string
    phone: string
    dateOfBirth: string
    // Program Selection
    programId: string
    startDate: string
    // Emergency Contact
    emergencyName: string
    emergencyPhone: string
    emergencyRelation: string
    // Medical Information
    medicalConditions: string
    allergies: string
    medications: string
}
