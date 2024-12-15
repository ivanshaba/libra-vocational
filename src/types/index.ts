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
