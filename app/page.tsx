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
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { loginUser } from '@/lib copy/features/log/logapi'
import { useAppDispatch } from '@/lib copy/hooks'

const instruments = ['🔧', '🔨', '⚙️', '🛠️', '🔩', '🪛', '🪚']

const AnimatedBackground = () => (
  <motion.div
    className="absolute inset-0"
    style={{
      background: 'linear-gradient(120deg, #fde68a, #fb923c, #f87171)',
      backgroundSize: '200% 200%',
    }}
    animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
  />
)

const FloatingInstruments = () => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 18 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 18 })
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    setItems(
      Array.from({ length: 12 }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.2 + 0.7,
        duration: Math.random() * 18 + 15,
        delay: Math.random() * 5,
        rotate: Math.random() > 0.5 ? 360 : -360,
        icon: instruments[Math.floor(Math.random() * instruments.length)],
      }))
    )

    const move = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 60)
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 60)
    }

    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [mouseX, mouseY])

  return (
    <motion.div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ x: springX, y: springY }}>
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl sm:text-3xl opacity-30"
          style={{ left: `${item.x}%`, top: `${item.y}%`, scale: item.size }}
          animate={{ y: ['20%', '-120%'], rotate: [0, item.rotate] }}
          transition={{ duration: item.duration, delay: item.delay, repeat: Infinity, ease: 'linear' }}
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

export default function LoginPage() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { register, handleSubmit } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const resultAction = await dispatch(loginUser(data))

    if (loginUser.fulfilled.match(resultAction)) {
      toast.success('Login successful 🎉')
      router.push('/home')
    } else {
      toast.error('Invalid name or password ❌')
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-orange-100 via-red-100 to-pink-100">
      <AnimatedBackground />
      <FloatingInstruments />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-[380px]">
        <Card className="relative rounded-3xl bg-white/90 backdrop-blur shadow-2xl">
          <ShineBorder shineColor={['#fde68a', '#fb923c', '#f87171']} />

          <CardHeader className="text-center">
            <AnimatedTitle />
            <CardDescription>Enter your credentials</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <Label>Name</Label>
                <div className="flex items-center gap-3 rounded-xl border bg-gray-50 px-4 py-3">
                  <Mail className="text-orange-500" size={18} />
                  <input {...register('username')} className="flex-1 bg-transparent outline-none" />
                </div>
              </div>

              <div>
                <Label>Password</Label>
                <div className="flex items-center gap-3 rounded-xl border bg-gray-50 px-4 py-3">
                  <Lock className="text-orange-500" size={18} />
                  <input type="password" {...register('password')} className="flex-1 bg-transparent outline-none" />
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500">
                Login
              </Button>
            </form>
          </CardContent>

          <CardFooter className="justify-center text-sm">
            <Link href="/reg" className="text-orange-600 font-semibold hover:underline">
              Create account →
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
