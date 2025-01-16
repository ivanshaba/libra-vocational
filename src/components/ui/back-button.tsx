import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingBackButton() {
	const navigate = useNavigate();
	const location = useLocation();

	// Don't show on home page
	if (location.pathname === "/" || location.pathname === "/admin") {
		return null;
	}

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 20 }}
				className="fixed bottom-6 left-6 z-50"
			>
				<Button
					variant="secondary"
					size="lg"
					className="rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 gap-2"
					onClick={() => navigate(-1)}
				>
					<ArrowLeft className="h-4 w-4" />
					Back
				</Button>
			</motion.div>
		</AnimatePresence>
	);
}
