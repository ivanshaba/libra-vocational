export enum GalleryCategory {
    Events = 'events',
    Facilities = 'facilities',
    Training = 'training',
    Competitions = 'competitions',
    Videos = 'videos'
}

export enum PostCategory {
    News = 'news'
}

export interface FacilityResponseDto {
    id: number;
    name: string;
    description: string;
    features: string[];
    imageUrl: string;
    equipment: string[];
    createdAt: string;
    updatedAt: string;
}

export interface FacilityCreateDto {
    name: string;
    description: string;
    features?: string[];
    imageUrl?: string;
    equipment?: string[];
}

export interface FacilityUpdateDto {
    name?: string;
    description?: string;
    features?: string[];
    equipment?: string[];
    imageUrl: string
}

export interface GalleryItemResponseDto {
    id: number;
    title: string;
    category: GalleryCategory;
    imageUrl: string;
    videoUrl?: string;
    date: string;
    type: 'image' | 'video';
}

export interface GalleryItemCreateDto {
    title: string;
    category: GalleryCategory;
    imageUrl: string;
    videoUrl?: string;
    date: string;
    type: 'image' | 'video';
}

export interface GalleryItemUpdateDto {
    title?: string;
    category?: GalleryCategory;
    date?: string;
    imageUrl: string
}

export interface PostResponseDto {
    id: number;
    title: string;
    content: string;
    imageUrl?: string;
    videoUrl?: string;
    category: PostCategory;
    createdAt: string;
    updatedAt: string;
}

export interface PostCreateDto {
    title: string;
    content: string;
    imageUrl?: string;
    videoUrl?: string;
    category: PostCategory;
}

export interface PostUpdateDto {
    title?: string;
    content?: string;
    excerpt?: string;
    isPublished?: boolean;
    imageUrl?: string;
    videoUrl?: string;
    category?: PostCategory;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    errors?: Array<{
        field: string;
        message: string;
    }>;
}

export enum ProgramCategory {
    Training = 'training',
    Camp = 'camp',
    Clinic = 'clinic',
}

export interface ProgramResponseDto {
    id: number;
    name: string;
    description: string;
    duration: string;
    price: number;
    schedule: string;
    category: ProgramCategory;
    imageUrl: string;
    isActive: boolean;
    maxParticipants: number;
    createdAt: string;
    updatedAt: string;
}

export interface ProgramCreateDto {
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

export interface ProgramUpdateDto {
    name?: string;
    description?: string;
    duration?: string;
    price?: number;
    schedule?: string;
    category?: ProgramCategory;
    imageUrl: string;
    isActive?: boolean;
    maxParticipants?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface RegistrationResponseDto {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    createdBy: string | null;
    updatedBy: string | null;
    deletedBy: string | null;
    version: number;
    isDeleted: boolean;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    startDate: string;
    emergencyName: string;
    emergencyPhone: string;
    emergencyRelation: string;
    medicalConditions: string;
    allergies: string;
    medications: string;
    program: ProgramResponseDto | null;
}

export interface RegistrationCreateDto {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    programId: number;
    startDate: string;
    emergencyName: string;
    emergencyPhone: string;
    emergencyRelation: string;
    medicalConditions?: string;
    allergies?: string;
    medications?: string;
}

export interface CoachResponseDto {
    createdAt: string;
    updatedAt: string;
    id: number;
    name: string;
    role: string;
    bio: string;
    imageUrl: string;
    specialties: string[];
    userId: string;
}

export interface CoachCreateDto {
    name: string;
    role: string;
    bio: string;
    imageUrl?: string;
    specialties?: string[];
}

export interface CoachUpdateDto {
    name?: string;
    role?: string;
    bio?: string;
    specialties?: string[];
    image?: File; // For multipart/form-data upload
}

export interface AlumniResponseDto {
    id: number;
    name: string;
    graduationYear: number;
    currentTeam?: string;
    achievements: string[];
    image: string;
    position: string;
    category: "professional" | "college" | "youth";
    createdAt: string;
    updatedAt: string;
}

export interface AlumniCreateDto {
    name: string;
    graduationYear: number;
    currentTeam?: string;
    achievements: string[];
    image: string;
    position: string;
    category: "professional" | "college" | "youth";
}
