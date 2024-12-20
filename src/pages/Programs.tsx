import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Program } from "@/types"
import { ProgramCategory } from '@/types/dtos'

export function Programs() {
  const [category, setCategory] = useState<Program["category"] | "all">("all")
  const [search, setSearch] = useState("")
  const [ref, inView] = useInView({ triggerOnce: true })
//   const { isLoading, error } = usePrograms()

//   if (isLoading) return <div>Loading...</div>
//   if (error) return <div>Error loading programs</div>

  const filteredPrograms = programs.filter((program) => {
    const matchesCategory = category === "all" || program.category === category
    const matchesSearch = program.name.toLowerCase().includes(search.toLowerCase()) ||
      program.description.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold">Our Programs</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Discover our comprehensive range of sports programs designed to help you achieve your goals.
        </p>

        {/* Filters */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Select
            value={category}
            onValueChange={(value) => setCategory(value as Program["category"] | "all")}
          >
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="training">Training</SelectItem>
              <SelectItem value="camp">Camps</SelectItem>
              <SelectItem value="clinic">Clinics</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Search programs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-[300px]"
          />
        </div>

        {/* Programs Grid */}
        <div
          ref={ref}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredPrograms.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group overflow-hidden rounded-lg border bg-card"
            >
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={program.imageUrl}
                  alt={program.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {program.category}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">
                    {program.duration}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold">{program.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {program.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold">
                    {/* {program.price} */}
                  </span>
                  <button className="text-sm font-medium text-primary hover:underline">
                    Learn More
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPrograms.length === 0 && (
          <p className="mt-12 text-center text-muted-foreground">
            No programs found matching your criteria.
          </p>
        )}
      </motion.div>
    </div>
  )
}

const programs: Program[] = [
  {
    id: "1",
    name: "Elite Performance Training",
    description: "Advanced training program for serious athletes looking to compete at the highest level.",
    duration: "12 weeks",
    price: 999,
    schedule: "Mon, Wed, Fri 6:00 AM - 8:00 AM",
    imageUrl: "/images/programs/arena-sports-academy-grp.jpg",
    category: ProgramCategory.Training,
  },
  {
    id: "2",
    name: "Youth Development Program",
    description: "Comprehensive program focusing on fundamental skills and athletic development for young athletes.",
    duration: "16 weeks",
    price: 799,
    schedule: "Tue, Thu 4:00 PM - 6:00 PM",
    category: ProgramCategory.Training,
    imageUrl: "/images/programs/arena-sports-academy-grp.jpg",
  },
  {
    id: "3",
    name: "Summer Sports Camp",
    description: "Intensive summer camp featuring multiple sports and activities for all skill levels.",
    duration: "4 weeks",
    price: 1299,
    schedule: "Mon-Fri 9:00 AM - 3:00 PM",
    category: ProgramCategory.Camp,
    imageUrl: "/images/programs/arena-sports-academy-grp.jpg",
  },
  {
    id: "4",
    name: "Speed & Agility Clinic",
    description: "Specialized clinic focusing on improving speed, agility, and quick response time.",
    duration: "6 weeks",
    price: 599,
    schedule: "Sat 10:00 AM - 12:00 PM",
    category: ProgramCategory.Clinic,
    imageUrl: "/images/programs/arena-sports-academy-grp.jpg",
  },
  {
    id: "5",
    name: "Strength Training Program",
    description: "Professional strength training program with certified trainers and state-of-the-art equipment.",
    duration: "8 weeks",
    price: 899,
    schedule: "Mon, Wed, Fri 5:00 PM - 7:00 PM",
    category: ProgramCategory.Training,
    imageUrl: "/images/programs/arena-sports-academy-grp.jpg",
  },
  {
    id: "6",
    name: "Sports Nutrition Workshop",
    description: "Educational clinic covering sports nutrition, meal planning, and supplement guidance.",
    duration: "4 weeks",
    price: 299,
    schedule: "Thu 7:00 PM - 8:30 PM",
      category: ProgramCategory.Clinic,
    imageUrl: "/images/programs/arena-sports-academy-grp.jpg",
  },
]
