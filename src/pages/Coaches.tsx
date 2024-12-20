import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Coach } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Coaches() {
  const [ref, inView] = useInView({ triggerOnce: true })

  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold">Our Coaching Staff</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Meet our team of experienced coaches dedicated to helping you achieve your athletic goals.
        </p>

        <div
          ref={ref}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {coaches.map((coach, index) => (
            <motion.div
              key={coach.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={coach.imageUrl}
                    alt={coach.name}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{coach.name}</CardTitle>
                  <CardDescription>{coach.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{coach.bio}</p>
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold">Specialties:</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {coach.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="rounded-full bg-secondary px-3 py-1 text-xs font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

const coaches: (Coach & { imageUrl: string })[] = [
  {
    id: "1",
    name: "John Smith",
    role: "Head Performance Coach",
    bio: "Former professional athlete with over 15 years of coaching experience. Specializes in strength and conditioning for elite athletes.",
    imageUrl: "/images/coaches/Edward-Nsamba.jpg",
    specialties: ["Strength Training", "Performance Analysis", "Elite Coaching"],
  },
  {
    id: "2",
    name: "Maria Rodriguez",
    role: "Youth Development Coach",
    bio: "Certified youth sports specialist with a passion for developing young athletes. Focus on fundamental skills and character building.",
    imageUrl: "/images/coaches/Edward-Nsamba.jpg",
    specialties: ["Youth Development", "Skill Building", "Team Sports"],
  },
  {
    id: "3",
    name: "David Chen",
    role: "Speed & Agility Specialist",
    bio: "Track and field background with expertise in developing speed, agility, and explosive power in athletes.",
    imageUrl: "/images/coaches/Edward-Nsamba.jpg",
    specialties: ["Speed Training", "Agility", "Plyometrics"],
  },
]
