import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Users, Target, Heart } from "lucide-react"

export function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">Our Story</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Building champions in sports and life since 2010
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold">Our Mission</h2>
                <p className="mt-4 text-muted-foreground">
                  To provide world-class sports training and facilities that empower athletes
                  to reach their full potential while fostering character development and
                  life skills that extend beyond sports.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold">Our Vision</h2>
                <p className="mt-4 text-muted-foreground">
                  To be the leading sports academy that sets the standard for athletic
                  excellence, personal growth, and community impact through innovative
                  training programs and dedicated mentorship.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Values */}
        <div className="mt-24">
          <h2 className="text-center text-3xl font-bold">Our Core Values</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{value.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* History Timeline */}
        <div className="mt-24">
          <h2 className="text-center text-3xl font-bold">Our Journey</h2>
          <div className="mt-12 space-y-8">
            {timeline.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-border"
              >
                <div className="absolute -left-[9px] top-1.5 h-5 w-5 rounded-full border-2 border-background bg-primary" />
                <div className="text-lg font-semibold">{event.year}</div>
                <p className="mt-2 text-muted-foreground">{event.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const values = [
  {
    title: "Excellence",
    description: "Striving for the highest standards in everything we do",
    icon: <Trophy className="h-6 w-6 text-primary" />,
  },
  {
    title: "Community",
    description: "Building strong relationships and supporting each other",
    icon: <Users className="h-6 w-6 text-primary" />,
  },
  {
    title: "Growth",
    description: "Continuous improvement both in sports and character",
    icon: <Target className="h-6 w-6 text-primary" />,
  },
  {
    title: "Passion",
    description: "Bringing enthusiasm and dedication to every training session",
    icon: <Heart className="h-6 w-6 text-primary" />,
  },
]

const timeline = [
  {
    year: "2010",
    description: "Founded Arena Sports Academy with a small facility and big dreams.",
  },
  {
    year: "2013",
    description: "Expanded facilities to include indoor training areas and specialized equipment.",
  },
  {
    year: "2015",
    description: "Launched youth development program and achieved first national recognition.",
  },
  {
    year: "2018",
    description: "Opened state-of-the-art performance center and expanded coaching staff.",
  },
  {
    year: "2020",
    description: "Introduced virtual training programs and expanded reach globally.",
  },
  {
    year: "2024",
    description: "Celebrating our growth with over 1000 athletes trained and multiple success stories.",
  },
]
