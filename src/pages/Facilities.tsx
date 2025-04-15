import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Facilities() {
	const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

	const { data: facilities = [] } = useQuery({
		queryKey: ["facilities"],
		queryFn: () => api.getFacilities(),
	});

	return (
		<div className="container py-12">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<h1 className="text-4xl font-bold">Our Facilities</h1>
				<p className="mt-4 text-lg text-muted-foreground">
					Explore our world-class training facilities designed for optimal performance and
					development.
				</p>

				{/* Overview Section */}
				{facilities.length > 0 && (
					<div className="mt-12">
						<div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg">
							<img
								src={facilities[0].imageUrl}
								alt="Facilities Overview"
								className="h-full w-full object-cover"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
								<div className="absolute bottom-0 p-8">
									<h2 className="text-3xl font-bold text-white">
										{facilities[0].name}
									</h2>
									<p className="mt-2 max-w-2xl text-white/90">
										{facilities[0].description}
									</p>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Facilities Grid */}
				<div ref={ref} className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{facilities.slice(1).map((facility, index) => (
						<motion.div
							key={facility.id}
							initial={{ opacity: 0, y: 20 }}
							animate={inView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.8, delay: index * 0.1 }}
						>
							<Card className="h-full">
								<div className="aspect-video w-full overflow-hidden">
									<img
										src={facility.imageUrl}
										alt={facility.name}
										className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
									/>
								</div>
								<CardHeader>
									<CardTitle>{facility.name}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">
										{`${facility.description.slice(0, 100)} ${
											facility.description.length > 100 ? "..." : ""
										}`}
									</p>
									<div className="mt-4 space-y-2">
										<h4 className="font-semibold">Key Features:</h4>
										<ul className="space-y-2">
											{facility.features
												.slice(0, 3)
												.map((feature: string) => (
													<li
														key={feature}
														className="flex items-center gap-2"
													>
														<CheckCircle2 className="h-4 w-4 text-primary" />
														<span className="text-sm">{feature}</span>
													</li>
												))}
										</ul>
										{facility.features.length > 3 && (
											<p className="text-sm text-muted-foreground">
												+{facility.features.length - 3} more features
											</p>
										)}
									</div>
									<div className="mt-6">
										<Link to={`/facilities/${facility.id}`}>
											<Button className="w-full">Read More</Button>
										</Link>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>

				{/* Equipment Section */}
				<div className="mt-24">
					<h2 className="text-3xl font-bold">Equipment & Technology</h2>
					<p className="mt-4 text-lg text-muted-foreground">
						We invest in the latest equipment and technology to provide our students with the
						best training experience.
					</p>
					<div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
						{equipmentCategories.map((category, index) => (
							<motion.div
								key={category.name}
								initial={{ opacity: 0, y: 20 }}
								animate={inView ? { opacity: 1, y: 0 } : {}}
								transition={{ duration: 0.8, delay: index * 0.1 }}
							>
								<Card>
									<CardContent className="pt-6">
										<h3 className="text-xl font-semibold">{category.name}</h3>
										<ul className="mt-4 space-y-2">
											{category.items.map((item) => (
												<li key={item} className="flex items-center gap-2">
													<CheckCircle2 className="h-4 w-4 text-primary" />
													<span className="text-sm text-muted-foreground">
														{item}
													</span>
												</li>
											))}
										</ul>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>
				</div>
			</motion.div>
		</div>
	);
}

const equipmentCategories = [
	{
		name: "Certification from DIT & UBTEB",
		items: ["Information Technology", "Cosmetology & Beauty Therapy", "Fashion & Garment Design"],
	},
	{
		name: "Modern learning facilities",
		items: ["lecture rooms", "game grounds", "modern computers"],
	},
	{
		name: "Interactive Handas-on Training",
		items: ["ICT", "Tailoring", "Garment Design"],
	},
	{
		name: "Technology",
		items: [
			"computer programming",
			"Web Design",
			"Graphics Design",
			"Mobile app integration",
		],
	},
];
