"use client"

import { motion } from "framer-motion"
import { Map, Wallet, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Map,
    title: "Curated Itineraries",
    description: "Expertly designed travel plans crafted by experienced travel consultants who understand every destination's hidden gems.",
  },
  {
    icon: Wallet,
    title: "Tailored Budgets",
    description: "From backpacker adventures to luxury escapes, we create perfect itineraries that respect your financial preferences.",
  },
  {
    icon: Sparkles,
    title: "Seamless Experience",
    description: "Every detail meticulously planned so you can focus on creating memories, not managing logistics.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

export function FeaturesSection() {
  return (
    <section className="relative py-20 md:py-28 bg-secondary/55 dark:bg-[#10243a]">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground dark:text-white mb-4">
            The Atlas Prime Experience
          </h2>
          <div className="mx-auto mb-6 h-1 w-28 rounded-full bg-accent" />
          <p className="text-muted-foreground dark:text-white/70 max-w-2xl mx-auto text-pretty">
            With decades of combined experience, we bring together expertise, passion, 
            and attention to detail to create journeys that exceed expectations.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <Card className="h-full bg-card/85 dark:bg-white/4 border-border dark:border-white/8 hover:shadow-lg hover:shadow-black/20 transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-primary/12 dark:bg-primary/20 flex items-center justify-center mb-6">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground dark:text-white/65 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
