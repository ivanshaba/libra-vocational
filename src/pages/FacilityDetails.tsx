import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function FacilityDetails() {
	const { id } = useParams();

	const { data: facility, isLoading } = useQuery({
		queryKey: ["facilities", id],
		queryFn: () => api.getFacility(Number(id)),
	});

	if (isLoading) {
		return (
			<div className="container py-12">
				<div className="animate-pulse space-y-4">
					<div className="h-8 w-1/3 bg-muted rounded"></div>
					<div className="aspect-[21/9] w-full bg-muted rounded"></div>
					<div className="h-4 w-full bg-muted rounded"></div>
					<div className="h-4 w-2/3 bg-muted rounded"></div>
				</div>
			</div>
		);
	}

	if (!facility) {
		return (
			<div className="container py-12">
				<h1 className="text-2xl font-bold">Facility not found</h1>
			</div>
		);
	}

	return (
		<div className="container py-12">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				className="space-y-8"
			>
				{/* Back Button */}
				<Link to="/facilities">
					<Button variant="ghost" className="gap-2">
						<ArrowLeft className="h-4 w-4" />
						Back to Facilities
					</Button>
				</Link>

				{/* Hero Section */}
				<div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg">
					<img
						src={facility.imageUrl}
						alt={facility.name}
						className="h-full w-full object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
						<div className="absolute bottom-0 p-8">
							<h1 className="text-4xl font-bold text-white">{facility.name}</h1>
						</div>
					</div>
				</div>

				{/* Content */}
				<div className="grid gap-8 md:grid-cols-3">
					{/* Main Content */}
					<div className="md:col-span-2 space-y-6">
						<Card>
							<CardContent className="p-6">
								<h2 className="text-2xl font-bold mb-4">Overview</h2>
								<p className="text-muted-foreground whitespace-pre-wrap">
									{facility.description}
								</p>
							</CardContent>
						</Card>

						{/* Features */}
						<Card>
							<CardContent className="p-6">
								<h2 className="text-2xl font-bold mb-4">Features</h2>
								<div className="grid gap-4 sm:grid-cols-2">
									{facility.features.map((feature: string) => (
										<div
											key={feature}
											className="flex items-center gap-2 p-2 rounded-lg bg-muted/50"
										>
											<CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
											<span>{feature}</span>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Sidebar */}
					<div className="space-y-6">
						{/* Availability */}
						<Card>
							<CardContent className="p-6">
								<h3 className="text-xl font-bold mb-4">Availability</h3>
								<div className="space-y-2">
									<p className="text-sm">
										<span className="font-medium">Opening Hours:</span>{" "}
										{facility.openingHours || "6:00 AM - 10:00 PM"}
									</p>
									<p className="text-sm">
										<span className="font-medium">Days:</span>{" "}
										{facility.availableDays || "Monday - Sunday"}
									</p>
								</div>
							</CardContent>
						</Card>

						{/* Additional Information */}
						<Card>
							<CardContent className="p-6">
								<h3 className="text-xl font-bold mb-4">Additional Information</h3>
								<div className="space-y-2 text-sm">
									<p>
										<span className="font-medium">Capacity:</span>{" "}
										{facility.capacity || "Variable"}
									</p>
									<p>
										<span className="font-medium">Equipment:</span>{" "}
										{facility.equipment || "Available on request"}
									</p>
									<p>
										<span className="font-medium">Maintenance:</span>{" "}
										{facility.maintenance || "Regular"}
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</motion.div>
		</div>
	);
}
