import { axiosInstance } from '@/lib/axios'
import { Program, Coach, Post, ContactFormData, RegistrationFormData, Facility, GalleryItem } from '@/types'
import { AdminPost, AdminStats, ContactSubmission } from '@/types/admin'
import { LoginCredentials, AuthResponse } from '@/types/auth'

export const api = {
    // Programs
    getPrograms: () =>
        axiosInstance.get<{ data: Program[] }>( '/programs' ).then( res => res.data.data ),
    getProgram: ( id: string ) =>
        axiosInstance.get<{ data: Program }>( `/programs/${id}` ).then( res => res.data.data ),

    // Coaches
    getCoaches: () =>
        axiosInstance.get<{ data: Coach[] }>( '/coaches' ).then( res => res.data.data ),
    getCoach: ( id: string ) =>
        axiosInstance.get<{ data: Coach }>( `/coaches/${id}` ).then( res => res.data.data ),

    // News/Posts
    getPosts: () =>
        axiosInstance.get<{ data: Post[] }>( '/posts' ).then( res => res.data.data ),
    getPost: ( id: string ) =>
        axiosInstance.get<{ data: Post }>( `/posts/${id}` ).then( res => res.data.data ),

    // Forms
    submitContactForm: ( data: ContactFormData ) =>
        axiosInstance.post( '/contact', data ).then( res => res.data.data ),
    submitRegistration: ( data: RegistrationFormData ) =>
        axiosInstance.post( '/registration', data ).then( res => res.data.data ),

    // Auth
    login: ( credentials: LoginCredentials ) =>
        axiosInstance.post<AuthResponse>( '/admin/login', credentials ).then( res => res.data.data ),

    // Protected endpoints
    getRegistrations: () =>
        axiosInstance.get( '/registrations' ).then( res => res.data.data ),
    getContactSubmissions: () =>
        axiosInstance.get( '/contact-submissions' ).then( res => res.data.data ),

    // Add to existing api object
    getAdminStats: () =>
        axiosInstance.get<AdminStats>( '/stats' ).then( res => res.data.data ),

    // Add these to the existing api object
    getAdminPosts: () =>
        axiosInstance.get<{ data: AdminPost[] }>( '/posts' ).then( res => res.data.data ),
    createPost: ( formData: FormData ) =>
        axiosInstance.post<{ data: AdminPost }>( '/posts', formData ).then( res => res.data.data ),
    updatePost: ( id: string, formData: FormData ) =>
        axiosInstance.put<{ data: AdminPost }>( `/posts/${id}`, formData ).then( res => res.data.data ),
    deletePost: ( id: string ) =>
        axiosInstance.delete( `/posts/${id}` ),

    // Add to the existing api object
    getAdminCoaches: () =>
        axiosInstance.get<{ data: Coach[] }>( '/coaches' ).then( res => res.data.data ),
    createCoach: ( data: Partial<Coach> ) =>
        axiosInstance.post<{ data: Coach }>( '/coaches', data ).then( res => res.data.data ),
    updateCoach: ( id: string, data: Partial<Coach> ) =>
        axiosInstance.put<{ data: Coach }>( `/coaches/${id}`, data ).then( res => res.data.data ),
    deleteCoach: ( id: string ) =>
        axiosInstance.delete( `/coaches/${id}` ).then( res => res.data.data ),

    // Add to the existing api object
    getAdminFacilities: () =>
        axiosInstance.get<{ data: Facility[] }>( '/facilities' ).then( res => res.data.data ),
    createFacility: ( data: Partial<Facility> ) =>
        axiosInstance.post<{ data: Facility }>( '/facilities', data ).then( res => res.data.data ),
    updateFacility: ( id: string, data: Partial<Facility> ) =>
        axiosInstance.put<{ data: Facility }>( `/facilities/${id}`, data ).then( res => res.data.data ),
    deleteFacility: ( id: string ) =>
        axiosInstance.delete( `/facilities/${id}` ).then( res => res.data.data ),

    // Add to the existing api object
    getAdminPrograms: () =>
        axiosInstance.get<{ data: Program[] }>( '/programs' ).then( res => res.data.data ),
    createProgram: ( data: Partial<Program> ) =>
        axiosInstance.post<{ data: Program }>( '/programs', data ).then( res => res.data.data ),
    updateProgram: ( id: string, data: Partial<Program> ) =>
        axiosInstance.put<{ data: Program }>( `/programs/${id}`, data ).then( res => res.data.data ),
    deleteProgram: ( id: string ) =>
        axiosInstance.delete( `/programs/${id}` ).then( res => res.data.data ),

    // Add to the existing api object
    getAdminGallery: () =>
        axiosInstance.get<{ data: GalleryItem[] }>( '/gallery' ).then( res => res.data.data ),
    createGalleryItem: ( data: Partial<GalleryItem> ) =>
        axiosInstance.post<{ data: GalleryItem }>( '/gallery', data ).then( res => res.data.data ),
    updateGalleryItem: ( id: string, data: Partial<GalleryItem> ) =>
        axiosInstance.put<{ data: GalleryItem }>( `/gallery/${id}`, data ).then( res => res.data.data ),
    deleteGalleryItem: ( id: string ) =>
        axiosInstance.delete( `/gallery/${id}` ).then( res => res.data.data ),

    // Add to the existing api object
    getAdminRegistrations: () =>
        axiosInstance.get<{ data: RegistrationFormData[] }>( '/registrations' ).then( res => res.data.data ),
    updateRegistrationStatus: ( id: string, status: 'pending' | 'approved' | 'rejected' ) =>
        axiosInstance.put( `/registrations/${id}/status`, { status } ).then( res => res.data.data ),
    deleteRegistration: ( id: string ) =>
        axiosInstance.delete( `/registrations/${id}` ).then( res => res.data.data ),

    // Add to the existing api object
    getAdminContactSubmissions: () =>
        axiosInstance.get<{ data: ContactSubmission[] }>( '/contact-submissions' ).then( res => res.data.data ),
    updateContactStatus: ( id: string, status: ContactSubmission['status'] ) =>
        axiosInstance.put( `/contact-submissions/${id}/status`, { status } ).then( res => res.data.data ),
    deleteContactSubmission: ( id: string ) =>
        axiosInstance.delete( `/contact-submissions/${id}` ).then( res => res.data.data ),
}
