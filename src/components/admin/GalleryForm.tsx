import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { GalleryItem } from '@/types'
import { api } from '@/services/api'
import { useImageUpload } from '@/hooks/useImageUpload'
import { GalleryItemCreateDto } from '@/types/dtos'

interface GalleryFormProps {
    item?: GalleryItem | null
    onSuccess: () => void
}

export function GalleryForm({ item, onSuccess }: GalleryFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const { isUploading, handleImageUpload } = useImageUpload()
    const [formData, setFormData] = useState({
        title: item?.title || '',
        category: item?.category || 'events',
        date: item?.date || new Date().toISOString().split('T')[0],
        imageUrl: item?.imageUrl || '',
    })

    const onImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        await handleImageUpload(file, (url) => {
            setFormData(prev => ({ ...prev, imageUrl: url }))
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            if (item) {
                await api.updateGalleryItem(item.id, formData as GalleryItemCreateDto)
                toast.success('Gallery item updated successfully')
            } else {
                await api.createGalleryItem(formData as GalleryItemCreateDto)
                toast.success('Gallery item created successfully')
            }
            onSuccess()
        } catch (error) {
            console.error(error)
            toast.error('Failed to save gallery item')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                />
            </div>
            <div>
                <label className="text-sm font-medium">Category</label>
                <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as GalleryItem['category'] }))}
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="events">Events</SelectItem>
                        <SelectItem value="facilities">Facilities</SelectItem>
                        <SelectItem value="training">Training</SelectItem>
                        <SelectItem value="competitions">Competitions</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <label className="text-sm font-medium">Date</label>
                <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    required
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
                {formData.imageUrl && (
                    <div className="mt-2">
                        <img
                            src={formData.imageUrl}
                            alt="Preview"
                            className="h-48 w-full rounded-lg object-cover"
                        />
                    </div>
                )}
            </div>
            <div className="flex justify-end gap-4">
                <Button type="submit" disabled={isLoading || isUploading}>
                    {isLoading ? 'Saving...' : item ? 'Update Item' : 'Add Item'}
                </Button>
            </div>
        </form>
    )
}
