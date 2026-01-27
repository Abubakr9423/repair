'use client'

import { Button } from '@/components/ui/button'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Mail, Lock } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

/* ---------- Instruments ---------- */
const instruments = ['🔧', '🔨', '⚙️', '🛠️', '🔩', '🪛', '🪚']

/* ---------- Smooth Gradient Background ---------- */
const AnimatedBackground = () => {
  return (
    <motion.div
      className="absolute inset-0"
      style={{
        background: "linear-gradient(120deg, #fde68a, #fb923c, #f87171)",
        backgroundSize: "200% 200%",
      }}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  )
}

/* ---------- Mouse-Reactive Floating Instruments ---------- */
const FloatingInstruments = () => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 40, damping: 18 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 18 })

  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    // Generate random positions/icons only on client
    const generated = Array.from({ length: 12 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.2 + 0.7,
      duration: Math.random() * 18 + 15,
      delay: Math.random() * 5,
      rotate: Math.random() > 0.5 ? 360 : -360,
      icon: instruments[Math.floor(Math.random() * instruments.length)],
    }))
    setItems(generated)

    const move = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 60)
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 60)
    }

    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [mouseX, mouseY])

  if (!items.length) return null // nothing until client generates

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ x: springX, y: springY }}
    >
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl sm:text-3xl opacity-30"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            scale: item.size,
          }}
          animate={{
            y: ['20%', '-120%'],
            rotate: [0, item.rotate],
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {item.icon}
        </motion.div>
      ))}
    </motion.div>
  )
}

/* ---------- Login Page ---------- */
const LoginPage = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 sm:px-6">
      <AnimatedBackground />
      <FloatingInstruments />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-sm sm:max-w-md rounded-2xl sm:rounded-3xl bg-white/85 backdrop-blur-sm p-6 sm:p-10 shadow-2xl border border-white/40"
      >
        <h1 className="mb-6 sm:mb-8 text-center text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
          Re<span className="text-orange-500">Pair</span>
        </h1>

        <form className="space-y-4 sm:space-y-5">
          <div className="flex items-center gap-3 rounded-xl border bg-gray-50 px-3 sm:px-4 py-2 sm:py-3 focus-within:ring-2 focus-within:ring-orange-300">
            <Mail size={18} className="text-orange-500" />
            <input
              type="email"
              placeholder="you@example.com"
              className="flex-1 bg-transparent outline-none text-gray-800 text-sm sm:text-base"
            />
          </div>

          <div className="flex items-center gap-3 rounded-xl border bg-gray-50 px-3 sm:px-4 py-2 sm:py-3 focus-within:ring-2 focus-within:ring-orange-300">
            <Lock size={18} className="text-orange-500" />
            <input
              type="password"
              placeholder="••••••••"
              className="flex-1 bg-transparent outline-none text-gray-800 text-sm sm:text-base"
            />
          </div>

          <Button className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-red-500 py-2 sm:py-3 font-semibold text-white shadow-md hover:scale-[1.02] transition text-sm sm:text-base">
            Login
          </Button>
        </form>

        <p className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-700">
          Need an account?{' '}
          <a href="/register" className="font-semibold text-orange-600 hover:underline">
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  )
}

export default LoginPage