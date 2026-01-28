'use client'

import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Clock, Shield, Wallet } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-red-100 to-pink-100">

      {/* HERO */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="text-5xl font-black text-gray-900 mb-6">
              Ремонт без забот — мы всё сделаем за вас
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Онлайн-расчёт ремонта за 2 минуты
            </p>
            <Link
              href="/calculator"
              className="inline-block bg-orange-500 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition"
            >
              Начать ремонт
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="rounded-2xl overflow-hidden shadow-xl h-[400px]"
          >
            <img
              src="https://images.unsplash.com/photo-1592401526914-7e5d94a8d6fa?w=1200&q=70"
              alt="Interior"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 className="text-4xl font-bold text-center mb-16" variants={fadeUp} initial="hidden" whileInView="visible">
            Почему выбирают нас
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-8">
            <Feature icon={CheckCircle} title="Удобство" text="Онлайн-калькулятор" />
            <Feature icon={Shield} title="Гарантия" text="До 3 лет" />
            <Feature icon={Wallet} title="Прозрачность" text="Без скрытых платежей" />
            <Feature icon={Clock} title="Сроки" text="Всегда вовремя" />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible">
            <h2 className="text-4xl font-bold mb-6">О компании</h2>
            <p className="text-gray-700 text-lg mb-4">
              Мы профессиональная команда с опытом более 10 лет в ремонте квартир и домов.
            </p>
            <p className="text-gray-700 text-lg">
              Работаем по договору, соблюдаем сроки и фиксируем цену заранее.
            </p>
          </motion.div>

          <motion.img
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            src="https://cdn.thenewstack.io/media/2023/11/946f598d-team-1024x576.jpg"
            className="rounded-xl shadow-lg"
            alt="Team"
          />
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 className="text-4xl font-bold text-center mb-16" variants={fadeUp} initial="hidden" whileInView="visible">
            Наши услуги
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Service title="Косметический ремонт" img="1600585154340-be6161a56a0c" />
            <Service title="Капитальный ремонт" img="1581092160562-40aa08e78837" />
            <Service title="Дизайнерский ремонт" img="1615874959474-d609969a20ed" />
          </div>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 className="text-4xl font-bold text-center mb-16" variants={fadeUp} initial="hidden" whileInView="visible">
            Что входит в стоимость
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Include title="Материалы" text="Подбор и закупка материалов" />
            <Include title="Работы" text="Все этапы ремонта под ключ" />
            <Include title="Контроль" text="Прораб на объекте ежедневно" />
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 className="text-4xl font-bold text-center mb-16" variants={fadeUp} initial="hidden" whileInView="visible">
            Наши работы
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Work img="1600607687939-ce8a6c25118c" />
            <Work img="1600210492493-0946911123ea" />
            <Work img="1595526114035-0d45ed16cfbf" />
          </div>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="py-20">
        <motion.div className="max-w-4xl mx-auto px-4 text-center" variants={fadeUp} initial="hidden" whileInView="visible">
          <h2 className="text-4xl font-bold mb-6">Наши гарантии</h2>
          <p className="text-gray-700 text-lg">
            Работаем по договору и предоставляем гарантию до 3 лет на все работы.
          </p>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.h2 className="text-4xl font-bold text-center mb-16" variants={fadeUp} initial="hidden" whileInView="visible">
            Часто задаваемые вопросы
          </motion.h2>

          <div className="space-y-6">
            <Faq q="Сколько длится ремонт?" a="В среднем от 30 до 90 дней." />
            <Faq q="Вы работаете по договору?" a="Да, обязательно заключаем договор." />
            <Faq q="Можно ли изменить проект?" a="Да, по согласованию с прорабом." />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <motion.div className="text-center max-w-4xl mx-auto px-4" variants={fadeUp} initial="hidden" whileInView="visible">
          <h2 className="text-4xl font-bold mb-6">Готовы начать ремонт?</h2>
          <Link href="/calculator" className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition inline-block">
            Рассчитать стоимость
          </Link>
        </motion.div>
      </section>

    </div>
  )
}

/* COMPONENTS */

const Feature = ({ icon: Icon, title, text }: any) => (
  <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="bg-white p-6 rounded-xl shadow-md text-center">
    <Icon className="w-10 h-10 text-orange-500 mx-auto mb-4" />
    <h3 className="font-semibold text-xl">{title}</h3>
    <p className="text-gray-600">{text}</p>
  </motion.div>
)

const Service = ({ title, img }: any) => (
  <motion.div whileHover={{ y: -8 }} className="bg-white rounded-xl shadow-lg overflow-hidden">
    <img src={`https://images.unsplash.com/photo-${img}?w=800&q=70`} className="h-48 w-full object-cover" />
    <div className="p-6 text-center font-semibold">{title}</div>
  </motion.div>
)

const Include = ({ title, text }: any) => (
  <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="p-6 bg-white rounded-xl shadow-md text-center">
    <h3 className="font-semibold text-xl mb-2">{title}</h3>
    <p className="text-gray-600">{text}</p>
  </motion.div>
)

const Work = ({ img }: any) => (
  <motion.div whileHover={{ scale: 1.05 }} className="rounded-xl overflow-hidden shadow-lg">
    <img src={`https://images.unsplash.com/photo-${img}?w=800&q=70`} className="h-64 w-full object-cover" />
  </motion.div>
)

const Faq = ({ q, a }: any) => (
  <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="bg-gray-50 p-6 rounded-xl shadow-sm">
    <h3 className="font-semibold text-lg mb-2">{q}</h3>
    <p className="text-gray-600">{a}</p>
  </motion.div>
)
