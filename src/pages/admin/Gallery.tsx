import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { api } from "@/services/api";
import { GalleryCategory, GalleryItemResponseDto } from "@/types/dtos";
import { GalleryForm } from "@/components/admin/GalleryForm";
import { Skeleton } from "@/components/ui/skeleton";

export function Gallery() {
	const [search, setSearch] = useState("");
	const [category, setCategory] = useState<GalleryCategory>(GalleryCategory.Events);
	const [selectedItem, setSelectedItem] = useState<GalleryItemResponseDto | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const {
		data: items = [],
		refetch,
		isLoading,
	} = useQuery({
		queryKey: ["admin", "gallery"],
		queryFn: api.getGallery,
	});

	useEffect(() => {
		refetch();
	}, [refetch]);

	const filteredItems = items.filter((item) => {
		const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
		const matchesCategory = category === GalleryCategory.Events || item.category === category;
		return matchesSearch && matchesCategory;
	});

	const handleDelete = async (id: number) => {
		try {
			await api.deleteGalleryItem(id);
			toast.success("Gallery item deleted successfully");
			refetch();
		} catch {
			toast.error("Failed to delete gallery item");
		}
	};

	if (isLoading) {
		return (
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				<Skeleton className="h-10 w-full" />
				<Skeleton className="h-10 w-full" />
				<Skeleton className="h-10 w-full" />
				<Skeleton className="h-10 w-full" />
				<Skeleton className="h-10 w-full" />
				<Skeleton className="h-10 w-full" />
				<Skeleton className="h-10 w-full" />
				<Skeleton className="h-10 w-full" />
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<div className="relative w-[300px]">
						<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
						<Input
							placeholder="Search gallery..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="pl-9"
						/>
					</div>
					<div className="text-sm text-muted-foreground">Total Items: {items.length}</div>
					<Select
						value={category}
						onValueChange={(value) => setCategory(value as GalleryCategory)}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Category" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="events">Events</SelectItem>
							<SelectItem value="facilities">Facilities</SelectItem>
							<SelectItem value="training">Training</SelectItem>
							<SelectItem value="competitions">Competitions</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button onClick={() => setSelectedItem(null)}>
							<Plus className="mr-2 h-4 w-4" />
							Add Image
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-2xl">
						<DialogHeader>
							<DialogTitle>
								{selectedItem ? "Edit Gallery Item" : "Add Gallery Item"}
							</DialogTitle>
						</DialogHeader>
						<GalleryForm
							item={selectedItem}
							onSuccess={() => {
								setIsDialogOpen(false);
								refetch();
							}}
						/>
					</DialogContent>
				</Dialog>
			</div>

			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{filteredItems.map((item) => (
					<div
						key={item.id}
						className="group relative aspect-square overflow-hidden rounded-lg border bg-card"
					>
						<img
							src={item.imageUrl}
							alt={item.title}
							className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent p-4">
							<div className="flex h-full flex-col justify-between">
								<div className="self-end">
									<span className="rounded-full bg-primary/20 px-2 py-1 text-xs text-primary-foreground">
										{item.category}
									</span>
								</div>
								<div>
									<h3 className="font-semibold text-white">{item.title}</h3>
									<p className="text-sm text-white/80">{item.date}</p>
									<div className="mt-2 flex gap-2">
										<Button
											variant="secondary"
											size="icon"
											onClick={() => {
												setSelectedItem(item);
												setIsDialogOpen(true);
											}}
										>
											<Pencil className="h-4 w-4" />
										</Button>
										<Button
											variant="destructive"
											size="icon"
											onClick={() => handleDelete(item.id)}
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{filteredItems.length === 0 && (
				<p className="text-center text-muted-foreground">
					No gallery items found matching your criteria.
				</p>
			)}
		</div>
	);
}
