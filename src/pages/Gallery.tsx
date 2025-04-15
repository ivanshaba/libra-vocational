import { useEffect, useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";
import { VideoPlayer } from "@/components/video-player";
import { GalleryItemResponseDto } from "@/types/dtos";

export function Gallery() {
	const [category, setCategory] = useState<string>("all");
	const [selectedImage, setSelectedImage] = useState<GalleryItemResponseDto | null>(null);

	const {
		data: items = [],
		refetch,
		isLoading,
	} = useQuery({
		queryKey: ["gallery"],
		queryFn: api.getGallery,
	});

	useEffect(() => {
		refetch();
	}, [refetch]);

	const filteredImages = items.filter((item) => {
		return category === "all" || item.category === category;
	});

	if (isLoading) {
		return (
			<div className="container py-12">
				<div className="space-y-8">
					<div className="h-10 w-[200px] bg-muted rounded" />
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
						{[...Array(8)].map((_, i) => (
							<Skeleton key={i} className="aspect-square w-full rounded-lg" />
						))}
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="container py-12">
			<div>
				<h1 className="text-4xl font-bold">Gallery</h1>
				<p className="mt-4 text-lg text-muted-foreground">
					Explore our collection of photos showcasing our facilities, events.
				</p>

				{/* Filter */}
				<div className="mt-8">
					<Select value={category} onValueChange={setCategory}>
						<SelectTrigger className="w-full sm:w-[200px]">
							<SelectValue placeholder="Category" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Categories</SelectItem>
							<SelectItem value="events">Events</SelectItem>
							<SelectItem value="facilities">Facilities</SelectItem>
							<SelectItem value="training">Training</SelectItem>
							<SelectItem value="competitions">Competitions</SelectItem>
						</SelectContent>
					</Select>
				</div>

				{/* Images Grid */}
				<div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
					{filteredImages
						.filter((i) => i.type === "image")
						.map((item) => (
							<div
								key={item.id}
								className="relative aspect-square cursor-pointer group"
								onClick={() => setSelectedImage(item)}
							>
								<div className="h-full w-full overflow-hidden rounded-lg">
									<img
										src={item.imageUrl}
										alt={item.title}
										className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
										loading="lazy"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
										<div className="absolute bottom-0 p-4">
											<span className="inline-block px-2 py-1 text-xs text-white bg-primary/80 rounded-full">
												{item.category}
											</span>
											<h3 className="mt-2 text-white font-semibold">
												{item.title}
											</h3>
										</div>
									</div>
								</div>
							</div>
						))}
				</div>

				{/* Videos Grid */}
				<div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
					{filteredImages
						.filter((i) => i.type === "video")
						.map((item) => (
							<div key={item.id}>
								<VideoPlayer
									videoUrl={item.videoUrl!}
									title={item.title}
									thumbnail={item.imageUrl}
								/>
							</div>
						))}
				</div>

				{/* Empty State */}
				{filteredImages.length === 0 && !isLoading && (
					<div className="mt-12 text-center text-muted-foreground">
						<p>No images found in this category.</p>
					</div>
				)}

				{/* Lightbox */}
				<Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
					<DialogContent className="max-w-4xl border-none bg-transparent p-0 shadow-none">
						<div className="relative">
							<Button
								variant="ghost"
								size="icon"
								className="absolute right-4 top-4 z-50 rounded-full bg-background/80 text-foreground hover:bg-background/90"
								onClick={() => setSelectedImage(null)}
							>
								<X className="h-4 w-4" />
							</Button>
							{selectedImage && (
								<img
									src={selectedImage.imageUrl}
									alt={selectedImage.title}
									className="h-auto w-full rounded-lg"
								/>
							)}
						</div>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}
