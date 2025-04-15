import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Compass } from "lucide-react";
import { PDFVieweR } from "@/components/pdf-viewer";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

export function About() {
	const { data: coaches = [] } = useQuery({
		queryKey: ["coaches"],
		queryFn: () => api.getCoaches(),
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
						<h1 className="text-5xl font-bold mb-6">About Us</h1>
					</motion.div>
				</div>
			</section>

			{/* Company Profile Section */}
			<section className="py-16 bg-white">
				<div className="container">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="text-center mb-12"
					>
						<h2 className="text-3xl font-bold">Vocational Profile</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Download or read through our detailed company profile
						</p>
					</motion.div>

					<PDFVieweR
						title="Libra Vocational - Vocational Profile"
						pdfUrl= ""
						// "/documents/company-profile.pdf"
					/>
				</div>
			</section>

			{/* Mission & Vision Section */}
			<section className="py-16 bg-primary-50">
				<div className="container">
					<div className="grid gap-8 md:grid-cols-2">
						{/* Mission */}
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
						>
							<Card className="h-full">
								<CardContent className="p-6">
									<div className="flex items-center gap-4 mb-6">
										<Target className="h-8 w-8 text-primary-600" />
										<h2 className="text-2xl font-bold">Our Mission</h2>
									</div>
									<p className="text-muted-foreground leading-relaxed">
									To equip learners with practical skills and knowledge 
									through quality education and hands-on training.
									</p>
								</CardContent>
							</Card>
						</motion.div>

						{/* Vision */}
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
						>
							<Card className="h-full">
								<CardContent className="p-6">
									<div className="flex items-center gap-4 mb-6">
										<Compass className="h-8 w-8 text-primary-600" />
										<h2 className="text-2xl font-bold">Our Vision</h2>
									</div>
									<p className="text-muted-foreground leading-relaxed">
									 To be a leading institution that fosters innovation, entrepreneurship,
									 and excellence in vocational and business education.
										{/* <br />
										<br />
										To advance players on to all levels of college rosters,
										Uganda National Teams, and to be recognized leader and
										centre for player development at every level of play
										<br />
										<br />
										To be the number sports project in Africa on and off the
										pitch. */}
									</p>
								</CardContent>
							</Card>
						</motion.div>
					</div>
				</div>
			</section>

			{/* History Section */}
			<section className="py-16">
				<div className="container">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="max-w-3xl mx-auto"
					>
						<Card className="p-8 shadow-lg">
							<CardContent className="space-y-6">
								<div className="flex items-center gap-4 mb-6">
									<div className="h-16 w-1 bg-primary-600" />
									<h2 className="text-3xl font-bold">About us</h2>
								</div>
								<p className="text-lg text-muted-foreground leading-relaxed">
								At Libra Vocational & Business Institute, we are dedicated to 
								providing top-tier vocational and business education. Our mission 
								is to empower individuals with practical skills
								and knowledge tailored to excel in today’s fast-paced and competitive job market.
								</p>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			</section>

			{/* Core Values Section */}
			<section className="py-16">
				<div className="container">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="text-center mb-12"
					>
						<h2 className="text-3xl font-bold">Our Core Values</h2>
					</motion.div>

					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{coreValues.map((value, index) => (
							<motion.div
								key={value.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
							>
								<Card className="h-full">
									<CardContent className="p-6">
										<h3 className="text-xl font-bold mb-2">{value.title}</h3>
										<p className="text-muted-foreground">{value.description}</p>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Leadership Section */}
			<section className="py-16">
				<div className="container">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="text-center mb-12"
					>
						<h2 className="text-3xl font-bold">Our Leadership</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Meet the dedicated team guiding our vision
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{coaches
							.filter((coach) => coach.role.toLowerCase().includes("board"))
							.map((coach, index) => (
								<motion.div
									key={coach.name}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
								>
									<Card className="overflow-hidden hover:shadow-lg transition-all">
										<div className="aspect-square relative overflow-hidden">
											<img
												src={coach.imageUrl}
												alt={coach.name}
												className="object-cover w-full h-full transition-transform hover:scale-105"
											/>
										</div>
										<CardContent className="p-6 text-center">
											<h3 className="text-xl font-bold">{coach.name}</h3>
											<p className="text-primary-600">{coach.role}</p>
										</CardContent>
									</Card>
								</motion.div>
							))}
					</div>
				</div>
			</section>
		</div>
	);
}

const coreValues = [
	{
		title: "Professionalism",
		description: "Ensuring equity for all",
	},
	{
		title: "Trust",
		description:
			"Bringing everyone together irrespective of Social, Political, and Economic & cultural attributes",
	},
	{
		title: "Integrity",
		description: "Accepting positive criticism, being transparent and honest in all we do",
	},
	{
		title: "Excellence",
		description:
			"Cooperation in delivering of our targets with both internal and external stake holders",
	},
	// {
	// 	title: "Belonging",
	// 	description: "Fulfilling obligations and enjoying rights of association",
	// },
	// {
	// 	title: "Accountability",
	// 	description: "Accounting for all decisions and activities performed",
	// },
	// {
	// 	title: "Loyalty",
	// 	description: "Offering committed service to the game",
	// },
	// {
	// 	title: "Leadership",
	// 	description: "Providing clear and exemplary management",
	// },
];

export default About;
