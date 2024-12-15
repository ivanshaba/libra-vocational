import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { GalleryItem } from "@/types"

export function Gallery() {
  const [category, setCategory] = useState<string>("all")
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const filteredImages = galleryItems.filter((item) => {
    return category === "all" || item.category === category
  })

  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold">Gallery</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Explore our collection of photos showcasing our facilities, events, and athletes in action.
        </p>

        {/* Filter */}
        <div className="mt-8">
          <Select
            value={category}
            onValueChange={setCategory}
          >
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="events">Events</SelectItem>
              <SelectItem value="facilities">Facilities</SelectItem>
              <SelectItem value="training">Training</SelectItem>
              <SelectItem value="competitions">Competitions</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Masonry Grid */}
        <div
          ref={ref}
          className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4"
        >
          {filteredImages.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="mb-4 break-inside-avoid"
            >
              <div
                className="group relative cursor-pointer overflow-hidden rounded-lg"
                onClick={() => setSelectedImage(item)}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full transform object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex h-full flex-col items-center justify-center p-4 text-center text-white">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm">{item.date}</p>
                    <span className="mt-2 rounded-full bg-white/20 px-3 py-1 text-xs">
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl border-none bg-transparent p-0 shadow-none">
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 z-50 rounded-full bg-background/80 text-foreground hover:bg-background/90"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-4 w-4" />
              </Button>
              {selectedImage && (
                <motion.img
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  className="h-auto w-full rounded-lg"
                />
              )}
            </div>
          </DialogContent>
        </Dialog>

        {filteredImages.length === 0 && (
          <p className="mt-12 text-center text-muted-foreground">
            No images found in this category.
          </p>
        )}
      </motion.div>
    </div>
  )
}

const galleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "Annual Sports Day Championship",
    category: "events",
    imageUrl: "/images/gallery/arena-sports-academy-ug-champions.jpg",
    date: "March 15, 2024",
  },
  {
    id: "2",
    title: "State-of-the-Art Training Facility",
    category: "facilities",
    imageUrl: "/images/gallery/arena-sports-academy-ug-champions.jpg",
    date: "March 10, 2024",
  },
  {
    id: "3",
    title: "Youth Training Session",
    category: "training",
    imageUrl: "/images/gallery/arena-sports-academy-ug-champions.jpg",
    date: "March 8, 2024",
  },
  {
    id: "4",
    title: "Regional Championships",
    category: "competitions",
    imageUrl: "/images/gallery/arena-sports-academy-ug-champions.jpg",
    date: "March 5, 2024",
  },
  {
    id: "5",
    title: "Indoor Training Complex",
    category: "facilities",
    imageUrl: "/images/gallery/arena-sports-academy-ug-champions.jpg",
    date: "March 3, 2024",
  },
  {
    id: "6",
    title: "Elite Performance Workshop",
    category: "training",
    imageUrl: "/images/gallery/arena-sports-academy-ug-champions.jpg",
    date: "March 1, 2024",
  },
  {
    id: "7",
    title: "Summer Camp Opening Ceremony",
    category: "events",
    imageUrl: "/images/gallery/arena-sports-academy-ug-champions.jpg",
    date: "February 28, 2024",
  },
  {
    id: "8",
    title: "National Tournament Finals",
    category: "competitions",
    imageUrl: "/images/gallery/arena-sports-academy-ug-champions.jpg",
    date: "February 25, 2024",
  },
]
