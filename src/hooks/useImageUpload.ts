import { useState } from 'react'
import { toast } from 'sonner'
import { uploadToCloudinary } from '@/lib/cloudinary'

export function useImageUpload() {
    const [isUploading, setIsUploading] = useState( false )

    const handleImageUpload = async (
        file: File,
        onSuccess: ( url: string ) => void
    ) => {
        if ( !file ) return

        setIsUploading( true )

        try {
            const imageUrl = await uploadToCloudinary( file )
            onSuccess( imageUrl )
            toast.success( 'Image uploaded successfully' )
        } catch ( error ) {
            console.error( 'Upload error:', error )
            toast.error( 'Failed to upload image' )
        } finally {
            setIsUploading( false )
        }
    }

    return {
        isUploading,
        handleImageUpload
    }
}
