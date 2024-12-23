import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ContactFormData } from "@/types";
import { api } from "@/services/api";

export function Contact() {
	const [formData, setFormData] = useState<ContactFormData>({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		// Here we'll add API integration later
		console.log("Form submitted:", formData);
		const response = await api.submitContactForm(formData);
		console.log("API response:", response);
	};

	const handleInputChange =
		(field: keyof ContactFormData) =>
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setFormData((prev) => ({ ...prev, [field]: e.target.value }));
		};

	return (
		<div className="container py-12">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<h1 className="text-4xl font-bold">Contact Us</h1>
				<p className="mt-4 text-lg text-muted-foreground">
					Get in touch with us for any inquiries or support.
				</p>

				<div className="mt-12 grid gap-8 lg:grid-cols-2">
					{/* Contact Information */}
					<div ref={ref} className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>Contact Information</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center space-x-3">
									<MapPin className="h-5 w-5 text-primary" />
									<span>
										Arena Sports Academy, Bunamwaya, Ngobe, Near Hass Petrol
										Station, Shop No:Doo3
									</span>
								</div>
								<div className="flex items-center space-x-3">
									<Phone className="h-5 w-5 text-primary" />
									<span>+256 701102346 / +256 746971205</span>
								</div>
								<div className="flex items-center space-x-3">
									<Mail className="h-5 w-5 text-primary" />
									<span>arenasportsacademyug@gmail.com</span>
								</div>
								<div className="flex items-center space-x-3">
									<Clock className="h-5 w-5 text-primary" />
									<div>
										<p>Monday - Friday: 8:00 AM - 6:00 PM</p>
										<p>Saturday: 9:00 AM - 4:00 PM</p>
										<p>Sunday: Closed</p>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Map */}
						<Card>
							<CardContent className="p-0">
								<div className="aspect-video w-full">
									<iframe
										src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7574286404407!2d32.55661937426803!3d0.3133477640673439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbc0f17d49c8b%3A0xd5f1c7861b913be6!2sKampala%20City%20Square!5e0!3m2!1sen!2sug!4v1700000000000!5m2!1sen!2sug"
										width="100%"
										height="100%"
										style={{ border: 0 }}
										allowFullScreen
										loading="lazy"
										referrerPolicy="no-referrer-when-downgrade"
										title="Arena Sports Academy Location"
									/>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Contact Form */}
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={inView ? { opacity: 1, x: 0 } : {}}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						<Card>
							<CardHeader>
								<CardTitle>Send us a Message</CardTitle>
							</CardHeader>
							<CardContent>
								<form onSubmit={handleSubmit} className="space-y-4">
									<div>
										<label className="text-sm font-medium">Name</label>
										<Input
											value={formData.name}
											onChange={handleInputChange("name")}
											placeholder="Your name"
											required
										/>
									</div>
									<div>
										<label className="text-sm font-medium">Email</label>
										<Input
											type="email"
											value={formData.email}
											onChange={handleInputChange("email")}
											placeholder="Your email"
											required
										/>
									</div>
									<div>
										<label className="text-sm font-medium">Subject</label>
										<Input
											value={formData.subject}
											onChange={handleInputChange("subject")}
											placeholder="Message subject"
											required
										/>
									</div>
									<div>
										<label className="text-sm font-medium">Message</label>
										<textarea
											value={formData.message}
											onChange={handleInputChange("message")}
											placeholder="Your message"
											required
											className="h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
										/>
									</div>
									<Button type="submit" className="w-full">
										Send Message
									</Button>
								</form>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			</motion.div>
		</div>
	);
}
