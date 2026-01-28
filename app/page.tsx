'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Mail, Lock } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Card, CardHeader, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { ShineBorder } from '@/components/ui/shine-border'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import AnimatedTitle from '@/components/textx'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { loginUser } from '@/lib copy/features/log/logapi'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const instruments = ['🔧', '🔨', '⚙️', '🛠️', '🔩', '🪛', '🪚']

const AnimatedBackground = () => (
  <motion.div
    className="absolute inset-0"
    style={{
      background: "linear-gradient(120deg, #fde68a, #fb923c, #f87171)",
      backgroundSize: "200% 200%",
    }}
    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
  />
)

const FloatingInstruments = () => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 18 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 18 })
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
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

  if (!items.length) return null

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ x: springX, y: springY }}
    >
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl sm:text-3xl opacity-30"
          style={{ left: `${item.x}%`, top: `${item.y}%`, scale: item.size }}
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

interface IFormInput {
  username: string
  password: string
}

const LoginPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { register, handleSubmit } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const resultAction = await dispatch(loginUser(data))

    if (loginUser.fulfilled.match(resultAction)) {
      toast.success("Login successful 🎉")
      router.push('/home')
    } else {
      toast.error("Invalid name or password ❌")
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 sm:px-6 bg-gradient-to-br from-orange-100 via-red-100 to-pink-100">
      <AnimatedBackground />
      <FloatingInstruments />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative w-full max-w-[380px] z-10"
      >
        <Card className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-white/90 backdrop-blur-md shadow-2xl border border-white/40">
          <ShineBorder className="border-[4px]" shineColor={["#fde68a", "#fb923c", "#f87171"]} />

          <CardHeader className="text-center">
            <AnimatedTitle />
            <CardDescription className="mt-2 text-sm text-gray-600">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name input */}
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <div className="flex items-center gap-3 rounded-xl border bg-gray-50 px-3 py-2 sm:px-4 sm:py-3 focus-within:ring-2 focus-within:ring-orange-300">
                  <Mail size={18} className="text-orange-500" />
                  <input
                    {...register("username")}
                    id="name"
                    type="text"
                    placeholder="Your name"
                    className="flex-1 bg-transparent outline-none text-gray-800 text-sm sm:text-base border-none"
                  />
                </div>
              </div>

              {/* Password input */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="flex items-center gap-3 rounded-xl border bg-gray-50 px-3 py-2 sm:px-4 sm:py-3 focus-within:ring-2 focus-within:ring-orange-300">
                  <Lock size={18} className="text-orange-500" />
                  <input
                    {...register("password")}
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="flex-1 bg-transparent outline-none text-gray-800 text-sm sm:text-base border-none"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-red-500 py-2 sm:py-3 font-semibold text-white shadow-md hover:scale-[1.02] transition text-sm sm:text-base"
              >
                Login
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <p className="text-center text-xs sm:text-sm text-gray-700">
              Need an account?{' '}
              <Link href="/register" className="font-semibold text-orange-600 hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

export default LoginPage