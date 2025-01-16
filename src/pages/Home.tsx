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
	ChevronLeft,
	ChevronRight,
	Building2,
	GraduationCap,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import DonationForm from "@/components/flutterwave";
import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

interface Testimonial {
	id: number;
	name: string;
	role: string;
	content: string;
	avatar: string;
	rating: number;
}

interface Partner {
	id: number;
	name: string;
	logo: string;
}

const HomePage = () => {
	const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
	const [aboutRef, aboutInView] = useInView({ triggerOnce: true, threshold: 0.1 });
	const navigate = useNavigate();

	const {
		data: registrations = [],
		refetch,
		isLoading,
	} = useQuery({
		queryKey: ["admin", "registrations"],
		queryFn: api.getRegistrations,
	});

	const { data: programs = [] } = useQuery({
		queryKey: ["programs"],
		queryFn: api.getPrograms,
	});

	const { data: coaches = [] } = useQuery({
		queryKey: ["coaches"],
		queryFn: api.getCoaches,
	});

	const { data: facilities = [] } = useQuery({
		queryKey: ["facilities"],
		queryFn: api.getFacilities,
	});

	const { data: alumni = [] } = useQuery({
		queryKey: ["alumni"],
		queryFn: api.getAlumni,
	});

	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
		}, 5000); // Change slide every 5 seconds

		return () => clearInterval(timer);
	}, []);

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
	};

	const handleDonationSuccess = (response: unknown) => {
		console.log("Donation successful:", response);
	};

	return (
		<div className="min-h-screen">
			{/* Hero Section with Slideshow */}
			<section className="relative min-h-[90vh] flex items-center">
				{/* Slideshow Background */}
				{heroSlides.map((slide, index) => (
					<motion.div
						key={slide.id}
						className="absolute inset-0"
						initial={{ opacity: 0 }}
						animate={{ opacity: currentSlide === index ? 1 : 0 }}
						transition={{ duration: 0.7 }}
					>
						<div
							className="absolute inset-0 bg-cover bg-center bg-no-repeat"
							style={{
								backgroundImage: `url('${slide.image}')`,
							}}
						>
							{/* Overlay with gradient */}
							<div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
						</div>
					</motion.div>
				))}

				{/* Navigation Arrows */}
				<button
					onClick={prevSlide}
					className="absolute left-4 z-20 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors"
					aria-label="Previous slide"
				>
					<ChevronLeft className="h-6 w-6" />
				</button>
				<button
					onClick={nextSlide}
					className="absolute right-4 z-20 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors"
					aria-label="Next slide"
				>
					<ChevronRight className="h-6 w-6" />
				</button>

				{/* Slide Indicators */}
				<div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
					{heroSlides.map((_, index) => (
						<button
							key={index}
							onClick={() => setCurrentSlide(index)}
							className={`w-2 h-2 rounded-full transition-all ${
								currentSlide === index
									? "bg-white w-8"
									: "bg-white/50 hover:bg-white/80"
							}`}
							aria-label={`Go to slide ${index + 1}`}
						/>
					))}
				</div>

				{/* Hero Content */}
				<div className="container relative z-10">
					<motion.div
						key={currentSlide}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="max-w-2xl text-white"
					>
						<h1 className="text-5xl font-bold mb-6 leading-tight">
							{heroSlides[currentSlide].title}
						</h1>
						<p className="text-xl text-white/90 mb-8">
							{heroSlides[currentSlide].subtitle}
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
			<section
				ref={statsRef}
				className="relative overflow-hidden bg-primary-900 py-16 text-white"
			>
				<div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />
				<div className="container relative">
					<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={statsInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.5 }}
							className="text-center"
						>
							<Trophy className="mx-auto h-8 w-8 text-primary-400" />
							<div className="mt-4">
								{isLoading ? (
									<div className="h-8 w-16 mx-auto bg-white/20 animate-pulse rounded" />
								) : (
									<p className="text-3xl font-bold">{registrations.length}+</p>
								)}
								<p className="text-sm text-white/80">Active Students</p>
							</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={statsInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.5, delay: 0.1 }}
							className="text-center"
						>
							<Users className="mx-auto h-8 w-8 text-primary-400" />
							<div className="mt-4">
								{isLoading ? (
									<div className="h-8 w-16 mx-auto bg-white/20 animate-pulse rounded" />
								) : (
									<p className="text-3xl font-bold">{coaches.length}+</p>
								)}
								<p className="text-sm text-white/80">Expert Coaches</p>
							</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={statsInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="text-center"
						>
							<Target className="mx-auto h-8 w-8 text-primary-400" />
							<div className="mt-4">
								{isLoading ? (
									<div className="h-8 w-16 mx-auto bg-white/20 animate-pulse rounded" />
								) : (
									<p className="text-3xl font-bold">{programs.length}+</p>
								)}
								<p className="text-sm text-white/80">Training Programs</p>
							</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={statsInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.5, delay: 0.3 }}
							className="text-center"
						>
							<Building2 className="mx-auto h-8 w-8 text-primary-400" />
							<div className="mt-4">
								{isLoading ? (
									<div className="h-8 w-16 mx-auto bg-white/20 animate-pulse rounded" />
								) : (
									<p className="text-3xl font-bold">{facilities.length}+</p>
								)}
								<p className="text-sm text-white/80">Training Facilities</p>
							</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={statsInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.5, delay: 0.4 }}
							className="text-center"
						>
							<GraduationCap className="mx-auto h-8 w-8 text-primary-400" />
							<div className="mt-4">
								{isLoading ? (
									<div className="h-8 w-16 mx-auto bg-white/20 animate-pulse rounded" />
								) : (
									<p className="text-3xl font-bold">{alumni.length}+</p>
								)}
								<p className="text-sm text-white/80">Alumni Members</p>
							</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={statsInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.5, delay: 0.5 }}
							className="text-center"
						>
							<Star className="mx-auto h-8 w-8 text-primary-400" />
							<div className="mt-4">
								<p className="text-3xl font-bold">9+</p>
								<p className="text-sm text-white/80">Years Experience</p>
							</div>
						</motion.div>
					</div>
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

			{/* Partners Section */}
			<section className="py-16 bg-white">
				<div className="container">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className="text-center mb-12"
					>
						<h2 className="text-3xl font-bold">Our Partners</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Proud to work with organizations that share our vision
						</p>
					</motion.div>

					<div className="relative overflow-hidden">
						<div className="flex animate-scroll">
							{/* First set of partners */}
							{partners.map((partner) => (
								<div
									key={partner.id}
									className="shrink-0 mx-8 w-[150px] grayscale hover:grayscale-0 transition-all"
								>
									<img
										src={partner.logo}
										alt={partner.name}
										className="h-16 w-auto object-contain"
									/>
								</div>
							))}
							{/* Duplicate set for seamless loop */}
							{partners.map((partner) => (
								<div
									key={`${partner.id}-duplicate`}
									className="shrink-0 mx-8 w-[150px] grayscale hover:grayscale-0 transition-all"
								>
									<img
										src={partner.logo}
										alt={partner.name}
										className="h-16 w-auto object-contain"
									/>
								</div>
							))}
						</div>
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

const partners: Partner[] = [
	{
		id: 1,
		name: "Partner 1",
		logo: "/images/partners/partner1.png",
	},
	{
		id: 2,
		name: "Partner 2",
		logo: "/images/partners/partner2.png",
	},
	{
		id: 3,
		name: "Partner 3",
		logo: "/images/partners/partner3.png",
	},
	{
		id: 4,
		name: "Partner 4",
		logo: "/images/partners/partner4.png",
	},
	{
		id: 5,
		name: "Partner 5",
		logo: "/images/partners/partner5.png",
	},
];

const heroSlides = [
	{
		id: 1,
		image: "/images/hero/1.jpg",
		title: "Developing Complete Soccer Players Since 2014",
		subtitle:
			"Join Arena Sports Academy and excel in Technical, Tactical, Physical, and Psychological aspects of the game while building strong character and values.",
	},
	{
		id: 2,
		image: "/images/hero/2.jpg",
		title: "Professional Training Programs",
		subtitle:
			"Access world-class coaching and facilities designed to nurture talent and develop champions.",
	},
	{
		id: 3,
		image: "/images/hero/3.jpg",
		title: "Building Future Champions",
		subtitle:
			"Join our comprehensive youth development program focused on both athletic excellence and personal growth.",
	},
];

export default HomePage;
