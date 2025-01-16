import { useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { VideoPlayer } from "@/components/video-player";
import { Skeleton } from "@/components/ui/skeleton";

export function Videos() {
	const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

	const {
		data: items = [],
		refetch,
		isLoading,
	} = useQuery({
		queryKey: ["gallery", "videos"],
		queryFn: () =>
			api.getGallery().then((items) => items.filter((item) => item.type === "video")),
	});

	useEffect(() => {
		refetch();
	}, [refetch]);

	if (isLoading) {
		return (
			<div className="container py-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{[...Array(6)].map((_, i) => (
					<Skeleton key={i} className="aspect-video w-full" />
				))}
			</div>
		);
	}

	return (
		<div className="container py-12">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<h1 className="text-4xl font-bold">Videos</h1>
				<p className="mt-4 text-lg text-muted-foreground">
					Watch our collection of videos showcasing training sessions, events, and
					highlights.
				</p>

				<div ref={ref} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{items.map((item, index) => (
						<motion.div
							key={item.id}
							initial={{ opacity: 0, y: 20 }}
							animate={inView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.8, delay: index * 0.1 }}
						>
							<div className="space-y-3">
								<VideoPlayer
									videoUrl={item.videoUrl!}
									title={item.title}
									thumbnail={item.imageUrl}
								/>
								<div className="p-2">
									<h3 className="font-semibold">{item.title}</h3>
									<p className="text-sm text-muted-foreground">{item.date}</p>
								</div>
							</div>
						</motion.div>
					))}
				</div>

				{items.length === 0 && (
					<p className="mt-12 text-center text-muted-foreground">
						No videos available at the moment.
					</p>
				)}
			</motion.div>
		</div>
	);
}
