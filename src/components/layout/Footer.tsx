import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { useState } from "react";
import { api } from "@/services/api";
import { toast } from "sonner";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube, FaPaypal } from "react-icons/fa";

const socialLinks = [
	{
		name: "Facebook",
		url: "https://www.facebook.com/share/v/15TeKUVQyt/",
		icon: <FaFacebook className="h-5 w-5" />,
		hoverClass: "hover:bg-[#1877F2]",
	},
	{
		name: "Instagram",
		url: "https://www.instagram.com/arenasportsacademyug/profilecard/?igsh=ZDZmcHZpdmkwcGJy",
		icon: <FaInstagram className="h-5 w-5" />,
		hoverClass: "hover:bg-[#E4405F]",
	},
	{
		name: "TikTok",
		url: "https://vm.tiktok.com/ZS6DGyX25/",
		icon: <FaTiktok className="h-5 w-5" />,
		hoverClass: "hover:bg-[#000000]",
	},
	{
		name: "YouTube",
		url: "https://youtube.com/@arenasportsacademy5067?si=BIFHIuvyN1bJScMN",
		icon: <FaYoutube className="h-5 w-5" />,
		hoverClass: "hover:bg-[#FF0000]",
	},
	{
		name: "PayPal",
		url: "https://www.paypal.me/NSAMBAEDWARD",
		icon: <FaPaypal className="h-5 w-5" />,
		hoverClass: "hover:bg-[#00457C]",
	},
];

export function Footer() {
	const [email, setEmail] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const response = await api.subscribeToNewsletter({ email });
			console.log("API response:", response);
			toast.success("Message sent successfully");
			setEmail("");
		} catch (error) {
			console.error("Error submitting form:", error);
			toast.error("Error submitting form");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<footer className="w-full border-t bg-primary-900 text-white">
			<div className="container">
				{/* Main Footer Content */}
				<div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
					{/* Brand Section */}
					<div className="space-y-4">
						<div className="flex items-center gap-2">
							<div className="h-8 w-8 rounded-full bg-primary-700">
								<Image
									src="/logo.png"
									alt="Arena Sports Academy"
									className="h-8 w-8"
								/>
							</div>
							<h3 className="text-lg font-bold">Arena Sports Academy</h3>
						</div>
						<p className="text-sm text-white/80">
							Developing complete soccer players in a safe and supportive environment
							since 2014. We focus on excellence, teamwork, and personal growth.
						</p>
						<div className="flex flex-wrap gap-4">
							{socialLinks.map((social) => (
								<a
									key={social.name}
									href={social.url}
									target="_blank"
									rel="noopener noreferrer"
									className={`rounded-full bg-white/10 p-2 transition-all duration-300 ${social.hoverClass} hover:text-white hover:scale-110`}
									aria-label={social.name}
								>
									{social.icon}
								</a>
							))}
						</div>
					</div>

					{/* Quick Links */}
					<div className="space-y-4">
						<h4 className="text-lg font-semibold">Quick Links</h4>
						<ul className="space-y-3">
							<li>
								<Link
									to="/programs"
									className="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
								>
									<ArrowRight className="h-4 w-4" />
									Programs
								</Link>
							</li>
							<li>
								<Link
									to="/registration"
									className="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
								>
									<ArrowRight className="h-4 w-4" />
									Registration
								</Link>
							</li>
							<li>
								<Link
									to="/facilities"
									className="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
								>
									<ArrowRight className="h-4 w-4" />
									Facilities
								</Link>
							</li>
							<li>
								<Link
									to="/coaches"
									className="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
								>
									<ArrowRight className="h-4 w-4" />
									Coaches
								</Link>
							</li>
							<li>
								<Link
									to="/about"
									className="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
								>
									<ArrowRight className="h-4 w-4" />
									About Us
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact Information */}
					<div className="space-y-4">
						<h4 className="text-lg font-semibold">Contact Us</h4>
						<ul className="space-y-3">
							<li className="flex items-start gap-3 text-sm text-white/80">
								<MapPin className="mt-1 h-4 w-4 shrink-0" />
								<span>
									Arena Sports Academy, Bunamwaya, Ngobe, Near Hass Petrol
									Station, Shop No:Doo3
								</span>
							</li>
							<li className="flex items-center gap-3 text-sm text-white/80">
								<Phone className="h-4 w-4 shrink-0" />
								<span>+256 701102346 / +256 746971205</span>
							</li>
							<li className="flex items-center gap-3 text-sm text-white/80">
								<Mail className="h-4 w-4 shrink-0" />
								<span>info@arenasportsacademyug.com</span>
							</li>
						</ul>
					</div>

					{/* Newsletter Signup */}
					<div className="space-y-4">
						<h4 className="text-lg font-semibold">Stay Updated</h4>
						<p className="text-sm text-white/80">
							Subscribe to our newsletter for the latest updates and news.
						</p>
						<form className="flex flex-col gap-3" onSubmit={handleSubmit}>
							<input
								type="email"
								placeholder="Enter your email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="rounded-lg bg-white/10 px-4 py-2 text-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/20"
							/>
							<Button
								type="submit"
								className="bg-white text-primary-900 hover:bg-white/90"
								disabled={isLoading}
							>
								{isLoading ? (
									<Loader2 className="h-4 w-4 animate-spin" />
								) : (
									"Subscribe"
								)}
							</Button>
						</form>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="border-t border-white/10 py-6">
					<div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row">
						<p className="text-sm text-white/60">
							© {new Date().getFullYear()} Arena Sports Academy. All rights reserved.
						</p>
					</div>
				</div>

				<div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
					<p>© {new Date().getFullYear()} Arena Sports Academy. All rights reserved.</p>
					<p className="mt-2">
						Developed by{" "}
						<a
							href="https://acceleratedtechnosoft.com"
							target="_blank"
							rel="noopener noreferrer"
							className="text-primary hover:underline"
						>
							Accelerated Technosoft Limited
						</a>
					</p>
				</div>
			</div>
		</footer>
	);
}
