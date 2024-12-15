import { useState, useEffect } from 'react'
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
import { AdminPost } from '@/types/admin'
import { api } from '@/services/api'

interface PostFormProps {
    post?: AdminPost | null
    onSuccess: () => void
}

export function PostForm({ post, onSuccess }: PostFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string>('')
    const [formData, setFormData] = useState({
        title: post?.title || '',
        content: post?.content || '',
        videoUrl: post?.videoUrl || '',
        imageUrl: post?.imageUrl || '',
        category: post?.category || 'news',
    })

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImageFile(file)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    useEffect(() => {
        return () => {
            if (imagePreview && imagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(imagePreview)
            }
        }
    }, [imagePreview])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const formDataToSend = new FormData()
            formDataToSend.append('title', formData.title)
            formDataToSend.append('content', formData.content)
            formDataToSend.append('category', formData.category)
            formDataToSend.append('imageUrl', formData.imageUrl)
            if (formData.videoUrl) {
                formDataToSend.append('videoUrl', formData.videoUrl)
            }
            if (imageFile) {
                formDataToSend.append('image', imageFile)
            }

            if (post) {
                await api.updatePost(post.id, formDataToSend)
                toast.success('Post updated successfully')
            } else {
                await api.createPost(formDataToSend)
                toast.success('Post created successfully')
            }
            onSuccess()
        } catch (error) {
            console.error(error)
            toast.error('Failed to save post')
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
                <label className="text-sm font-medium">Content</label>
                <Textarea
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    required
                    className="min-h-[200px]"
                />
            </div>
            <div>
                <label className="text-sm font-medium">Category</label>
                <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as "news" | "events" | "updates" }))}
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="news">News</SelectItem>
                        <SelectItem value="events">Events</SelectItem>
                        <SelectItem value="announcements">Announcements</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <label className="text-sm font-medium">Video URL (Optional)</label>
                <Input
                    type="url"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
                />
            </div>
            <div>
                <label className="text-sm font-medium">Image</label>
                <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mb-2"
                />
                {(imagePreview || post?.imageUrl) && (
                    <div className="mt-2">
                        <img
                            src={imagePreview.startsWith('blob:')
                                ? imagePreview
                                : `${import.meta.env.VITE_API_URI}/uploads${post?.imageUrl}`
                            }
                            alt="Preview"
                            className="h-48 w-full rounded-lg object-cover"
                        />
                    </div>
                )}
            </div>
            <div className="flex justify-end gap-4">
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
                </Button>
            </div>
        </form>
    )
}
