import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"
import { Program } from "@/types"
import { useNavigate } from 'react-router-dom'

export function Home() {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [programsRef, programsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [testimonialsRef, testimonialsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const navigate = useNavigate()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-[90vh] min-h-[600px] w-full overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-background"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="container flex h-full flex-col items-center justify-center text-center"
        >
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Welcome to Arena Sports Academy
          </h1>
          <p className="mt-6 max-w-[600px] text-lg text-muted-foreground sm:text-xl">
            Unlock your athletic potential with world-class coaching and state-of-the-art facilities
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button onClick={() => navigate('/programs')} size="lg" className="gap-2">
              Explore Programs
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button onClick={() => navigate('/about')} size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        className="w-full py-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={featuresInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="container"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Why Choose Arena Sports?
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="rounded-lg border bg-card p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Programs Showcase */}
      <section
        ref={programsRef}
        className="w-full bg-muted/50 py-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={programsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="container"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Featured Programs
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPrograms.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                animate={programsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group relative overflow-hidden rounded-lg border bg-card"
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={program.imageUrl}
                    alt={program.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{program.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {program.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Duration: {program.duration}
                    </span>
                    <Button variant="ghost" size="sm">
                      Learn More
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button size="lg" variant="outline">
              View All Programs
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section
        ref={testimonialsRef}
        className="w-full py-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="container"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            What Our Athletes Say
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="rounded-lg border bg-card p-6"
              >
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating
                          ? "fill-primary text-primary"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
                <blockquote className="mt-4">
                  <p className="text-muted-foreground">"{testimonial.content}"</p>
                </blockquote>
                <div className="mt-4 flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-primary text-primary-foreground">
        <div className="container py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Start Your Journey?
            </h2>
            <p className="mt-6 max-w-[600px] text-lg opacity-90 sm:text-xl">
              Join Arena Sports Academy today and take the first step towards achieving your athletic goals.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="mt-8"
            >
              Register Now
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

const features = [
  {
    title: "Expert Coaching",
    description: "Learn from experienced coaches who have trained professional athletes.",
  },
  {
    title: "Modern Facilities",
    description: "Train in our state-of-the-art facilities with the latest equipment.",
  },
  {
    title: "Personalized Training",
    description: "Get customized training programs tailored to your goals.",
  },
]

const featuredPrograms: Pick<Program, 'id' | 'name' | 'description' | 'duration' | 'imageUrl'>[] = [
  {
    id: "1",
    name: "Elite Training Program",
    description: "Intensive training program designed for athletes aiming to compete at the highest level.",
    duration: "12 weeks",
    imageUrl: "/images/programs/arena-sports-academy-grp.jpg",
  },
  {
    id: "2",
    name: "Youth Development",
    description: "Comprehensive program focusing on fundamental skills and athletic development for young athletes.",
    duration: "16 weeks",
    imageUrl: "/images/programs/arena-sports-academy-grp.jpg",
  },
  {
    id: "3",
    name: "Performance Camp",
    description: "High-intensity camp focusing on strength, speed, and agility improvements.",
    duration: "4 weeks",
    imageUrl: "/images/programs/arena-sports-academy-grp.jpg",
  },
]

const testimonials = [
  {
    name: "Edward Nsamba",
    role: "Professional Athlete",
    content: "The coaching and facilities at Arena Sports Academy are world-class. My performance has improved significantly since joining.",
    rating: 5,
    avatar: "/images/testimonials/Edward-Nsamba.jpg",
  },
  {
    name: "Edward Nsamba",
    role: "Youth Athlete",
    content: "The youth program helped me develop not just as an athlete, but also as a person. The coaches are amazing!",
    rating: 5,
    avatar: "/images/testimonials/Edward-Nsamba.jpg",
  },
  {
    name: "Edward Nsamba",
    role: "College Athlete",
    content: "Thanks to Arena Sports, I secured a college scholarship. The training program prepared me perfectly.",
    rating: 5,
    avatar: "/images/testimonials/Edward-Nsamba.jpg",
  },
]
