import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Coach } from '@/types'
import { api } from '@/services/api'

interface CoachFormProps {
    coach?: Coach | null
    onSuccess: () => void
}

export function CoachForm({ coach, onSuccess }: CoachFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: coach?.name || '',
        role: coach?.role || '',
        bio: coach?.bio || '',
        specialties: coach?.specialties.join(', ') || '',
        imageUrl: coach?.imageUrl || '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const data = {
                ...formData,
                specialties: formData.specialties.split(',').map(s => s.trim()).filter(Boolean),
            }

            if (coach) {
                await api.updateCoach(coach.id, data)
                toast.success('Coach updated successfully')
            } else {
                await api.createCoach(data)
                toast.success('Coach created successfully')
            }
            onSuccess()
        } catch (_error) {
            console.error(_error)
            toast.error('Failed to save coach')
        } finally {
            setIsLoading(false)
        }
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
                <label className="text-sm font-medium">Role</label>
                <Input
                    value={formData.role}
                    onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                    required
                />
            </div>
            <div>
                <label className="text-sm font-medium">Bio</label>
                <Textarea
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    required
                    className="h-32"
                />
            </div>
            <div>
                <label className="text-sm font-medium">Specialties (comma-separated)</label>
                <Input
                    value={formData.specialties}
                    onChange={(e) => setFormData(prev => ({ ...prev, specialties: e.target.value }))}
                    placeholder="e.g., Strength Training, Youth Development, Performance Analysis"
                    required
                />
            </div>
            <div>
                <label className="text-sm font-medium">Image URL</label>
                <Input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                    required
                />
                {formData.imageUrl && (
                    <div className="mt-2">
                        <img
                            src={formData.imageUrl}
                            alt="Preview"
                            className="h-32 w-32 rounded-lg object-cover"
                        />
                    </div>
                )}
            </div>
            <div className="flex justify-end gap-4">
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : coach ? 'Update Coach' : 'Create Coach'}
                </Button>
            </div>
        </form>
    )
}
