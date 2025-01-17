import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function RegistrationSuccess() {
	return (
		<div className="container py-12">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				className="max-w-2xl mx-auto text-center"
			>
				<div className="mb-8 flex justify-center">
					<CheckCircle2 className="h-24 w-24 text-primary" />
				</div>
				<h1 className="text-4xl font-bold mb-4">Registration Successful!</h1>
				<p className="text-lg text-muted-foreground mb-8">
					Thank you for registering with Arena Sports Academy. We will review your
					application and contact you soon with further details.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Button asChild size="lg">
						<Link to="/programs">
							Explore Programs
							<ArrowRight className="ml-2 h-4 w-4" />
						</Link>
					</Button>
					<Button asChild variant="outline" size="lg">
						<Link to="/">Return Home</Link>
					</Button>
				</div>
			</motion.div>
		</div>
	);
}
