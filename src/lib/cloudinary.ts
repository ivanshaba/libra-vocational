interface CloudinaryUploadResponse {
    secure_url: string
    public_id: string
    // Add other Cloudinary response fields if needed
}

interface CloudinaryConfig {
    cloudName: string
    uploadPreset: string
}

const config: CloudinaryConfig = {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '',
    uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '',
}

export async function uploadToCloudinary(
    file: File,
): Promise<string> {
    const formData = new FormData()
    formData.append( 'file', file )
    formData.append( 'upload_preset', config.uploadPreset )

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`,
            {
                method: 'POST',
                body: formData
            }
        )

        if ( !response.ok ) {
            throw new Error( 'Upload failed' )
        }

        const data: CloudinaryUploadResponse = await response.json()
        return data.secure_url
    } catch ( error ) {
        console.error( 'Cloudinary upload error:', error )
        throw new Error( 'Failed to upload image' )
    }
}
