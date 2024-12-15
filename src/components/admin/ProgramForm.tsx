import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Program } from '@/types'
import { api } from '@/services/api'

interface ProgramFormProps {
    program?: Program | null
    onSuccess: () => void
}

export function ProgramForm({ program, onSuccess }: ProgramFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: program?.name || '',
        description: program?.description || '',
        duration: program?.duration || '',
        price: program?.price?.toString() || '',
        schedule: program?.schedule || '',
        category: program?.category || 'training',
        imageUrl: program?.imageUrl || '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const data = {
                ...formData,
                price: parseFloat(formData.price),
            }

            if (program) {
                await api.updateProgram(program.id, data)
                toast.success('Program updated successfully')
            } else {
                await api.createProgram(data)
                toast.success('Program created successfully')
            }
            onSuccess()
        } catch {
            toast.error('Failed to save program')
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
                <label className="text-sm font-medium">Description</label>
                <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    required
                    className="h-24"
                />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label className="text-sm font-medium">Category</label>
                    <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as Program['category'] }))}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="training">Training</SelectItem>
                            <SelectItem value="camp">Camp</SelectItem>
                            <SelectItem value="clinic">Clinic</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label className="text-sm font-medium">Duration</label>
                    <Input
                        value={formData.duration}
                        onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                        placeholder="e.g., 12 weeks"
                        required
                    />
                </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label className="text-sm font-medium">Price</label>
                    <Input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                        min="0"
                        step="0.01"
                        required
                    />
                </div>
                <div>
                    <label className="text-sm font-medium">Schedule</label>
                    <Input
                        value={formData.schedule}
                        onChange={(e) => setFormData(prev => ({ ...prev, schedule: e.target.value }))}
                        placeholder="e.g., Mon, Wed, Fri 6:00 AM - 8:00 AM"
                        required
                    />
                </div>
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
                            className="h-32 w-full rounded-lg object-cover"
                        />
                    </div>
                )}
            </div>
            <div className="flex justify-end gap-4">
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : program ? 'Update Program' : 'Create Program'}
                </Button>
            </div>
        </form>
    )
}
