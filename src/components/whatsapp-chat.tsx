import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";

interface WhatsAppChatProps {
	phoneNumber: string; // Format: "0393247785" (no plus sign or spaces)
	message?: string;
}

export function WhatsAppChat({
	phoneNumber,
	message = "Hello! I'm interested in learning more about Libra Vocational and Business Institute",
}: WhatsAppChatProps) {
	const handleClick = () => {
		const encodedMessage = encodeURIComponent(message);
		const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
		window.open(url, "_blank");
	};

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.5 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{
				duration: 0.3,
				ease: [0, 0.71, 0.2, 1.01],
				scale: {
					type: "spring",
					damping: 5,
					stiffness: 100,
					restDelta: 0.001,
				},
			}}
			className="fixed bottom-6 right-6 z-50"
		>
			<Button
				onClick={handleClick}
				size="lg"
				className="rounded-full bg-[#25D366] hover:bg-[#20BD5A] shadow-lg group"
			>
				<FaWhatsapp className="h-6 w-6 mr-2 transition-transform group-hover:scale-110" />
				<span className="font-medium">Chat with us</span>
			</Button>
		</motion.div>
	);
}
