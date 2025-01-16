import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const testimonials = [
	{
		name: "John Doe",
		role: "Parent",
		image: "/images/testimonials/john-doe.jpg",
		content:
			"My son has improved tremendously since joining Arena Sports Academy. The coaches are exceptional and truly care about each player's development.",
	},
	{
		name: "Sarah Smith",
		role: "Student Athlete",
		image: "/images/testimonials/sarah-smith.jpg",
		content:
			"The training facilities and programs here are world-class. I've grown not just as a player, but as a person too.",
	},
	{
		name: "Michael Johnson",
		role: "Professional Player",
		image: "/images/testimonials/michael-johnson.jpg",
		content:
			"I started my journey here and the foundation I received was crucial to my professional career. The academy's approach to development is outstanding.",
	},
];

export function Testimonials() {
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	return (
		<section className="bg-muted/50 py-16 md:py-24">
			<div className="container">
				<div className="text-center">
					<h2 className="text-3xl font-bold sm:text-4xl">What Our Community Says</h2>
					<p className="mt-4 text-muted-foreground">
						Hear from our students, parents, and alumni about their experiences.
					</p>
				</div>

				<div ref={ref} className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{testimonials.map((testimonial, index) => (
						<motion.div
							key={testimonial.name}
							initial={{ opacity: 0, y: 20 }}
							animate={inView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.5, delay: index * 0.1 }}
						>
							<Card className="h-full">
								<CardContent className="p-6">
									<div className="flex items-start gap-4">
										<Avatar className="h-12 w-12">
											<AvatarImage
												src={testimonial.image}
												alt={testimonial.name}
											/>
											<AvatarFallback>
												{testimonial.name
													.split(" ")
													.map((n) => n[0])
													.join("")}
											</AvatarFallback>
										</Avatar>
										<div>
											<h3 className="font-semibold">{testimonial.name}</h3>
											<p className="text-sm text-muted-foreground">
												{testimonial.role}
											</p>
										</div>
									</div>
									<blockquote className="mt-4 text-muted-foreground">
										"{testimonial.content}"
									</blockquote>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
