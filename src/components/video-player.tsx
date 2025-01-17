import { useState } from "react";
import ReactPlayer from "react-player";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface VideoPlayerProps {
	videoUrl: string;
	thumbnail?: string;
	title: string;
}

export function VideoPlayer({ videoUrl, thumbnail, title }: VideoPlayerProps) {
	const [isOpen, setIsOpen] = useState(false);
	const defaultThumbnail = "/images/video-thumbnail-default.jpg";

	const getVideoThumbnail = () => {
		if (thumbnail) return thumbnail;
		const youtubeId = getYouTubeId(videoUrl);
		if (youtubeId) {
			return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
		}
		return defaultThumbnail;
	};

	return (
		<>
			<div
				className="relative aspect-video cursor-pointer group"
				onClick={() => setIsOpen(true)}
			>
				<img
					src={getVideoThumbnail()}
					alt={title}
					className="w-full h-full object-cover rounded-lg"
					onError={(e) => {
						e.currentTarget.src = defaultThumbnail;
					}}
				/>
				<div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
					<Button variant="secondary" size="icon" className="w-16 h-16 rounded-full">
						<Play className="h-8 w-8" />
					</Button>
				</div>
			</div>

			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent title={title} className="sm:max-w-[900px] p-0">
					<div className="aspect-video">
						<ReactPlayer
							url={videoUrl}
							thumbnail={getVideoThumbnail()}
							width="100%"
							height="100%"
							controls
							playing={isOpen}
						/>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}

function getYouTubeId(url: string) {
	const match = url.match(
		/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^/&]{10,12})/
	);
	return match?.[1] || "";
}
