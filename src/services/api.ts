import { axiosInstance } from '@/lib/axios'
import { Program, Coach, Post, ContactFormData, RegistrationFormData, Facility, GalleryItem } from '@/types'
import { AdminPost, ContactSubmission } from '@/types/admin'
import { LoginCredentials, AuthResponse } from '@/types/auth'

export const api = {
    // Programs
    getPrograms: () =>
        axiosInstance.get<Program[]>( '/programs' ).then( res => res.data ),
    getProgram: ( id: string ) =>
        axiosInstance.get<Program>( `/programs/${id}` ).then( res => res.data ),

    // Coaches
    getCoaches: () =>
        axiosInstance.get<Coach[]>( '/coaches' ).then( res => res.data ),
    getCoach: ( id: string ) =>
        axiosInstance.get<Coach>( `/coaches/${id}` ).then( res => res.data ),

    // News/Posts
    getPosts: () =>
        axiosInstance.get<Post[]>( '/posts' ).then( res => res.data ),
    getPost: ( id: string ) =>
        axiosInstance.get<Post>( `/posts/${id}` ).then( res => res.data ),

    // Forms
    submitContactForm: ( data: ContactFormData ) =>
        axiosInstance.post( '/contact', data ).then( res => res.data ),
    submitRegistration: ( data: RegistrationFormData ) =>
        axiosInstance.post( '/registration', data ).then( res => res.data ),

    // Auth
    login: ( credentials: LoginCredentials ) =>
        axiosInstance.post<AuthResponse>( '/auth/login', credentials ).then( res => res.data ),

    // Protected endpoints
    getRegistrations: () =>
        axiosInstance.get( '/admin/registrations' ).then( res => res.data ),
    getContactSubmissions: () =>
        axiosInstance.get( '/admin/contact-submissions' ).then( res => res.data ),

    // Add to existing api object
    getAdminStats: () =>
        axiosInstance.get( '/admin/stats' ).then( res => res.data ),

    // Add these to the existing api object
    getAdminPosts: () =>
        axiosInstance.get<AdminPost[]>( '/admin/posts' ).then( res => res.data ),
    createPost: ( data: Partial<AdminPost> ) =>
        axiosInstance.post<AdminPost>( '/admin/posts', data ).then( res => res.data ),
    updatePost: ( id: string, data: Partial<AdminPost> ) =>
        axiosInstance.put<AdminPost>( `/admin/posts/${id}`, data ).then( res => res.data ),
    deletePost: ( id: string ) =>
        axiosInstance.delete( `/admin/posts/${id}` ).then( res => res.data ),

    // Add to the existing api object
    getAdminCoaches: () =>
        axiosInstance.get<Coach[]>( '/admin/coaches' ).then( res => res.data ),
    createCoach: ( data: Partial<Coach> ) =>
        axiosInstance.post<Coach>( '/admin/coaches', data ).then( res => res.data ),
    updateCoach: ( id: string, data: Partial<Coach> ) =>
        axiosInstance.put<Coach>( `/admin/coaches/${id}`, data ).then( res => res.data ),
    deleteCoach: ( id: string ) =>
        axiosInstance.delete( `/admin/coaches/${id}` ).then( res => res.data ),

    // Add to the existing api object
    getAdminFacilities: () =>
        axiosInstance.get<Facility[]>( '/admin/facilities' ).then( res => res.data ),
    createFacility: ( data: Partial<Facility> ) =>
        axiosInstance.post<Facility>( '/admin/facilities', data ).then( res => res.data ),
    updateFacility: ( id: string, data: Partial<Facility> ) =>
        axiosInstance.put<Facility>( `/admin/facilities/${id}`, data ).then( res => res.data ),
    deleteFacility: ( id: string ) =>
        axiosInstance.delete( `/admin/facilities/${id}` ).then( res => res.data ),

    // Add to the existing api object
    getAdminPrograms: () =>
        axiosInstance.get<Program[]>( '/admin/programs' ).then( res => res.data ),
    createProgram: ( data: Partial<Program> ) =>
        axiosInstance.post<Program>( '/admin/programs', data ).then( res => res.data ),
    updateProgram: ( id: string, data: Partial<Program> ) =>
        axiosInstance.put<Program>( `/admin/programs/${id}`, data ).then( res => res.data ),
    deleteProgram: ( id: string ) =>
        axiosInstance.delete( `/admin/programs/${id}` ).then( res => res.data ),

    // Add to the existing api object
    getAdminGallery: () =>
        axiosInstance.get<GalleryItem[]>( '/admin/gallery' ).then( res => res.data ),
    createGalleryItem: ( data: Partial<GalleryItem> ) =>
        axiosInstance.post<GalleryItem>( '/admin/gallery', data ).then( res => res.data ),
    updateGalleryItem: ( id: string, data: Partial<GalleryItem> ) =>
        axiosInstance.put<GalleryItem>( `/admin/gallery/${id}`, data ).then( res => res.data ),
    deleteGalleryItem: ( id: string ) =>
        axiosInstance.delete( `/admin/gallery/${id}` ).then( res => res.data ),

    // Add to the existing api object
    getAdminRegistrations: () =>
        axiosInstance.get<RegistrationFormData[]>( '/admin/registrations' ).then( res => res.data ),
    updateRegistrationStatus: ( id: string, status: 'pending' | 'approved' | 'rejected' ) =>
        axiosInstance.put( `/admin/registrations/${id}/status`, { status } ).then( res => res.data ),
    deleteRegistration: ( id: string ) =>
        axiosInstance.delete( `/admin/registrations/${id}` ).then( res => res.data ),

    // Add to the existing api object
    getAdminContactSubmissions: () =>
        axiosInstance.get<ContactSubmission[]>( '/admin/contact-submissions' ).then( res => res.data ),
    updateContactStatus: ( id: string, status: ContactSubmission['status'] ) =>
        axiosInstance.put( `/admin/contact-submissions/${id}/status`, { status } ).then( res => res.data ),
    deleteContactSubmission: ( id: string ) =>
        axiosInstance.delete( `/admin/contact-submissions/${id}` ).then( res => res.data ),
}
