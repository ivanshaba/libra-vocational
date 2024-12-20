/* eslint-disable @typescript-eslint/no-explicit-any */

import { AuthUser } from '@/types/auth'

export interface Stats {
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
            createdAt: string,
            updatedAt: string,
            deletedAt: string | null,
            createdBy: string | null,
            updatedBy: string | null,
            deletedBy: string | null,
            version: number,
            isDeleted: boolean,
            type: string,
            description: string,
            entityType: string,
            entityId: string | null,
            oldValues: Record<string, any> | null,
            newValues: Record<string, any> | null,
            metadata: Record<string, any> | null,
            ipAddress: string,
            userAgent: string,
            user: AuthUser | null
        }[]
    }
}
