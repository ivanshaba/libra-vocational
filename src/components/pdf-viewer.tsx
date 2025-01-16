import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Card } from "@/components/ui/card";

interface PDFViewerProps {
	title?: string;
	pdfUrl: string;
}

export function PDFVieweR({ title, pdfUrl }: PDFViewerProps) {
	const [isLoading, setIsLoading] = useState(false);

	const handleDownload = async () => {
		try {
			setIsLoading(true);
			const response = await fetch(pdfUrl);
			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = `${title || "document"}.pdf`;
			document.body.appendChild(link);
			link.click();
			link.remove();
			window.URL.revokeObjectURL(url);
		} catch (error) {
			console.error("Error downloading PDF:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Card className="p-4 md:p-6">
			<div className="flex justify-between items-center mb-4">
				<div>
					<h3 className="text-lg font-semibold">{title || "Company Profile"}</h3>
				</div>
				<Button
					variant="outline"
					onClick={handleDownload}
					disabled={isLoading}
					className="gap-2"
				>
					<Download className="h-4 w-4" />
					{isLoading ? "Downloading..." : "Download PDF"}
				</Button>
			</div>

			<div className="h-[600px] w-full">
				<iframe
					src={pdfUrl}
					title={title || "PDF Viewer"}
					className="w-full h-full border-0 rounded-lg"
				/>
			</div>
		</Card>
	);
}
