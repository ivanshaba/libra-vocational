import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";

export function Footer() {
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
						<div className="flex gap-4">
							<a
								href="#"
								className="rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20"
								aria-label="Facebook"
							>
								<Facebook className="h-5 w-5" />
							</a>
							<a
								href="#"
								className="rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20"
								aria-label="Twitter"
							>
								<Twitter className="h-5 w-5" />
							</a>
							<a
								href="#"
								className="rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20"
								aria-label="Instagram"
							>
								<Instagram className="h-5 w-5" />
							</a>
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
								<span>arenasportsacademyug@gmail.com</span>
							</li>
						</ul>
					</div>

					{/* Newsletter Signup */}
					<div className="space-y-4">
						<h4 className="text-lg font-semibold">Stay Updated</h4>
						<p className="text-sm text-white/80">
							Subscribe to our newsletter for the latest updates and news.
						</p>
						<form className="flex flex-col gap-3">
							<input
								type="email"
								placeholder="Enter your email"
								className="rounded-lg bg-white/10 px-4 py-2 text-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/20"
							/>
							<Button
								type="submit"
								className="bg-white text-primary-900 hover:bg-white/90"
							>
								Subscribe
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
						<div className="flex gap-6 text-sm text-white/60">
							<Link to="/privacy" className="hover:text-white">
								Privacy Policy
							</Link>
							<Link to="/terms" className="hover:text-white">
								Terms of Service
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
