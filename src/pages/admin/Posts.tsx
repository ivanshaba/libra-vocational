import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image } from "@/components/ui/image";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Search, VideoIcon, ImageIcon } from "lucide-react";
import { api } from "@/services/api";
import { PostForm } from "@/components/admin/PostForm";
import { Skeleton } from "@/components/ui/skeleton";
import { PostResponseDto } from "@/types/dtos";

export function Posts() {
	const [search, setSearch] = useState("");
	const [selectedPost, setSelectedPost] = useState<PostResponseDto | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isImageModalOpen, setIsImageModalOpen] = useState(false);
	const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

	const {
		data: posts = [],
		refetch,
		isLoading,
	} = useQuery({
		queryKey: ["admin", "posts"],
		queryFn: api.getPosts,
	});

	useEffect(() => {
		refetch();
	}, [refetch]);

	const filteredPosts = posts.filter(
		(post) =>
			post.title.toLowerCase().includes(search.toLowerCase()) ||
			post.content.toLowerCase().includes(search.toLowerCase())
	);

	const handleDelete = async (id: number) => {
		try {
			await api.deletePost(id);
			toast.success("Post deleted successfully");
			refetch();
		} catch (_error) {
			console.error(_error);
			toast.error("Failed to delete post");
		}
	};

	if (isLoading) {
		return (
			<div className="space-y-6">
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
			<Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
				<DialogContent className="w-full">
					<DialogHeader>
						<DialogTitle>Image</DialogTitle>
					</DialogHeader>
					<Image
						src={selectedPost?.imageUrl}
						width={1000}
						height={1000}
						alt="Post Image"
						className="w-full h-full"
					/>
				</DialogContent>
			</Dialog>
			<Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Video</DialogTitle>
					</DialogHeader>
					<video src={selectedPost?.videoUrl} controls />
				</DialogContent>
			</Dialog>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<div className="relative w-[300px]">
						<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
						<Input
							placeholder="Search posts..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="pl-9"
						/>
					</div>
					<div className="text-sm text-muted-foreground">Total Posts: {posts.length}</div>
				</div>

				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button onClick={() => setSelectedPost(null)}>
							<Plus className="mr-2 h-4 w-4" />
							New Post
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-2xl">
						<DialogHeader>
							<DialogTitle>
								{selectedPost ? "Edit Post" : "Create New Post"}
							</DialogTitle>
						</DialogHeader>
						<PostForm
							post={selectedPost}
							onSuccess={() => {
								setIsDialogOpen(false);
								refetch();
							}}
						/>
					</DialogContent>
				</Dialog>
			</div>

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Title</TableHead>
							<TableHead>Category</TableHead>
							<TableHead>Content</TableHead>
							<TableHead>Image</TableHead>
							<TableHead>Video</TableHead>
							<TableHead>Created At</TableHead>
							<TableHead>Updated At</TableHead>
							<TableHead className="w-[100px]">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredPosts.map((post) => (
							<TableRow key={post.id}>
								<TableCell>{post.title}</TableCell>
								<TableCell>{post.category}</TableCell>
								<TableCell>{post.content}</TableCell>
								<TableCell>
									{/* launch a model to view the image inside a modal */}
									{post.imageUrl ? (
										<Button
											variant="outline"
											size="icon"
											// onClick={() => window.open(post.imageUrl, "_blank")}
											onClick={() => {
												setSelectedPost(post);
												setIsImageModalOpen(true);
											}}
										>
											<ImageIcon className="h-4 w-4" />
										</Button>
									) : (
										"No Image"
									)}
								</TableCell>
								<TableCell>
									{post.videoUrl ? (
										<Button
											variant="outline"
											size="icon"
											// onClick={() => window.open(post.videoUrl, "_blank")}
											onClick={() => {
												setSelectedPost(post);
												setIsVideoModalOpen(true);
											}}
										>
											<VideoIcon className="h-4 w-4" />
										</Button>
									) : (
										"No Video"
									)}
								</TableCell>
								<TableCell>
									{new Date(post.createdAt).toLocaleDateString()}
								</TableCell>
								<TableCell>
									{new Date(post.updatedAt).toLocaleDateString()}
								</TableCell>
								<TableCell>
									<div className="flex items-center gap-2">
										<Button
											variant="ghost"
											size="icon"
											onClick={() => {
												setSelectedPost(post);
												setIsDialogOpen(true);
											}}
										>
											<Pencil className="h-4 w-4" />
										</Button>
										<Button
											variant="ghost"
											size="icon"
											onClick={() => handleDelete(post.id)}
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
