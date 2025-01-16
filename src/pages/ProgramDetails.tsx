import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, Clock, Users, DollarSign, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function ProgramDetails() {
	const { id } = useParams();

	const { data: program, isLoading } = useQuery({
		queryKey: ["programs", id],
		queryFn: () => api.getProgram(Number(id)),
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

	if (!program) {
		return (
			<div className="container py-12">
				<h1>Program not found</h1>
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
					<Link to="/programs">
						<Button variant="ghost" className="mb-6">
							<ArrowLeft className="mr-2 h-4 w-4" />
							Back to Programs
						</Button>
					</Link>

					{/* Program Header */}
					<div className="mb-8">
						<div className="flex items-center gap-4 text-sm text-muted-foreground">
							<span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
								{program.category}
							</span>
						</div>
						<h1 className="mt-4 text-4xl font-bold">{program.name}</h1>
					</div>

					{/* Featured Image */}
					<div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg mb-8">
						<img
							src={program.imageUrl}
							alt={program.name}
							className="h-full w-full object-cover"
						/>
					</div>

					{/* Program Details Card */}
					<div className="grid gap-8 md:grid-cols-3 mb-8">
						<div className="md:col-span-2">
							<Card>
								<CardContent className="p-6">
									<h2 className="text-2xl font-bold mb-4">Program Description</h2>
									<p className="text-muted-foreground whitespace-pre-wrap">
										{program.description}
									</p>
								</CardContent>
							</Card>
						</div>

						<div>
							<Card>
								<CardContent className="p-6 space-y-4">
									<h2 className="text-xl font-bold mb-4">Program Information</h2>
									<div className="space-y-4">
										<div className="flex items-center gap-3">
											<Clock className="h-5 w-5 text-primary" />
											<div>
												<p className="font-medium">Duration</p>
												<p className="text-sm text-muted-foreground">
													{program.duration}
												</p>
											</div>
										</div>
										<div className="flex items-center gap-3">
											<Calendar className="h-5 w-5 text-primary" />
											<div>
												<p className="font-medium">Schedule</p>
												<p className="text-sm text-muted-foreground">
													{program.schedule}
												</p>
											</div>
										</div>
										<div className="flex items-center gap-3">
											<DollarSign className="h-5 w-5 text-primary" />
											<div>
												<p className="font-medium">Price</p>
												<p className="text-sm text-muted-foreground">
													{program.price > 1
														? `${program.price}`
														: "Free"}
												</p>
											</div>
										</div>
										<div className="flex items-center gap-3">
											<Users className="h-5 w-5 text-primary" />
											<div>
												<p className="font-medium">Max Participants</p>
												<p className="text-sm text-muted-foreground">
													{program.maxParticipants} students
												</p>
											</div>
										</div>
										<div className="flex items-center gap-3">
											<Tag className="h-5 w-5 text-primary" />
											<div>
												<p className="font-medium">Category</p>
												<p className="text-sm text-muted-foreground capitalize">
													{program.category}
												</p>
											</div>
										</div>
									</div>

									<Button className="w-full mt-6" asChild>
										<Link to={`/registration?program=${program.id}`}>
											Register Now
										</Link>
									</Button>
								</CardContent>
							</Card>
						</div>
					</div>

					{/* Related Programs */}
					<div className="mt-16">
						<h2 className="text-2xl font-bold mb-6">Similar Programs</h2>
						<div className="grid gap-8 md:grid-cols-3">
							{/* Add related programs here */}
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
