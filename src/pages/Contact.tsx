import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Building2, Users, Clock } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ContactFormData } from "@/types";
import { api } from "@/services/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const departments = [
	{
		name: "General Inquiries",
		email: "info@arenasportsacademyug.org",
		phone: "+256 746 971 205",
		icon: Building2,
	},
	{
		name: "Consultancy",
		email: "consultancy@arenasportsacademyug.org",
		phone: "+256 784839145",
		icon: Users,
		contact: "Rev Phillips",
	},
];

export function Contact() {
	const [formData, setFormData] = useState<ContactFormData>({
		name: "",
		email: "",
		subject: "",
		message: "",
	});
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const response = await api.submitContactForm(formData);
			console.log("API response:", response);
			toast.success("Message sent successfully");
			setFormData({
				name: "",
				email: "",
				subject: "",
				message: "",
			});
		} catch (error) {
			console.error("Error submitting form:", error);
			toast.error("Error submitting form");
		} finally {
			setIsLoading(false);
		}
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
					Get in touch with us. We're here to help and answer any questions you may have.
				</p>

				<div className="mt-12 grid gap-8 lg:grid-cols-2">
					<div className="space-y-8">
						<div>
							<h2 className="text-2xl font-semibold">Department Contacts</h2>
							<div className="mt-4 grid gap-4">
								{departments.map((dept) => (
									<Card key={dept.name}>
										<CardContent className="flex items-start gap-4 p-4">
											<div className="rounded-lg bg-primary/10 p-2">
												<dept.icon className="h-5 w-5 text-primary" />
											</div>
											<div>
												<h3 className="font-semibold">{dept.name}</h3>
												<div className="mt-1 space-y-1 text-sm text-muted-foreground">
													<p className="flex items-center gap-2">
														<Mail className="h-4 w-4" />
														{dept.email}
													</p>
													<p className="flex items-center gap-2">
														<Phone className="h-4 w-4" />
														{dept.phone}
													</p>
												</div>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						</div>

						<div>
							<h2 className="text-2xl font-semibold">Visit Us</h2>
							<Card className="mt-4">
								<CardContent className="p-4">
									<div className="flex items-start gap-4">
										<div className="rounded-lg bg-primary/10 p-2">
											<MapPin className="h-5 w-5 text-primary" />
										</div>
										<div>
											<h3 className="font-semibold">Our Location</h3>
											<p className="mt-1 text-sm text-muted-foreground">
												Arena Sports Academy, Bunamwaya, Ngobe
												<br />
												Near Hass Petrol Station, Shop No:Doo3
											</p>
											<div className="mt-4">
												<h4 className="font-semibold">Opening Hours</h4>
												<div className="mt-1 space-y-1 text-sm text-muted-foreground">
													<p className="flex items-center gap-2">
														<Clock className="h-4 w-4" />
														Monday - Friday: 8:00 AM - 6:00 PM
													</p>
													<p className="ps-6">
														Saturday: 9:00 AM - 4:00 PM
													</p>
													<p className="ps-6">Sunday: Closed</p>
												</div>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>

							{/* Map */}
							<Card className="mt-4">
								<CardContent className="p-0">
									<div className="aspect-video w-full">
										<iframe
											src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.991253938731!2d32.5444476!3d0.287518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbd44231d0351%3A0x73b1ca6f9c593253!2sArena%20Sports%20Academy%20Ug!5e0!3m2!1sen!2sug!4v1702397547959!5m2!1sen!2sug"
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
					</div>

					<div>
						<h2 className="text-2xl font-semibold">Send us a Message</h2>
						<Card className="mt-4">
							<CardContent className="p-6">
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
									<Button type="submit" className="w-full" disabled={isLoading}>
										{isLoading ? (
											<Loader2 className="h-4 w-4 animate-spin" />
										) : (
											"Send Message"
										)}
									</Button>
								</form>
							</CardContent>
						</Card>
					</div>
				</div>
			</motion.div>
		</div>
	);
}
