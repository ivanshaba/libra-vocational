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
	ChevronLeft,
	ChevronRight,
	Building2,
	GraduationCap,
	MapPin,
	Mail,
	Phone,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { useState, useEffect } from "react";

function chunkArray<T>(array: T[], size: number): T[][] {
	return array.reduce((acc, _, i) => {
		if (i % size === 0) {
			acc.push(array.slice(i, i + size));
		}
		return acc;
	}, [] as T[][]);
}

const HomePage = () => {
	const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
	const [aboutRef, aboutInView] = useInView({ triggerOnce: true, threshold: 0.1 });
	const navigate = useNavigate();

	const { data: registrations = [], isLoading } = useQuery({
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

	// Group programs into chunks of 3
	const programSlides = chunkArray(programs, 1);

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % programSlides.length);
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + programSlides.length) % programSlides.length);
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
							{heroSlides[currentSlide]?.title}
						</h1>
						<p className="text-xl text-white/90 mb-8">
							{heroSlides[currentSlide]?.subtitle}
						</p>
						<div className="flex flex-wrap gap-4">
							<Button asChild size="lg" className="bg-primary hover:bg-primary/90">
								<Link to="/registration">
									Join Institute
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
									<p className="text-3xl font-bold">
										{/* {registrations.length} */}
										400+</p>
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
								<p className="text-sm text-white/80">Expert Trainers</p>
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
									<p className="text-3xl font-bold">{facilities.length}12+</p>
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
									<p className="text-3xl font-bold">{alumni.length}500+</p>
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
								<p className="text-sm text-white/80">Years of Existance</p>
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
								About  Libra
							</h2>
							<p className="mt-4 text-lg text-muted-foreground">
							Welcome to Libra Vocational and Business Institute, where we empower
							individuals with practical skills and knowledge to excel in their chosen
							fields. Our institute offers a diverse range of courses tailored to meet
							the demands of today's job market.
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

			{/* Replace Services Section with Programs Carousel */}
			<section className="py-20 bg-muted/50">
				<div className="container">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="text-center mb-12"
					>
						<h2 className="text-3xl font-bold">Our Programs</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Discover our comprehensive range of academic programs
						</p>
					</motion.div>

					<div className="relative">
						<div className="overflow-hidden">
							<motion.div
								className="flex transition-transform duration-500 ease-out"
								style={{
									transform: `translateX(-${currentSlide * 100}%)`,
								}}
							>
								{programSlides.map((slidePrograms, slideIndex) => (
									<div
										key={slideIndex}
										className="w-full flex-shrink-0 grid grid-cols-1 gap-4 px-4"
									>
										{slidePrograms.map((program) => (
											<Card key={program.id} className="overflow-hidden">
												<div className="aspect-video relative">
													<img
														src={program.imageUrl}
														alt={program.name}
														className="w-full h-full object-cover"
													/>
													<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
													<div className="absolute bottom-0 p-6 text-white">
														<h3 className="text-xl font-bold mb-2">
															{program.name}
														</h3>
														<p className="text-white/90 line-clamp-2 text-sm">
															{program.description}
														</p>
													</div>
												</div>
												<CardContent className="p-4">
													<div className="flex justify-between items-center">
														<div>
															<p className="text-xs text-muted-foreground">
																Duration: {program.duration}
															</p>
															<p className="font-semibold text-sm">
																{program.price.toLocaleString()} UGX
															</p>
														</div>
														<Link to={`/programs/${program.id}`}>
															<Button size="sm">Learn More</Button>
														</Link>
													</div>
												</CardContent>
											</Card>
										))}
									</div>
								))}
							</motion.div>
						</div>

						{programSlides.length > 1 && (
							<>
								<Button
									variant="ghost"
									size="icon"
									className="absolute -left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 rounded-full"
									onClick={prevSlide}
								>
									<ChevronLeft className="h-6 w-6" />
								</Button>

								<Button
									variant="ghost"
									size="icon"
									className="absolute -right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 rounded-full"
									onClick={nextSlide}
								>
									<ChevronRight className="h-6 w-6" />
								</Button>
							</>
						)}
					</div>
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
							Proud to work with organizations that share our vision for youth
							development
						</p>
					</motion.div>

					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						{partners.map((partner) => (
							<motion.div
								key={partner.id}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5 }}
								className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-muted/50 transition-colors"
							>
								<div className="h-24 w-full flex items-center justify-center mb-4">
									<img
										src={partner.logo}
										alt={partner.name}
										className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all"
									/>
								</div>
								<h3 className="font-semibold text-lg mb-2">{partner.name}</h3>
								<p className="text-sm text-muted-foreground">
									{partner.description}
								</p>
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
							Join us in developing the next generation of academic talent
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
				</div>
			</section>
		</div>
	);
};

const contactInfo = [
	{
		title: "Address",
		value: "Kampala, Uganda",
		icon: <MapPin className="h-5 w-5 text-primary-600" />,
	},
	{
		title: "Email",
		value: "info@libravocational.com",
		icon: <Mail className="h-5 w-5 text-primary-600" />,
	},
	{
		title: "Phone",
		value: "+256 393 247 785",
		icon: <Phone className="h-5 w-5 text-primary-600" />,
	},
];

const features = [
	{
		title: "Professional Trainers",
		description: "Expert Trainers with proven track records",
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
		description: "Graduations",
		icon: <Calendar className="h-5 w-5 text-primary-600" />,
	},
];

const values = [
	{
		title: "co-curricullum activities",
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

const heroSlides = [
	{
		id: 1,
		image: "/images/hero/10.JPG",
		title: "Developing The Best Problem Solvers",
		subtitle:
			"Join Libra Vocational and Business Institute and excel in Technical, Practical and Psychological aspects of  skills while building strong character and values.",
	},
	{
		id: 2,
		image: "/images/hero/7.JPG",
		title: "Professional Training Programs",
		subtitle:
			"Access world-class training and facilities designed to nurture students and develop champions.",
	},
	{
		id: 3,
		image: "/images/hero/12.JPG",
		title: "Building Future Champions",
		subtitle:
			"Join our comprehensive skill development programs focused on both academic excellence and personal growth.",
	},
];

const partners = [
	{
		id: 1,
		name: "Uganda Business and Technical Examination Board",
		logo: "/images/partners/ubteb.jpeg",
		description: "Premier foundation  for vocational examination sytems",
	},
	{
		id: 2,
		name: "Uganda Vocational and Technical Assement Board",
		logo: "/images/partners/uvtab.jpg",
		description: "Developing skilled individuals",
	},
	// {
	// 	id: 3,
	// 	name: "Uganda Youth Football Association",
	// 	logo: "/images/partners/uyfa.jpg",
	// 	description: "Affiliated to Federation of Uganda Football Association-FUFA",
	// },
	{
		id: 4,
		name: "New Leaf Technologies Uganda Ltd",
		logo: "/images/partners/new-leaf.jpg",
		description: "Christian Mission in Holistic Transformational Development",
	},
	// {
	// 	id: 5,
	// 	name: "FCV International Football Academy",
	// 	logo: "/images/partners/fcv.jpg",
	// 	description: "London, United Kingdom",
	// },
];

export default HomePage;
