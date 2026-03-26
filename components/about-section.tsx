"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 bg-secondary/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/5 rounded-3xl transform rotate-3 scale-105" />
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80"
                alt="Travel planning"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-56 h-56 rounded-2xl overflow-hidden border-[6px] border-background shadow-2xl hidden md:block hover:scale-105 transition-transform duration-500">
              <Image
                src="https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400&q=80"
                alt="Adventure"
                fill
                className="object-cover"
                sizes="192px"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70 mb-6 tracking-tight">
              Your Journey, Our Expertise
            </h2>
            <div className="mx-auto md:mx-0 mb-8 h-1 w-20 rounded-full bg-primary/40" />
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
              <p>
                At Atlas Prime, we believe every journey should be extraordinary. 
                With roots in traditional travel craftsmanship and an eye for modern convenience, 
                we create travel experiences that resonate with your personal aspirations.
              </p>
              <p>
                Our team of seasoned travel consultants brings together local knowledge, 
                cultural insights, and logistical expertise to ensure every moment of your 
                trip is thoughtfully planned and flawlessly executed.
              </p>
              <p>
                Whether you seek adventure in remote landscapes, relaxation on pristine beaches, 
                or cultural immersion in historic cities, Atlas Prime transforms your travel 
                dreams into cherished memories.
              </p>
            </div>
            <Link href="/plan">
              <Button size="lg" className="font-medium">
                Start Planning Your Trip
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
