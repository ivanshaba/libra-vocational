import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Calendar, ArrowRight } from "lucide-react";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export function News() {
	const [category, setCategory] = useState<string>("all");
	const [search, setSearch] = useState("");
	const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

	const {
		data: newsArticles = [],
		refetch,
		isLoading,
	} = useQuery({
		queryKey: ["admin", "news"],
		queryFn: api.getPosts,
	});

	useEffect(() => {
		refetch();
	}, [refetch]);

	if (isLoading) return <div>Loading...</div>;

	const filteredArticles = newsArticles.filter((article) => {
		const matchesCategory = category === "all" || article.category === category;
		const matchesSearch =
			article.title.toLowerCase().includes(search.toLowerCase()) ||
			article.content.toLowerCase().includes(search.toLowerCase());
		return matchesCategory && matchesSearch;
	});

	return (
		<div className="container py-12">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				{/* Featured Article */}
				<Link to={`/news/${newsArticles[0].id}`}>
					<div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg">
						<img
							src={newsArticles[0].imageUrl}
							alt={newsArticles[0].title}
							className="h-full w-full object-cover"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
							<div className="absolute bottom-0 p-8">
								<div className="flex items-center gap-4">
									<span className="rounded-full bg-primary/20 px-3 py-1 text-sm text-primary-foreground">
										{newsArticles[0].category}
									</span>
									<span className="text-sm text-white/80">
										{newsArticles[0].createdAt}
									</span>
								</div>
								<h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
									{newsArticles[0].title}
								</h1>
								<p className="mt-2 max-w-2xl text-lg text-white/90">
									{newsArticles[0].content}
								</p>
								<Button className="mt-6" variant="secondary">
									Read More
									<ArrowRight className="ml-2 h-4 w-4" />
								</Button>
							</div>
						</div>
					</div>
				</Link>

				{/* Filters */}
				<div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
					<Select value={category} onValueChange={setCategory}>
						<SelectTrigger className="w-full sm:w-[200px]">
							<SelectValue placeholder="Category" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Categories</SelectItem>
							<SelectItem value="events">Events</SelectItem>
							<SelectItem value="achievements">Achievements</SelectItem>
							<SelectItem value="announcements">Announcements</SelectItem>
							<SelectItem value="community">Community</SelectItem>
						</SelectContent>
					</Select>
					<Input
						placeholder="Search news..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="w-full sm:w-[300px]"
					/>
				</div>

				{/* News Grid */}
				<div ref={ref} className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{filteredArticles.slice(0).map((article, index) => (
						<Link to={`/news/${article.id}`} key={article.id}>
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={inView ? { opacity: 1, y: 0 } : {}}
								transition={{ duration: 0.8, delay: index * 0.1 }}
							>
								<Card className="h-full overflow-hidden hover:shadow-lg transition-all">
									<div className="aspect-video w-full overflow-hidden">
										<img
											src={article.imageUrl}
											alt={article.title}
											className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
										/>
									</div>
									<CardHeader>
										<div className="flex items-center justify-between">
											<span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
												{article.category}
											</span>
											<div className="flex items-center text-sm text-muted-foreground">
												<Calendar className="mr-1 h-4 w-4" />
												{article.createdAt}
											</div>
										</div>
										<CardTitle className="line-clamp-2 hover:text-primary">
											{article.title}
										</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="line-clamp-3 text-sm text-muted-foreground">
											{article.content}
										</p>
									</CardContent>
								</Card>
							</motion.div>
						</Link>
					))}
				</div>

				{filteredArticles.length === 0 && (
					<p className="mt-12 text-center text-muted-foreground">
						No news articles found matching your criteria.
					</p>
				)}
			</motion.div>
		</div>
	);
}
