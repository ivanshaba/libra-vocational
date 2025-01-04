import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

export function AlumniNetwork() {
	const [category, setCategory] = useState<string>("all");
	const [search, setSearch] = useState("");
	const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

	const { data: alumni = [], refetch } = useQuery({
		queryKey: ["alumni"],
		queryFn: () => api.getAlumni(),
	});

	useEffect(() => {
		refetch();
	}, [refetch]);

	const filteredAlumni = alumni.filter((alum) => {
		const matchesCategory = category === "all" || alum.category === category;
		const matchesSearch =
			alum.name.toLowerCase().includes(search.toLowerCase()) ||
			alum.currentTeam?.toLowerCase().includes(search.toLowerCase());
		return matchesCategory && matchesSearch;
	});

	return (
		<div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
			{/* Hero Section */}
			<section className="relative py-20 bg-primary-600">
				<div className="absolute inset-0 bg-primary-900/20" />
				<div className="container relative z-10">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="max-w-3xl mx-auto text-center text-white"
					>
						<h1 className="text-5xl font-bold mb-6">Alumni Network</h1>
						<p className="text-xl text-white/90">
							Celebrating the success stories of our academy graduates
						</p>
					</motion.div>
				</div>
			</section>

			{/* Featured Alumni */}
			<section className="py-16">
				<div className="container">
					<h2 className="text-3xl font-bold mb-8 text-center">Alumni Directory</h2>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="text-center mb-12"
					>
						<h2 className="text-3xl font-bold">Featured Alumni</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Meet some of our most accomplished graduates
						</p>
					</motion.div>

					<div className="grid gap-8 md:grid-cols-3">
						{alumni.slice(0, 3).map((alum, index) => (
							<motion.div
								key={alum.id}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
							>
								<Card className="overflow-hidden hover:shadow-lg transition-all">
									<div className="aspect-[4/5] relative overflow-hidden">
										<img
											src={alum.image}
											alt={alum.name}
											className="object-cover w-full h-full transition-transform hover:scale-105"
										/>
										{alum.currentTeam && (
											<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
												<p className="text-white text-sm">
													{alum.currentTeam}
												</p>
											</div>
										)}
									</div>
									<CardContent className="p-6">
										<h3 className="text-xl font-bold mb-2">{alum.name}</h3>
										<p className="text-primary-600 mb-4">{alum.position}</p>
										<div className="flex flex-wrap gap-2">
											{alum.achievements.map((achievement, i) => (
												<span
													key={i}
													className="inline-flex items-center gap-1 text-xs bg-primary-50 text-primary-600 px-2 py-1 rounded-full"
												>
													<Star className="h-3 w-3" />
													{achievement}
												</span>
											))}
										</div>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Alumni Directory */}
			<section className="py-16 bg-gray-50">
				<div className="container">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="mb-12"
					>
						<div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
							<Select value={category} onValueChange={setCategory}>
								<SelectTrigger className="w-full sm:w-[200px]">
									<SelectValue placeholder="Category" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Categories</SelectItem>
									<SelectItem value="professional">Professional</SelectItem>
									<SelectItem value="college">College</SelectItem>
									<SelectItem value="youth">Youth Teams</SelectItem>
								</SelectContent>
							</Select>
							<Input
								placeholder="Search alumni..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="w-full sm:w-[300px]"
							/>
						</div>
					</motion.div>

					<div
						ref={ref}
						className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
					>
						{filteredAlumni.map((alum, index) => (
							<motion.div
								key={alum.id}
								initial={{ opacity: 0, y: 20 }}
								animate={inView ? { opacity: 1, y: 0 } : {}}
								transition={{ duration: 0.5, delay: index * 0.1 }}
							>
								<Card className="overflow-hidden hover:shadow-lg transition-all">
									<div className="aspect-square relative overflow-hidden">
										<img
											src={alum.image}
											alt={alum.name}
											className="object-cover w-full h-full transition-transform hover:scale-105"
										/>
									</div>
									<CardContent className="p-4">
										<h3 className="font-semibold">{alum.name}</h3>
										<p className="text-sm text-muted-foreground mb-2">
											Class of {alum.graduationYear}
										</p>
										{alum.currentTeam && (
											<p className="text-sm text-primary-600">
												{alum.currentTeam}
											</p>
										)}
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>

					{filteredAlumni.length === 0 && (
						<p className="text-center text-muted-foreground mt-8">
							No alumni found matching your criteria.
						</p>
					)}
				</div>
			</section>
		</div>
	);
}
