import { axiosInstance } from '@/lib/axios'
import { RegistrationFormData } from '@/types'
import { Stats } from '@/types/admin'
import { LoginCredentials, AuthResponse } from '@/types/auth'
import { CoachResponseDto, CoachCreateDto, PostResponseDto, RegistrationResponseDto, FacilityResponseDto, FacilityCreateDto, GalleryItemResponseDto, GalleryItemCreateDto, PostCreateDto, ProgramCreateDto, ProgramResponseDto } from '@/types/dtos'

export const api = {
    // Programs
    getPrograms: () =>
        axiosInstance.get<{ data: ProgramResponseDto[] }>( '/programs' ).then( res => res.data.data ),
    getProgram: ( id: number ) =>
        axiosInstance.get<{ data: ProgramResponseDto }>( `/programs/${id}` ).then( res => res.data.data ),
    createProgram: ( data: Partial<ProgramCreateDto> ) =>
        axiosInstance.post<{ data: ProgramResponseDto }>( '/programs', data ).then( res => res.data.data ),
    updateProgram: ( id: number, data: Partial<ProgramCreateDto> ) =>
        axiosInstance.put<{ data: ProgramResponseDto }>( `/programs/${id}`, data ).then( res => res.data.data ),
    deleteProgram: ( id: number ) =>
        axiosInstance.delete( `/programs/${id}` ).then( res => res.data.data ),

    // Coaches
    getCoaches: () =>
        axiosInstance.get<{ data: CoachResponseDto[] }>( '/coaches' ).then( res => res.data.data ),
    getCoach: ( id: number ) =>
        axiosInstance.get<{ data: CoachResponseDto }>( `/coaches/${id}` ).then( res => res.data.data ),
    createCoach: ( data: Partial<CoachCreateDto> ) =>
        axiosInstance.post<{ data: CoachResponseDto }>( '/coaches', data ).then( res => res.data.data ),
    updateCoach: ( id: number, data: Partial<CoachCreateDto> ) =>
        axiosInstance.put<{ data: CoachResponseDto }>( `/coaches/${id}`, data ).then( res => res.data.data ),
    deleteCoach: ( id: number ) =>
        axiosInstance.delete( `/coaches/${id}` ).then( res => res.data.data ),

    // News/Posts
    getPosts: () =>
        axiosInstance.get<{ data: PostResponseDto[] }>( '/posts' ).then( res => res.data.data ),
    getPost: ( id: number ) =>
        axiosInstance.get<{ data: PostResponseDto }>( `/posts/${id}` ).then( res => res.data.data ),
    createPost: ( data: PostCreateDto ) =>
        axiosInstance.post<{ data: PostResponseDto }>( '/posts', data ).then( res => res.data.data ),
    updatePost: ( id: number, data: Partial<PostCreateDto> ) =>
        axiosInstance.put<{ data: PostResponseDto }>( `/posts/${id}`, data ).then( res => res.data.data ),
    deletePost: ( id: number ) =>
        axiosInstance.delete( `/posts/${id}` ).then( res => res.data.data ),

    // Contact
    submitContactForm: ( data: unknown ) =>
        axiosInstance.post( '/contact', data ).then( res => res.data.data ),

    // Auth
    login: ( credentials: LoginCredentials ) =>
        axiosInstance.post<AuthResponse>( '/admin/login', credentials ).then( res => res.data.data ),

    // Registrations
    submitRegistration: ( data: RegistrationFormData ) =>
        axiosInstance.post<{ data: RegistrationResponseDto }>( '/registrations', data ).then( res => res.data.data ),
    getRegistrations: () =>
        axiosInstance.get<{ data: RegistrationResponseDto[] }>( '/registrations' ).then( res => res.data.data ),
    updateRegistration: ( id: number, data: Partial<RegistrationFormData> ) =>
        axiosInstance.put<{ data: RegistrationResponseDto }>( `/registrations/${id}`, data ).then( res => res.data.data ),
    deleteRegistration: ( id: number ) =>
        axiosInstance.delete( `/registrations/${id}` ).then( res => res.data.data ),
    getContactSubmissions: () =>
        axiosInstance.get( '/contact-submissions' ).then( res => res.data.data ),

    getStats: () =>
        axiosInstance.get<Stats>( '/stats' ).then( res => res.data.data ),

    // Facilities
    getFacilities: () =>
        axiosInstance.get<{ data: FacilityResponseDto[] }>( '/facilities' ).then( res => res.data.data ),
    createFacility: ( data: Partial<FacilityCreateDto> ) =>
        axiosInstance.post<{ data: FacilityResponseDto }>( '/facilities', data ).then( res => res.data.data ),
    updateFacility: ( id: number, data: Partial<FacilityCreateDto> ) =>
        axiosInstance.put<{ data: FacilityResponseDto }>( `/facilities/${id}`, data ).then( res => res.data.data ),
    deleteFacility: ( id: number ) =>
        axiosInstance.delete( `/facilities/${id}` ).then( res => res.data.data ),

    // Gallery
    getGallery: () =>
        axiosInstance.get<{ data: GalleryItemResponseDto[] }>( '/gallery' ).then( res => res.data.data ),
    createGalleryItem: ( data: Partial<GalleryItemCreateDto> ) =>
        axiosInstance.post<{ data: GalleryItemResponseDto }>( '/gallery', data ).then( res => res.data.data ),
    updateGalleryItem: ( id: number, data: Partial<GalleryItemCreateDto> ) =>
        axiosInstance.put<{ data: GalleryItemResponseDto }>( `/gallery/${id}`, data ).then( res => res.data.data ),
    deleteGalleryItem: ( id: number ) =>
        axiosInstance.delete( `/gallery/${id}` ).then( res => res.data.data ),
}
