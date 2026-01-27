'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Mail, Lock } from 'lucide-react'
import { useEffect, useState } from 'react'

const icons = ['🔧', '🔨', '🪛', '⚙️', '🪚', '🪓', '🔩', '🛠️']

const FloatingIcons = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    // Only runs on client
    setDimensions({ width: window.innerWidth, height: window.innerHeight })

    const handleResize = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight })

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!dimensions.width || !dimensions.height) return null

  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: Math.floor(icons.length * 1.4) }).map((_, i) => {
        const icon = icons[i % icons.length]
        return (
          <motion.div
            key={i}
            className="absolute text-2xl md:text-4xl"
            initial={{
              x: Math.random() * dimensions.width,
              y: Math.random() * dimensions.height,
              opacity: 0.4,
              scale: Math.random() * 1.5 + 0.5,
            }}
            animate={{
              y: [
                Math.random() * dimensions.height,
                Math.random() * dimensions.height,
              ],
              x: [
                Math.random() * dimensions.width,
                Math.random() * dimensions.width,
              ],
              rotate: [0, 360],
              opacity: [0.2, 0.8],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            }}
          >
            {icon}
          </motion.div>
        )
      })}
    </div>
  )
}

const AnimatedBackground = () => {
  return (
    <motion.div
      className="absolute inset-0"
      animate={{
        background: [
          'linear-gradient(to right, #facc15, #f97316, #ef4444)',
          'linear-gradient(to right, #f97316, #ef4444, #facc15)',
          'linear-gradient(to right, #ef4444, #facc15, #f97316)',
        ],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        repeatType: 'mirror',
      }}
    />
  )
}

const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center relative overflow-hidden">
      <AnimatedBackground />
      <FloatingIcons />

      <div className="relative w-full max-w-md rounded-2xl bg-white/90 backdrop-blur-md p-10 shadow-2xl border border-gray-200 z-10">
        <h1 className="mb-8 text-center text-4xl font-extrabold text-gray-900 flex items-center justify-center gap-2">
          RePair
        </h1>

        <form className="space-y-6">
          {/* Email input */}
          <div className="relative flex items-center rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 shadow-sm focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-200">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 text-orange-600">
              <Mail size={18} />
            </div>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="ml-3 flex-1 bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-400"
            />
          </div>

          {/* Password input */}
          <div className="relative flex items-center rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 shadow-sm focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-200">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 text-orange-600">
              <Lock size={18} />
            </div>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="ml-3 flex-1 bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-400"
            />
          </div>

          <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded-lg shadow-lg transition-transform hover:scale-[1.03]">
            Login
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-700">
          Need an account?{' '}
          <a
            href="/register"
            className="text-orange-600 hover:underline font-semibold"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}

export default LoginPage