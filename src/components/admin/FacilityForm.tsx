import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/services/api'
import { useImageUpload } from '@/hooks/useImageUpload'
import { FacilityResponseDto } from '@/types/dtos'

interface FacilityFormProps {
    facility?: FacilityResponseDto | null
    onSuccess: () => void
}

export function FacilityForm({ facility, onSuccess }: FacilityFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const { isUploading, handleImageUpload } = useImageUpload()
    const [formData, setFormData] = useState({
        name: facility?.name || '',
        description: facility?.description || '',
        features: facility?.features.join('\n') || '',
        equipment: facility?.equipment.join('\n') || '',
        imageUrl: facility?.imageUrl || '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const data = {
                ...formData,
                features: formData.features.split('\n').map(s => s.trim()).filter(Boolean),
                equipment: formData.equipment.split('\n').map(s => s.trim()).filter(Boolean),
            }

            if (facility) {
                await api.updateFacility(facility.id, data)
                toast.success('Facility updated successfully')
            } else {
                await api.createFacility(data)
                toast.success('Facility created successfully')
            }
            onSuccess()
        } catch {
            toast.error('Failed to save facility')
        } finally {
            setIsLoading(false)
        }
    }

    const onImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        await handleImageUpload(file, (url) => {
            setFormData(prev => ({ ...prev, imageUrl: url }))
        })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="text-sm font-medium">Name</label>
                <Input
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                />
            </div>
            <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    required
                    className="h-24"
                />
            </div>
            <div>
                <label className="text-sm font-medium">Features (one per line)</label>
                <Textarea
                    value={formData.features}
                    onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
                    placeholder="e.g., 40,000 sq ft of training space&#10;Professional-grade flooring&#10;High-ceiling design"
                    required
                    className="h-24 font-mono text-sm"
                />
            </div>
            <div>
                <label className="text-sm font-medium">Equipment (one per line)</label>
                <Textarea
                    value={formData.equipment}
                    onChange={(e) => setFormData(prev => ({ ...prev, equipment: e.target.value }))}
                    placeholder="e.g., Training machines&#10;Free weights&#10;Cardio equipment"
                    required
                    className="h-24 font-mono text-sm"
                />
            </div>
            <div>
                <label className="text-sm font-medium">Image</label>
                <Input
                    type="file"
                    accept="image/*"
                    onChange={onImageUpload}
                    disabled={isUploading}
                    className="mb-2"
                />
                <Input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                    placeholder="Or enter image URL directly"
                    required
                />
                {formData.imageUrl && (
                    <div className="mt-2">
                        <img
                            src={formData.imageUrl}
                            alt="Preview"
                            className="h-32 w-full rounded-lg object-cover"
                        />
                    </div>
                )}
            </div>
            <div className="flex justify-end gap-4">
                <Button type="submit" disabled={isLoading || isUploading}>
                    {isLoading ? 'Saving...' : facility ? 'Update Facility' : 'Create Facility'}
                </Button>
            </div>
        </form>
    )
}
