'use client'

import { useState } from 'react'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface RepairStyle {
  id: string
  name: string
  description: string
  pricePerSqm: number
  image: string
}

const repairStyles: RepairStyle[] = [
  {
    id: 'modern',
    name: 'Современный',
    description: 'Лаконичный дизайн с актуальными материалами и технологиями',
    pricePerSqm: 15000,
    image: 'https://images.unsplash.com/photo-1664372623516-0b1540d6771e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
  },
  {
    id: 'classic',
    name: 'Классический',
    description: 'Элегантность и изысканность с качественными материалами',
    pricePerSqm: 18000,
    image: 'https://images.unsplash.com/photo-1594296220371-a34da13ff6d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
  },
  {
    id: 'minimalism',
    name: 'Минимализм',
    description: 'Простота, функциональность и максимум свободного пространства',
    pricePerSqm: 13000,
    image: 'https://images.unsplash.com/photo-1704428381527-71b82d7fc7d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
  },
  {
    id: 'budget',
    name: 'Бюджетный',
    description: 'Качественный ремонт по доступной цене с оптимальными решениями',
    pricePerSqm: 8000,
    image: 'https://images.unsplash.com/photo-1739430514990-a2896a43786a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
  },
]

export default function HomePage() {
  const [display, setDisplay] = useState('')
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
  const [showResults, setShowResults] = useState(false)

  const selectedStyleData = repairStyles.find((s) => s.id === selectedStyle)
  const totalCost =
    selectedStyleData && display
      ? parseFloat(display) * selectedStyleData.pricePerSqm
      : 0
  const estimatedDays = display ? Math.ceil(parseFloat(display) / 10) * 7 : 0

  const handleButton = (value: string) => {
    if (value === 'C') {
      setDisplay('')
      setShowResults(false)
    } else if (value === '=') {
      setShowResults(true)
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      setDisplay((prev) => prev + value)
    }
  }

  const buttons = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['0', 'C', '='],
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-red-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
          Калькулятор ремонта вашей мечты
        </h1>
        <p className="text-lg md:text-2xl text-gray-700">
          Введите площадь дома, выберите стиль и получите точную смету на нашем реалистичном калькуляторе
        </p>
      </div>

      {/* Calculator & Style Selection */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Digital Calculator */}
        <div className="bg-gray-900 rounded-3xl shadow-2xl p-6 flex flex-col items-center">
          <div className="bg-black text-green-400 font-mono text-4xl md:text-5xl h-20 md:h-24 w-full flex items-center justify-end px-6 rounded-xl mb-6 shadow-inner">
            {display || '0'}
          </div>
          <div className="grid grid-cols-3 gap-4 w-full">
            {buttons.flat().map((btn) => (
              <motion.button
                key={btn}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleButton(btn)}
                className={`bg-gray-700 text-white font-bold text-2xl md:text-3xl py-6 rounded-full shadow-lg hover:bg-gray-600 transition`}
              >
                {btn}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Style Selection */}
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center lg:text-left">
            Выберите стиль ремонта
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {repairStyles.map((style) => (
              <motion.div
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer border-2 transition-all ${selectedStyle === style.id ? 'border-red-500' : 'border-transparent'
                  }`}
              >
                <img
                  src={style.image}
                  alt={style.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-xl text-gray-900 mb-1">{style.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{style.description}</p>
                  <span className="text-red-500 font-bold">{style.pricePerSqm.toLocaleString('ru-RU')} сом/м²</span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowResults(true)}
              disabled={!display || !selectedStyle}
              className="bg-red-500 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-xl transition"
            >
              Рассчитать смету
            </motion.button>
          </div>
        </div>
      </div>

      {/* Results */}
      {showResults && selectedStyleData && (
        <section
          id="results"
          className="max-w-5xl mx-auto mt-16 bg-gradient-to-r from-red-100 via-orange-50 to-yellow-50 rounded-3xl shadow-2xl p-8"
        >
          <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Ваша смета</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <p className="text-gray-600">Площадь</p>
              <p className="text-2xl font-bold">{display} м²</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <p className="text-gray-600">Стиль</p>
              <p className="text-2xl font-bold">{selectedStyleData.name}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <p className="text-gray-600">Стоимость</p>
              <p className="text-3xl font-bold text-red-500">{totalCost.toLocaleString('ru-RU')} сом.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <p className="text-gray-600">Срок выполнения</p>
              <p className="text-2xl font-bold">{estimatedDays} дней</p>
            </div>
          </div>

          <div className="bg-red-500 text-white p-6 rounded-2xl mb-6">
            <h3 className="font-semibold text-xl mb-3">Что входит:</h3>
            <ul className="space-y-2">
              <li className="flex items-center"><CheckCircle className="w-5 h-5 mr-2" />Материалы и расходники</li>
              <li className="flex items-center"><CheckCircle className="w-5 h-5 mr-2" />Работа профессиональной бригады</li>
              <li className="flex items-center"><CheckCircle className="w-5 h-5 mr-2" />Вывоз мусора</li>
              <li className="flex items-center"><CheckCircle className="w-5 h-5 mr-2" />Гарантия 3 года</li>
            </ul>
          </div>
        </section>
      )}
    </div>
  )
}
