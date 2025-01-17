import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { VideoPlayer } from "@/components/video-player";

export function NewsDetails() {
	const { id } = useParams();

	const { data: article, isLoading } = useQuery({
		queryKey: ["posts", id],
		queryFn: () => api.getPost(Number(id)),
	});

	if (isLoading) {
		return (
			<div className="container py-12">
				<div className="animate-pulse">
					<div className="h-8 w-2/3 bg-gray-200 rounded"></div>
					<div className="mt-4 h-4 bg-gray-200 rounded"></div>
					<div className="mt-2 h-4 bg-gray-200 rounded"></div>
					<div className="mt-8 aspect-[21/9] w-full bg-gray-200 rounded"></div>
				</div>
			</div>
		);
	}

	if (!article) {
		return (
			<div className="container py-12">
				<h1>Article not found</h1>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
			<div className="container py-12">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					{/* Back Button */}
					<Link to="/news">
						<Button variant="ghost" className="mb-6">
							<ArrowLeft className="mr-2 h-4 w-4" />
							Back to News
						</Button>
					</Link>

					{/* Article Header */}
					<div className="mb-8">
						<div className="flex items-center gap-4 text-sm text-muted-foreground">
							<span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
								{article.category}
							</span>
							<div className="flex items-center">
								<Calendar className="mr-1 h-4 w-4" />
								{new Date(article.createdAt).toLocaleDateString()}
							</div>
						</div>
						<h1 className="mt-4 text-4xl font-bold">{article.title}</h1>
					</div>

					{/* Featured Media */}
					<div className="relative w-full mb-8">
						{article.videoUrl ? (
							<VideoPlayer
								videoUrl={article.videoUrl}
								thumbnail={article.imageUrl}
								title={article.title}
							/>
						) : (
							<img
								src={article.imageUrl}
								alt={article.title}
								className="w-full h-auto object-contain rounded-lg"
								style={{ maxHeight: "800px" }}
							/>
						)}
					</div>

					{/* Article Content */}
					<div className="prose prose-lg max-w-none">
						<div
							dangerouslySetInnerHTML={{
								__html: article.content,
							}}
						/>
					</div>

					{/* Related Articles */}
					<div className="mt-16">
						<h2 className="text-2xl font-bold mb-6">Related Articles</h2>
						<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
							{/* Add related articles here */}
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
