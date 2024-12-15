import { Post } from '@/types'

import { ContactFormData } from '@/types'

export interface AdminStats {
    success: boolean,
    data: {
        counts: {
            coaches: number,
            facilities: number,
            programs: number,
            posts: number,
            registrations: number,
            galleryItems: number,
            activePrograms: number
        },
        recentActivities: {
            id: string,
            type: string,
            description: string,
            date: string
        }[]
    }
}

export interface AdminPost extends Post {
    status: 'draft' | 'published'
    publishedAt?: string
    updatedAt: string
}

export interface ContactSubmission extends ContactFormData {
    id: string
    createdAt: string
    status: 'new' | 'read' | 'archived'
}
