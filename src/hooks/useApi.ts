import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'
import { api } from '@/services/api'
import { ContactFormData, RegistrationFormData } from '@/types'
import { CoachResponseDto, ProgramResponseDto } from '@/types/dtos'

// Programs
export const usePrograms = ( options?: UseQueryOptions<ProgramResponseDto[]> ) => {
    return useQuery( {
        queryKey: ['programs'],
        queryFn: api.getPrograms,
        ...options,
    } )
}

export const useProgram = ( id: number, options?: UseQueryOptions<ProgramResponseDto> ) => {
    return useQuery( {
        queryKey: ['programs', id],
        queryFn: () => api.getProgram( id ),
        ...options,
    } )
}

// Coaches
export const useCoaches = ( options?: UseQueryOptions<CoachResponseDto[]> ) => {
    return useQuery( {
        queryKey: ['coaches'],
        queryFn: api.getCoaches,
        ...options,
    } )
}

// Contact Form
export const useContactForm = (
    options?: UseMutationOptions<unknown, Error, ContactFormData>
) => {
    return useMutation( {
        mutationFn: api.submitContactForm,
        ...options,
    } )
}

// Registration Form
export const useRegistration = (
    options?: UseMutationOptions<unknown, Error, RegistrationFormData>
) => {
    return useMutation( {
        mutationFn: api.submitRegistration,
        ...options,
    } )
}
