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
import { api } from '@/services/api'
import { PostCreateDto, PostResponseDto, PostCategory } from '@/types/dtos'
import { useImageUpload } from '@/hooks/useImageUpload'

interface PostFormProps {
    post?: PostResponseDto | null
    onSuccess: () => void
}

export function PostForm({ post, onSuccess }: PostFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const { isUploading, handleImageUpload } = useImageUpload()
    const [formData, setFormData] = useState<Partial<PostCreateDto>>({
        title: post?.title || '',
        content: post?.content || '',
        videoUrl: post?.videoUrl || '',
        imageUrl: post?.imageUrl || '',
            category: post?.category as PostCategory || 'news'
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
            if (post) {
                await api.updatePost(post.id, formData)
                toast.success('Post updated successfully')
            } else {
                await api.createPost(formData as PostCreateDto)
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
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as PostCategory }))}
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
                    {isLoading ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
                </Button>
            </div>
        </form>
    )
}
