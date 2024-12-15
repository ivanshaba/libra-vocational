import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Facility } from "@/types"

export function Facilities() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold">Our Facilities</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Explore our world-class training facilities designed for optimal performance and development.
        </p>

        {/* Overview Section */}
        <div className="mt-12">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg">
            <img
              src="/images/facilities/Mini-Pitch-Empower-Communities-San-Antonio-TX.jpg"
              alt="Facilities Overview"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
              <div className="absolute bottom-0 p-8">
                <h2 className="text-3xl font-bold text-white">
                  State-of-the-Art Training Complex
                </h2>
                <p className="mt-2 max-w-2xl text-white/90">
                  Our 50,000 square foot facility features modern equipment, specialized training zones,
                  and professional amenities to support your athletic journey.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Facilities Grid */}
        <div
          ref={ref}
          className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {facilities.map((facility, index) => (
            <motion.div
              key={facility.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={facility.imageUrl}
                    alt={facility.name}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{facility.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{facility.description}</p>
                  <div className="mt-4 space-y-2">
                    <h4 className="font-semibold">Key Features:</h4>
                    <ul className="space-y-2">
                      {facility.features.map((feature: string) => (
                        <li key={feature} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button className="mt-6 w-full" variant="outline">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Equipment Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold">Equipment & Technology</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We invest in the latest equipment and technology to provide you with the best training experience.
          </p>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {equipmentCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                    <ul className="mt-4 space-y-2">
                      {category.items.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const facilities: Facility[] = [
  {
    id: "1",
    name: "Indoor Training Arena",
    description: "A climate-controlled environment for year-round training with specialized zones for different sports.",
    features: [
      "40,000 sq ft of training space",
      "Professional-grade flooring",
      "High-ceiling design",
      "Advanced lighting system",
    ],
    imageUrl: "/images/facilities/Mini-Pitch-Empower-Communities-San-Antonio-TX.jpg",
    equipment: [
      "Training machines",
      "Free weights",
      "Cardio equipment",
    ],
  },
  {
    id: "2",
    name: "Performance Center",
    description: "State-of-the-art facility dedicated to strength and conditioning training.",
    features: [
      "Modern weight training area",
      "Cardio zone",
      "Recovery room",
      "Performance tracking systems",
    ],
    imageUrl: "/images/facilities/Mini-Pitch-Empower-Communities-San-Antonio-TX.jpg",
    equipment: [
      "Olympic lifting platforms",
      "Recovery equipment",
      "Assessment tools",
    ],
  },
  {
    id: "3",
    name: "Aquatic Center",
    description: "Professional swimming facility for training and recovery.",
    features: [
      "Olympic-size pool",
      "Recovery pools",
      "Spa facilities",
      "Certified instructors",
    ],
    imageUrl: "/images/facilities/Mini-Pitch-Empower-Communities-San-Antonio-TX.jpg",
    equipment: [
      "Training equipment",
      "Recovery tools",
      "Safety gear",
    ],
  },
]

const equipmentCategories = [
  {
    name: "Strength Training",
    items: [
      "Olympic platforms",
      "Free weights",
      "Power racks",
      "Cable machines",
    ],
  },
  {
    name: "Cardio Equipment",
    items: [
      "Treadmills",
      "Rowing machines",
      "Bikes",
      "Ellipticals",
    ],
  },
  {
    name: "Recovery Tools",
    items: [
      "Compression systems",
      "Massage tools",
      "Ice baths",
      "Stretching area",
    ],
  },
  {
    name: "Technology",
    items: [
      "Performance tracking",
      "Video analysis",
      "Biometric sensors",
      "Mobile app integration",
    ],
  },
]
