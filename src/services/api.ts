import { axiosInstance } from '@/lib/axios'
import { RegistrationFormData } from '@/types'
import { Stats } from '@/types/admin'
import { LoginCredentials, AuthResponse, SignupCredentials } from '@/types/auth'
import { CoachResponseDto, CoachCreateDto, PostResponseDto, RegistrationResponseDto, FacilityResponseDto, FacilityCreateDto, GalleryItemResponseDto, GalleryItemCreateDto, PostCreateDto, ProgramCreateDto, ProgramResponseDto, AlumniResponseDto, AlumniCreateDto } from '@/types/dtos'
import { ContactFormData } from "@/types"

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
    submitContactForm: ( data: ContactFormData ) =>
        axiosInstance.post<{ data: ContactFormData }>( '/contact', data ).then( res => res.data.data ),

    subscribeToNewsletter: ( data: { email: string } ) =>
        axiosInstance.post<{ data: { email: string } }>( '/newsletter/subscribe', data ).then( res => res.data.data ),
    unsubscribeFromNewsletter: ( data: { email: string } ) =>
        axiosInstance.post<{ data: { email: string } }>( '/newsletter/unsubscribe', data ).then( res => res.data.data ),

    // Auth
    login: ( credentials: LoginCredentials ) =>
        axiosInstance.post<AuthResponse>( '/admin/login', credentials ).then( res => res.data.data ),
    signup: ( credentials: SignupCredentials ) =>
        axiosInstance.post<AuthResponse>( '/admin/signup', credentials ).then( res => res.data.data ),

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
    getFacility: ( id: number ) =>
        axiosInstance.get( `/facilities/${id}` ).then( res => res.data.data ),

    // Alumni
    getAlumni: () =>
        axiosInstance.get<{ data: AlumniResponseDto[] }>( '/alumni' ).then( res => res.data.data ),
    createAlumni: ( data: Partial<AlumniCreateDto> ) =>
        axiosInstance.post<{ data: AlumniResponseDto }>( '/alumni', data ).then( res => res.data.data ),
    updateAlumni: ( id: number, data: Partial<AlumniCreateDto> ) =>
        axiosInstance.put<{ data: AlumniResponseDto }>( `/alumni/${id}`, data ).then( res => res.data.data ),
    deleteAlumni: ( id: number ) =>
        axiosInstance.delete( `/alumni/${id}` ).then( res => res.data.data ),

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
