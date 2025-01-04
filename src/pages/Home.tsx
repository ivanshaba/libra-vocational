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
import { Link, useNavigate } from "react-router-dom";
import DonationForm from "@/components/flutterwave";

interface Testimonial {
	id: number;
	name: string;
	role: string;
	content: string;
	avatar: string;
	rating: number;
}

const HomePage = () => {
	const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
	const [aboutRef, aboutInView] = useInView({ triggerOnce: true, threshold: 0.1 });
	const navigate = useNavigate();

	const handleDonationSuccess = (response: unknown) => {
		console.log("Donation successful:", response);
	};

	return (
		<div className="min-h-screen">
			{/* Hero Section with Background Image */}
			<section className="relative min-h-[90vh] flex items-center">
				{/* Background Image */}
				<div
					className="absolute inset-0 bg-cover bg-center bg-no-repeat"
					style={{
						backgroundImage: "url('/images/hero/1.jpg')",
					}}
				>
					{/* Overlay with gradient for better text readability */}
					<div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
				</div>

				{/* Hero Content */}
				<div className="container relative z-10">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="max-w-2xl text-white"
					>
						<h1 className="text-5xl font-bold mb-6 leading-tight">
							Developing Complete Soccer Players Since 2014
						</h1>
						<p className="text-xl text-white/90 mb-8">
							Join Arena Sports Academy and excel in Technical, Tactical, Physical,
							and Psychological aspects of the game while building strong character
							and values.
						</p>
						<div className="flex flex-wrap gap-4">
							<Button asChild size="lg" className="bg-primary hover:bg-primary/90">
								<Link to="/registration">
									Join Academy
									<ArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</Button>
							<Button
								asChild
								size="lg"
								variant="outline"
								className="bg-white/10 border-white/20 hover:bg-white/20 text-white"
							>
								<Link to="/programs">Explore Programs</Link>
							</Button>
						</div>
					</motion.div>
				</div>
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

			{/* Testimonials Section */}
			<section className="relative overflow-hidden bg-primary-50/50 py-20">
				<div className="container relative z-10">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className="text-center"
					>
						<h2 className="text-3xl font-bold">What Our Community Says</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Hear from our students, parents, and community members
						</p>
					</motion.div>

					<div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						{testimonials.map((testimonial, index) => (
							<motion.div
								key={testimonial.id}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
							>
								<Card className="h-full">
									<CardContent className="p-6">
										{/* Rating */}
										<div className="flex gap-1">
											{[...Array(testimonial.rating)].map((_, i) => (
												<Star
													key={i}
													className="h-5 w-5 fill-primary text-primary"
												/>
											))}
										</div>

										{/* Content */}
										<blockquote className="mt-4">
											<p className="text-muted-foreground">
												"{testimonial.content}"
											</p>
										</blockquote>

										{/* Author */}
										<div className="mt-6 flex items-center gap-4">
											<div className="h-12 w-12 overflow-hidden rounded-full bg-primary-100">
												<img
													src={testimonial.avatar}
													alt={testimonial.name}
													className="h-full w-full object-cover"
												/>
											</div>
											<div>
												<p className="font-semibold">{testimonial.name}</p>
												<p className="text-sm text-muted-foreground">
													{testimonial.role}
												</p>
											</div>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>

					{/* Decorative Elements */}
					<div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary-100/50 blur-3xl" />
					<div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-primary-100/50 blur-3xl" />
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
		value: "info@arenasportsacademyug.com",
		icon: <Mail className="h-6 w-6" />,
	},
	{
		title: "Phone",
		value: "+256 701102346 / +256 746971205",
		icon: <Phone className="h-6 w-6" />,
	},
];

const testimonials: Testimonial[] = [
	{
		id: 1,
		name: "David Mukisa",
		role: "Parent",
		content:
			"My son has shown remarkable improvement since joining Arena Sports Academy. The coaches are dedicated and professional, focusing on both athletic and personal development.",
		avatar: "/images/testimonials/avatar-1.jpg",
		rating: 5,
	},
	{
		id: 2,
		name: "Sarah Namukasa",
		role: "Student Athlete",
		content:
			"The training programs at Arena Sports Academy are world-class. I've developed not just as a player, but also as a person. The facilities and coaching staff are exceptional.",
		avatar: "/images/testimonials/avatar-2.jpg",
		rating: 5,
	},
	{
		id: 3,
		name: "John Muwonge",
		role: "Community Member",
		content:
			"Arena Sports Academy has made a significant impact in our community. Their commitment to youth development and social programs is truly commendable.",
		avatar: "/images/testimonials/avatar-3.jpg",
		rating: 5,
	},
];

export default HomePage;
