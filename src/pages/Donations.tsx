import { motion } from "framer-motion";
import DonationForm from "@/components/flutterwave";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaMobile, FaPaypal } from "react-icons/fa";
import { Banknote } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Donations() {
	const navigate = useNavigate();

	const handleDonationSuccess = (response: unknown) => {
		console.log("Donation successful:", response);
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
			<div className="container py-12">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					<h1 className="text-4xl font-bold">Support Our Mission</h1>
					<p className="mt-4 text-lg text-muted-foreground">
						Your donation helps us provide quality sports education and opportunities to
						young talents.
					</p>

					<div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						{/* Bank Transfer - Updated */}
						<Card>
							<CardContent className="p-6">
								<div className="flex items-center gap-3 mb-4">
									<Banknote className="h-6 w-6 text-primary" />
									<h2 className="text-xl font-semibold">Bank Transfer</h2>
								</div>
								<p className="mb-4 text-muted-foreground">
									For bank transfer details, please contact us directly. We'll
									provide you with our current banking information.
								</p>
								<Button
									onClick={() => navigate("/contact")}
									className="w-full"
									variant="outline"
								>
									Request Bank Details
								</Button>
							</CardContent>
						</Card>

						{/* PayPal */}
						<Card>
							<CardContent className="p-6">
								<div className="flex items-center gap-3 mb-4">
									<FaPaypal className="h-6 w-6 text-primary" />
									<h2 className="text-xl font-semibold">PayPal</h2>
								</div>
								<p className="mb-4 text-muted-foreground">
									Make a secure donation through PayPal
								</p>
								<Button asChild className="w-full" variant="outline">
									<a
										href="https://www.paypal.me/NSAMBAEDWARD"
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center justify-center gap-2"
									>
										<FaPaypal className="h-4 w-4" />
										Donate with PayPal
									</a>
								</Button>
							</CardContent>
						</Card>

						{/* Mobile Money/Card */}
						<Card>
							<CardContent className="p-6">
								<div className="flex items-center gap-3 mb-4">
									<FaMobile className="h-6 w-6 text-primary" />
									<h2 className="text-xl font-semibold">Mobile Money/Card</h2>
								</div>
								<p className="mb-4 text-muted-foreground">
									Donate securely using Mobile Money or Card
								</p>
								<DonationForm
									onSuccess={handleDonationSuccess}
									publicKey={import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY}
									organizationName={
										import.meta.env.VITE_FLUTTERWAVE_ORGANIZATION_NAME
									}
									organizationLogo={"/logo.png"}
								/>
							</CardContent>
						</Card>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
