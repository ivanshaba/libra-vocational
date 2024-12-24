import { cn } from "@/lib/utils";

export function Image({ className, ...props }: React.ComponentPropsWithoutRef<"img">) {
	return <img className={cn("object-cover", className)} {...props} />;
}

Image.displayName = "Image";
