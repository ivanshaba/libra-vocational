import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Users, Target, Heart, Briefcase, Globe, Sprout, School } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const AboutPage = () => {
	const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

	return (
		<div className="min-h-screen bg-gradient-to-b from-white to-green-50">
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
						<h1 className="text-5xl font-bold mb-6">About Arena Sports Academy</h1>
						<p className="text-xl text-white/90">
							Developing complete athletes since 2014
						</p>
					</motion.div>
				</div>
			</section>

			{/* History Section */}
			<section className="py-16">
				<div className="container">
					<motion.div
						ref={ref}
						initial={{ opacity: 0, y: 20 }}
						animate={inView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.8 }}
						className="max-w-3xl mx-auto"
					>
						<Card className="p-8 shadow-lg">
							<CardContent className="space-y-6">
								<div className="flex items-center gap-4 mb-6">
									<div className="h-16 w-1 bg-primary-600" />
									<h2 className="text-3xl font-bold">Our Journey</h2>
								</div>
								<p className="text-lg text-muted-foreground leading-relaxed">
									Arena Sports Academy was formed in 2014 with an initial
									membership of 20 members. From our humble beginnings, we have
									grown in membership, networks and credibility within the Sports
									fraternity, especially soccer games itself in Uganda.
								</p>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
									<div className="flex items-center gap-4">
										<div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
											<Users className="h-6 w-6 text-primary-600" />
										</div>
										<div>
											<h3 className="font-semibold">2014</h3>
											<p className="text-muted-foreground">
												20 Initial Members
											</p>
										</div>
									</div>
									<div className="flex items-center gap-4">
										<div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
											<Trophy className="h-6 w-6 text-primary-600" />
										</div>
										<div>
											<h3 className="font-semibold">2024</h3>
											<p className="text-muted-foreground">
												350+ Active Members
											</p>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			</section>

			{/* Objectives Section */}
			<section className="py-16 bg-gradient-to-b from-green-50 to-white">
				<div className="container">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={inView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="text-center mb-12"
					>
						<h2 className="text-3xl font-bold">Objectives & Expected Outcomes</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Our mission is to develop well-rounded athletes and community leaders
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{objectives.map((objective, index) => (
							<motion.div
								key={objective.title}
								initial={{ opacity: 0, y: 20 }}
								animate={inView ? { opacity: 1, y: 0 } : {}}
								transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
							>
								<Card className="h-full hover:shadow-lg transition-shadow">
									<CardContent className="p-6">
										<div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mb-6">
											{objective.icon}
										</div>
										<h3 className="text-xl font-bold mb-4">
											{objective.title}
										</h3>
										<p className="text-muted-foreground">
											{objective.description}
										</p>
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
						animate={inView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="text-center mb-12"
					>
						<h2 className="text-3xl font-bold">Our Leadership</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Meet the dedicated team guiding our vision
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{directors.map((director, index) => (
							<motion.div
								key={director.name}
								initial={{ opacity: 0, y: 20 }}
								animate={inView ? { opacity: 1, y: 0 } : {}}
								transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
							>
								<Card className="overflow-hidden hover:shadow-lg transition-all">
									<div className="aspect-square relative overflow-hidden">
										<img
											src={director.image}
											alt={director.name}
											className="object-cover w-full h-full transition-transform hover:scale-105"
										/>
									</div>
									<CardContent className="p-6 text-center">
										<h3 className="text-xl font-bold">{director.name}</h3>
										<p className="text-primary-600">{director.role}</p>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Future Plans Section */}
			<section className="py-16 bg-gradient-to-b from-white to-green-50">
				<div className="container">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={inView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.8, delay: 0.6 }}
						className="text-center mb-12"
					>
						<h2 className="text-3xl font-bold">Future Plans</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Our roadmap for continued growth and impact
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{futurePlans.map((plan, index) => (
							<motion.div
								key={plan.title}
								initial={{ opacity: 0, y: 20 }}
								animate={inView ? { opacity: 1, y: 0 } : {}}
								transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
							>
								<Card className="h-full hover:shadow-lg transition-shadow">
									<CardContent className="p-6">
										<div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mb-6">
											{plan.icon}
										</div>
										<h3 className="text-xl font-bold mb-4">{plan.title}</h3>
										<p className="text-muted-foreground">{plan.description}</p>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
};

const objectives = [
	{
		title: "Skills Development",
		description:
			"Help early career Young ASA Network member beneficiaries aged 12-25 years improve their business, financial management, and hands-on skills.",
		icon: <Target className="h-6 w-6 text-primary-600" />,
	},
	{
		title: "Project Sustainability",
		description:
			"Enhance the work-ethics and sustainability of Youths Incubation Projects operating in the creative sector.",
		icon: <Briefcase className="h-6 w-6 text-primary-600" />,
	},
	{
		title: "Network Strengthening",
		description:
			"Strengthen ASA Networks for Youths Incubation creative industry and associations.",
		icon: <Users className="h-6 w-6 text-primary-600" />,
	},
	{
		title: "Global Connections",
		description:
			"Connect ASA Sports and Skills Development Networks working in the creative sector to National, Regional and Global counterparts or mentors.",
		icon: <Globe className="h-6 w-6 text-primary-600" />,
	},
];

const directors = [
	{
		name: "Mr. Edward Nsamba",
		role: "Executive Director/CEO",
		image: "/images/coaches/Edward-Nsamba.jpg",
	},
	{
		name: "Mr. Godfrey Magero",
		role: "Board Member",
		image: "/images/coaches/Edward-Nsamba.jpg",
	},
	{
		name: "Mrs. Nabukalu Sauda",
		role: "Board Member",
		image: "/images/coaches/Edward-Nsamba.jpg",
	},
];

const futurePlans = [
	{
		title: "Sports Infrastructure",
		description:
			"Building a One Stop Center Sports and Games Recreation Infrastructure for Training and Tournament Competitions, including Stadiums facilities.",
		icon: <Trophy className="h-6 w-6 text-primary-600" />,
	},
	{
		title: "Housing Development",
		description:
			"Real Estate Housing Development for Children and Youths ASA Members from Vulnerable and Poor Households families.",
		icon: <Heart className="h-6 w-6 text-primary-600" />,
	},
	{
		title: "Commercial Farming",
		description:
			"Establish Commercial Mixed Farmland for Crops and Animal husbandry and Agro-forestry, for the purposes of Nutritional Food Security and Income generation.",
		icon: <Sprout className="h-6 w-6 text-primary-600" />,
	},
	{
		title: "International Programs",
		description:
			"Promote International Exchange Programs in Sports, Games and Creative Industries, including participation in Conferences and access to Sports and Games International Scholarships.",
		icon: <School className="h-6 w-6 text-primary-600" />,
	},
];

export default AboutPage;
