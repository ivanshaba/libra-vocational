import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export function Coaches() {
	const [ref, inView] = useInView({ triggerOnce: true });

	const { data: coaches, isLoading } = useQuery({
		queryKey: ["coaches"],
		queryFn: () => api.getCoaches(),
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="container py-12">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<h1 className="text-4xl font-bold">Our Training Staff</h1>
				<p className="mt-4 text-lg text-muted-foreground">
					Meet our team of experienced Trainers dedicated to developing the next generation
					of skilled talents.
				</p>

				{/* Board of Management */}
				<div className="mt-16">
					<h2 className="text-3xl font-bold mb-8">Board of Management</h2>
					<div ref={ref} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{coaches
							?.filter((coach) => !coach.role.toLowerCase().includes("staff"))
							.map((coach) => (
								<motion.div
									key={coach.id}
									initial={{ opacity: 0, y: 20 }}
									animate={inView ? { opacity: 1, y: 0 } : {}}
									transition={{ duration: 0.8 }}
								>
									<Card className="overflow-hidden">
										<div className="relative w-full pt-[125%]">
											<img
												src={coach.imageUrl}
												alt={coach.name}
												className="absolute inset-0 h-full w-full object-contain bg-gray-50"
											/>
										</div>
										<CardHeader>
											<CardTitle>{coach.name}</CardTitle>
											<CardDescription>{coach.role}</CardDescription>
										</CardHeader>
										<CardContent>
											<p className="text-sm text-muted-foreground">
												{coach.bio}
											</p>
											<div className="mt-4">
												<h4 className="text-sm font-semibold">
													Specialties:
												</h4>
												<div className="mt-2 flex flex-wrap gap-2">
													{coach.specialties.map((specialty) => (
														<span
															key={specialty}
															className="rounded-full bg-secondary px-3 py-1 text-xs font-medium"
														>
															{specialty}
														</span>
													))}
												</div>
											</div>
										</CardContent>
									</Card>
								</motion.div>
							))}
					</div>
				</div>

				{/* Support Staff */}
				<div className="mt-16">
					<h2 className="text-3xl font-bold mb-8">Support Staff</h2>
					<div className="grid gap-6 sm:grid-cols-2">
						{coaches
							?.filter((coach) => coach.role.toLowerCase().includes("staff"))
							.map((coach) => (
								<motion.div
									key={coach.id}
									initial={{ opacity: 0, y: 20 }}
									animate={inView ? { opacity: 1, y: 0 } : {}}
									transition={{ duration: 0.8, delay: 0.3 }}
								>
									<Card className="overflow-hidden">
										<div className="aspect-[4/3] w-full overflow-hidden">
											<img
												src={coach.imageUrl}
												alt={coach.name}
												className="h-full w-full object-contain bg-gray-50"
											/>
										</div>
										<CardHeader>
											<CardTitle>{coach.name}</CardTitle>
											<CardDescription>{coach.role}</CardDescription>
										</CardHeader>
										<CardContent>
											<p className="text-sm text-muted-foreground">
												{coach.bio}
											</p>
											<div className="mt-4">
												<h4 className="text-sm font-semibold">
													Specialties:
												</h4>
												<div className="mt-2 flex flex-wrap gap-2">
													{coach.specialties.map((specialty) => (
														<span
															key={specialty}
															className="rounded-full bg-secondary px-3 py-1 text-xs font-medium"
														>
															{specialty}
														</span>
													))}
												</div>
											</div>
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
