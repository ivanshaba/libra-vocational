import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	ArrowRight,
	Trophy,
	Users,
	Target,
	Star,
	Calendar,
	MapPin,
	Mail,
	Phone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DonationForm from "@/components/flutterwave";

const HomePage = () => {
	const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
	const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
	const [aboutRef, aboutInView] = useInView({ triggerOnce: true, threshold: 0.1 });
	const navigate = useNavigate();

	const handleDonationSuccess = (response: unknown) => {
		console.log("Donation successful:", response);
	};

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section
				ref={heroRef}
				className="relative min-h-[90vh] w-full overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-900 via-primary-800 to-primary-700"
			>
				<div className="absolute inset-0">
					{/* Gradient overlays for depth */}
					<div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.3),transparent_50%)]" />
					<div className="absolute inset-0 bg-grid-white/[0.02]" />

					{/* Animated gradient orbs */}
					<div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary-500/30 blur-3xl animate-pulse" />
					<div className="absolute right-0 top-0 h-60 w-60 rounded-full bg-primary-400/20 blur-3xl animate-pulse delay-700" />
					<div className="absolute bottom-0 right-20 h-40 w-40 rounded-full bg-primary-300/20 blur-2xl animate-pulse delay-1000" />
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={heroInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8 }}
					className="container relative z-10 flex h-[90vh] flex-col items-center justify-center text-center"
				>
					{/* Gradient text effect */}
					<h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
						Welcome to{" "}
						<span className="bg-gradient-to-r from-white via-primary-200 to-primary-100 bg-clip-text text-transparent">
							Arena Sports Academy
						</span>
					</h1>
					<p className="mt-6 max-w-[600px] text-lg text-white/90 sm:text-xl">
						Unlock your athletic potential with world-class coaching and
						state-of-the-art facilities
					</p>
					<div className="mt-8 flex flex-col gap-4 sm:flex-row">
						<Button
							onClick={() => navigate("/programs")}
							size="lg"
							className="bg-white text-primary-900 hover:bg-white/90 transition-all duration-300"
						>
							Explore Programs
							<ArrowRight className="ml-2 h-4 w-4" />
						</Button>
						<Button
							onClick={() => navigate("/about")}
							size="lg"
							variant="outline"
							className="border-white text-black hover:text-white hover:bg-white/10 transition-all duration-300"
						>
							Learn More
						</Button>
					</div>
				</motion.div>

				{/* Bottom fade effect */}
				<div className="absolute bottom-0 left-0 right-0 h-5 bg-gradient-to-t from-white via-white/30 to-transparent" />
			</section>

			{/* Stats Section */}
			<section className="py-20" ref={statsRef}>
				<div className="container">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={statsInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.8 }}
						className="grid grid-cols-1 gap-8 md:grid-cols-4"
					>
						{stats.map((stat, index) => (
							<motion.div
								key={stat.label}
								initial={{ opacity: 0, y: 20 }}
								animate={statsInView ? { opacity: 1, y: 0 } : {}}
								transition={{ duration: 0.8, delay: index * 0.1 }}
								className="group relative overflow-hidden rounded-lg bg-white p-6 shadow-lg transition-all hover:shadow-xl"
							>
								<div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-primary-100 transition-transform group-hover:scale-150" />
								<div className="relative">
									<h3 className="mb-2 text-4xl font-bold text-primary-600">
										{stat.value}
									</h3>
									<p className="text-muted-foreground">{stat.label}</p>
								</div>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

			{/* About Section */}
			<section className="relative overflow-hidden bg-gradient-to-b from-white to-primary-50 py-20">
				<div className="container">
					<motion.div
						ref={aboutRef}
						initial={{ opacity: 0, y: 20 }}
						animate={aboutInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.8 }}
						className="grid gap-12 lg:grid-cols-2 lg:gap-16"
					>
						<div>
							<h2 className="text-3xl font-bold lg:text-4xl">
								About Arena Sports Academy
							</h2>
							<p className="mt-4 text-lg text-muted-foreground">
								Founded in 2014, Arena Sports Academy has grown from 20 members to
								over 350 active participants. We are dedicated to developing
								complete soccer players while instilling positive core values.
							</p>
							<div className="mt-8 grid gap-6 sm:grid-cols-2">
								{features.map((feature, index) => (
									<motion.div
										key={feature.title}
										initial={{ opacity: 0, x: -20 }}
										animate={aboutInView ? { opacity: 1, x: 0 } : {}}
										transition={{ duration: 0.8, delay: index * 0.1 }}
										className="flex items-start gap-4"
									>
										<div className="rounded-lg bg-primary-100 p-2">
											{feature.icon}
										</div>
										<div>
											<h3 className="font-semibold">{feature.title}</h3>
											<p className="text-sm text-muted-foreground">
												{feature.description}
											</p>
										</div>
									</motion.div>
								))}
							</div>
						</div>
						<div className="relative">
							<div className="absolute -left-4 -top-4 h-72 w-72 rounded-full bg-primary-100/50 blur-3xl" />
							<div className="absolute -bottom-4 -right-4 h-72 w-72 rounded-full bg-primary-100/50 blur-3xl" />
							<div className="relative grid gap-4 sm:grid-cols-2">
								{values.map((value, index) => (
									<motion.div
										key={value.title}
										initial={{ opacity: 0, y: 20 }}
										animate={aboutInView ? { opacity: 1, y: 0 } : {}}
										transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
									>
										<Card className="group overflow-hidden">
											<CardContent className="p-6">
												<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 transition-colors group-hover:bg-primary-500 group-hover:text-white">
													{value.icon}
												</div>
												<h3 className="mb-2 font-semibold">
													{value.title}
												</h3>
												<p className="text-sm text-muted-foreground">
													{value.description}
												</p>
											</CardContent>
										</Card>
									</motion.div>
								))}
							</div>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Services Section */}
			<section className="py-20">
				<div className="container">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={aboutInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.8 }}
						className="text-center"
					>
						<h2 className="text-3xl font-bold lg:text-4xl">Our Services</h2>
						<p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
							Comprehensive programs and services designed to develop complete
							athletes
						</p>
					</motion.div>

					<div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{services.map((service, index) => (
							<motion.div
								key={service.title}
								initial={{ opacity: 0, y: 20 }}
								animate={aboutInView ? { opacity: 1, y: 0 } : {}}
								transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
							>
								<Card className="group h-full cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg">
									<CardContent className="p-6">
										<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 transition-colors group-hover:bg-primary-500 group-hover:text-white">
											{service.icon}
										</div>
										<h3 className="mb-2 text-xl font-bold">{service.title}</h3>
										<p className="text-muted-foreground">
											{service.description}
										</p>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Contact Section */}
			<section className="relative overflow-hidden bg-primary-900 py-20 text-white">
				<div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />
				<div className="container relative">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={aboutInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.8 }}
						className="text-center"
					>
						<h2 className="text-3xl font-bold lg:text-4xl">Get in Touch</h2>
						<p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
							Join us in developing the next generation of football talent
						</p>
					</motion.div>

					<div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{contactInfo.map((info, index) => (
							<motion.div
								key={info.title}
								initial={{ opacity: 0, y: 20 }}
								animate={aboutInView ? { opacity: 1, y: 0 } : {}}
								transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
								className="flex items-center gap-4 rounded-lg bg-white/10 p-6"
							>
								<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10">
									{info.icon}
								</div>
								<div>
									<h3 className="font-semibold">{info.title}</h3>
									<p className="text-white/80">{info.value}</p>
								</div>
							</motion.div>
						))}
					</div>

					<div className="mt-12 text-center">
						<Button
							onClick={() => navigate("/contact")}
							size="lg"
							className="bg-white text-primary-900 hover:bg-white/90"
						>
							Contact Us
							<ArrowRight className="ml-2 h-4 w-4" />
						</Button>
					</div>
					<div className="mt-12">
						<DonationForm
							onSuccess={handleDonationSuccess}
							publicKey={import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY || ""}
							organizationName="Arena Sports Academy"
							organizationLogo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7urzA8YNTa1Egqt-9IoZQm4Z6FPxNUxzI3_IzL4vjRwMn0xNqqST5W1sPM40hfmDncjo&usqp=CAU"
						/>
					</div>
				</div>
			</section>
		</div>
	);
};

const stats = [
	{ value: "350+", label: "Active Members" },
	{ value: "16+", label: "Teams" },
	{ value: "130+", label: "Junior Players" },
	{ value: "500+", label: "Community Members" },
];

const features = [
	{
		title: "Professional Coaching",
		description: "Expert coaches with proven track records",
		icon: <Trophy className="h-5 w-5 text-primary-600" />,
	},
	{
		title: "Modern Facilities",
		description: "State-of-the-art training facilities",
		icon: <Star className="h-5 w-5 text-primary-600" />,
	},
	{
		title: "Personalized Training",
		description: "Programs tailored to individual needs",
		icon: <Target className="h-5 w-5 text-primary-600" />,
	},
	{
		title: "Regular Events",
		description: "Competitions and tournaments",
		icon: <Calendar className="h-5 w-5 text-primary-600" />,
	},
];

const values = [
	{
		title: "Fair Play",
		description: "Promoting sportsmanship and ethical conduct",
		icon: <Trophy className="h-6 w-6" />,
	},
	{
		title: "Teamwork",
		description: "Building strong collaborative skills",
		icon: <Users className="h-6 w-6" />,
	},
	{
		title: "Excellence",
		description: "Striving for continuous improvement",
		icon: <Star className="h-6 w-6" />,
	},
	{
		title: "Development",
		description: "Focus on holistic growth",
		icon: <Target className="h-6 w-6" />,
	},
];

const services = [
	{
		title: "Euro Tours",
		description: "Professional football tours in Europe for exposure and experience",
		icon: <Trophy className="h-6 w-6" />,
	},
	{
		title: "Football Agency",
		description: "Professional player representation and management",
		icon: <Users className="h-6 w-6" />,
	},
	{
		title: "Soccer Academy",
		description: "Professional training and talent development programs",
		icon: <Target className="h-6 w-6" />,
	},
];

const contactInfo = [
	{
		title: "Location",
		value: "Bunamwaya, Ngobe, Near Hass Petrol Station",
		icon: <MapPin className="h-6 w-6" />,
	},
	{
		title: "Email",
		value: "arenasportsacademyug@gmail.com",
		icon: <Mail className="h-6 w-6" />,
	},
	{
		title: "Phone",
		value: "+256 701102346 / +256 746971205",
		icon: <Phone className="h-6 w-6" />,
	},
];

export default HomePage;
