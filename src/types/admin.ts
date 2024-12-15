import { Post } from '@/types'

import { ContactFormData } from '@/types'

export interface AdminStats {
    posts: number
    coaches: number
    galleryItems: number
    facilities: number
    programs: number
    registrations: number
    recentActivity: {
        id: string
        type: string
        description: string
        date: string
    }[]
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
