import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { GalleryCategory, GalleryItemResponseDto } from "@/types/dtos";
import { api } from "@/services/api";
import { useImageUpload } from "@/hooks/useImageUpload";
import { GalleryItemCreateDto } from "@/types/dtos";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GalleryFormProps {
	item?: GalleryItemResponseDto | null;
	onSuccess: () => void;
}

export function GalleryForm({ item, onSuccess }: GalleryFormProps) {
	const [isLoading, setIsLoading] = useState(false);
	const { isUploading, handleImageUpload } = useImageUpload();
	const [formData, setFormData] = useState({
		title: item?.title || "",
		category: item?.category || "events",
		date: item?.date || new Date().toISOString().split("T")[0],
		imageUrl: item?.imageUrl || "",
		videoUrl: item?.videoUrl || "",
		type: item?.type || "image",
	});

	const onImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		await handleImageUpload(file, (url) => {
			setFormData((prev) => ({ ...prev, imageUrl: url }));
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const submitData = {
				...formData,
				// For video type, imageUrl will be the thumbnail
				imageUrl:
					formData.imageUrl ||
					(formData.type === "video"
						? `https://img.youtube.com/vi/${getYouTubeId(
								formData.videoUrl
						  )}/maxresdefault.jpg`
						: ""),
			};

			if (item) {
				await api.updateGalleryItem(item.id, submitData as GalleryItemCreateDto);
				toast.success("Gallery item updated successfully");
			} else {
				await api.createGalleryItem(submitData as GalleryItemCreateDto);
				toast.success("Gallery item created successfully");
			}
			onSuccess();
		} catch (error) {
			console.error(error);
			toast.error("Failed to save gallery item");
		} finally {
			setIsLoading(false);
		}
	};

	function getYouTubeId(url: string) {
		const match = url.match(
			/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^/&]{10,12})/
		);
		return match?.[1] || "";
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<Label>Title</Label>
				<Input
					value={formData.title}
					onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
					required
				/>
			</div>

			<div>
				<Label>Category</Label>
				<Select
					value={formData.category}
					onValueChange={(value) =>
						setFormData((prev) => ({ ...prev, category: value as GalleryCategory }))
					}
				>
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="events">Events</SelectItem>
						<SelectItem value="facilities">Facilities</SelectItem>
						<SelectItem value="training">Training</SelectItem>
						<SelectItem value="competitions">Competitions</SelectItem>
						<SelectItem value="videos">Videos</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div>
				<Label>Date</Label>
				<Input
					type="date"
					value={formData.date}
					onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
					required
				/>
			</div>

			<Tabs
				defaultValue={formData.type}
				onValueChange={(value) =>
					setFormData((prev) => ({ ...prev, type: value as "image" | "video" }))
				}
			>
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="image">Image</TabsTrigger>
					<TabsTrigger value="video">Video</TabsTrigger>
				</TabsList>

				<TabsContent value="image" className="space-y-4">
					<div>
						<Label>Image</Label>
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
				</TabsContent>

				<TabsContent value="video" className="space-y-4">
					<div>
						<Label>YouTube Video URL</Label>
						<Input
							type="url"
							placeholder="https://youtube.com/watch?v=..."
							value={formData.videoUrl}
							onChange={(e) =>
								setFormData((prev) => ({ ...prev, videoUrl: e.target.value }))
							}
						/>
						{formData.videoUrl && (
							<div className="mt-2">
								<img
									src={`https://img.youtube.com/vi/${getYouTubeId(
										formData.videoUrl
									)}/maxresdefault.jpg`}
									alt="Video thumbnail"
									className="h-48 w-full rounded-lg object-cover"
								/>
							</div>
						)}
					</div>
				</TabsContent>
			</Tabs>

			<div className="flex justify-end gap-4">
				<Button type="submit" disabled={isLoading || isUploading}>
					{isLoading ? "Saving..." : item ? "Update Item" : "Add Item"}
				</Button>
			</div>
		</form>
	);
}
