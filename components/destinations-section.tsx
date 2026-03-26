"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { destinations } from "@/lib/mock-data"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export function DestinationsSection() {
  return (
    <section id="destinations" className="py-20 md:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70 mb-5 tracking-tight">
            Featured Destinations
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Explore our handpicked collection of extraordinary destinations, 
            each offering unique experiences and unforgettable memories.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {destinations.map((destination) => (
            <motion.div key={destination.id} variants={itemVariants}>
              <Link href={`/plan?destination=${encodeURIComponent(destination.name + ', ' + destination.country)}`}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl hover:shadow-primary/20"
                >
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
                  
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-serif text-3xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                      {destination.name}
                    </h3>
                    <p className="text-primary-foreground/80 text-sm mb-3">
                      {destination.country}
                    </p>
                    <p className="text-primary-foreground/70 text-sm line-clamp-2 mb-4">
                      {destination.description}
                    </p>
                    <div className="flex items-center gap-2 text-primary font-semibold text-sm opacity-0 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <span>Plan your trip</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
