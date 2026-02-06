"use client";

import Link from "next/link";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  Clock,
  Shield,
  Wallet,
  Home,
  Users,
  Hammer,
  FileText,
  Sparkles,
  Award,
  TrendingUp,
  Star,
  ChevronDown,
  Play,
  Zap,
  Target,
  Globe,
  Calculator,
} from "lucide-react";

import { Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

// Simplified floating animation
const floatingAnimation = {
  y: [0, -5, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export default function HomePage() {
  const [activeStats, setActiveStats] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [serviceFilter, setServiceFilter] = useState("all");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-orange-50/30 to-gray-100 overflow-hidden">
      {/* Reduced background animations */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, 50, 0],
              y: [0, 25, 0],
              rotate: [0, 180],
            }}
            transition={{
              duration: 30 + i * 10,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute w-64 h-64 bg-gradient-to-r from-orange-200/10 to-red-200/10 rounded-full blur-3xl"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 20}%`,
            }}
          />
        ))}
      </div>

      {/* HERO - Simplified animations */}
      <section className="relative py-16 md:py-28 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="space-y-8 relative"
          >
            {/* Static badge instead of animated */}
            <div className="inline-flex items-center bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Лидер рынка с 2012 года
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Ремонт без забот —{" "}
              <span className="relative">
                <span className="text-orange-600">мы всё сделаем</span>
                <div className="absolute -top-6 -right-6">
                  <Zap className="w-8 h-8 text-yellow-500" />
                </div>
              </span>{" "}
              за вас
            </h1>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Онлайн-расчёт ремонта за 2 минуты. Профессиональный подход,
              фиксированные цены и гарантия качества.
            </p>

            {/* Static stats without animations */}
            <div className="grid grid-cols-3 gap-4 py-6">
              {[
                {
                  value: "500+",
                  label: "Проектов",
                  icon: <Target className="w-5 h-5" />,
                },
                {
                  value: "10 лет",
                  label: "Опыта",
                  icon: <Award className="w-5 h-5" />,
                },
                {
                  value: "98%",
                  label: "Довольных клиентов",
                  icon: <TrendingUp className="w-5 h-5" />,
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 text-center hover:scale-[1.02] transition-transform duration-200"
                >
                  <div className="text-orange-500 mb-2 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/calculator"
                className="group relative inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 shadow-md"
              >
                <Home className="w-5 h-5 mr-2" />
                Рассчитать стоимость
              </Link>
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center bg-white text-gray-800 border border-gray-300 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
              >
                <Users className="w-5 h-5 mr-2" />
                Бесплатная консультация
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-4 pt-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-sm text-gray-600">
                  Официальная гарантия
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm text-gray-600">
                  Работа по договору
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="relative"
          >
            {/* Static image without 3D effect */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1592401526914-7e5d94a8d6fa?w=1200&q=80"
                alt="Современный интерьер после ремонта"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

              <button
                onClick={() => setVideoPlaying(true)}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform"
              >
                <Play className="w-8 h-8 text-orange-600 ml-1" />
              </button>
            </div>

            {/* Static floating cards */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl max-w-xs border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-full">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Более 500+</p>
                  <p className="text-sm text-gray-600">Успешных проектов</p>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-2xl shadow-2xl max-w-xs">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold">Премия 2024</p>
                  <p className="text-sm opacity-90">Лучший ремонт года</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES - Reduced animations */}
      <section className="py-16 md:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-semibold text-orange-700">
                Наши преимущества
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Почему выбирают{" "}
              <span className="text-gradient bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                именно нас
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Мы сочетаем современные технологии с проверенными временем
              подходами
            </p>
          </div>

          <div className="relative">
            {/* Interactive toggle */}
            <div className="flex justify-center mb-8">
              <div className="bg-gray-100 p-1 rounded-2xl inline-flex">
                {["Основные", "Дополнительные", "Эксклюзив"].map(
                  (tab, index) => (
                    <button
                      key={tab}
                      onClick={() => setActiveStats(index)}
                      className={`px-6 py-2 rounded-xl font-medium transition-all ${
                        activeStats === index
                          ? "bg-white text-orange-600 shadow-md"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {tab}
                    </button>
                  ),
                )}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              <Feature
                icon={CheckCircle}
                title="Удобство"
                text="Онлайн-калькулятор и личный кабинет для отслеживания ремонта"
                color="orange"
                highlight={activeStats === 0}
              />
              <Feature
                icon={Shield}
                title="Гарантия"
                text="До 3 лет на все работы и 1 год на материалы"
                color="blue"
                highlight={activeStats === 0}
              />
              <Feature
                icon={Wallet}
                title="Прозрачность"
                text="Фиксированная цена в договоре, без скрытых платежей"
                color="green"
                highlight={activeStats === 0}
              />
              <Feature
                icon={Clock}
                title="Сроки"
                text="Четкое соблюдение графика работ с ежедневными отчетами"
                color="purple"
                highlight={activeStats === 0}
              />
            </div>

            {/* Static progress bar */}
            <div className="mt-12 max-w-2xl mx-auto">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Уровень удовлетворенности клиентов
                </span>
                <span className="text-sm font-bold text-orange-600">98%</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full w-[98%]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT - Static timeline */}
      <section className="py-16 md:py-20 bg-white relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <span className="inline-flex items-center px-4 py-1 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 rounded-full text-sm font-semibold mb-4">
                  <Award className="w-4 h-4 mr-2" />О компании
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Профессионалы{" "}
                  <span className="text-gradient bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    с душой
                  </span>
                </h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                Мы профессиональная команда с{" "}
                <span className="font-semibold text-orange-600">
                  опытом более 10 лет
                </span>{" "}
                в ремонте квартир и домов. Каждый проект для нас — это
                возможность создать что-то особенное.
              </p>

              {/* Static timeline */}
              <div className="space-y-4 mt-8">
                {[
                  { year: "2012", event: "Основание компании" },
                  { year: "2015", event: "500+ выполненных проектов" },
                  { year: "2019", event: "Открытие филиалов" },
                  { year: "2024", event: "Премия 'Лучший ремонт'" },
                ].map((item, index) => (
                  <div key={item.year} className="flex items-center group">
                    <div className="w-16 flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                        {item.year}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="h-px w-8 bg-gray-300" />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-gray-900">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 p-1 rounded-full mt-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-gray-600">
                    Работаем по официальному договору
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 p-1 rounded-full mt-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-gray-600">
                    Соблюдаем сроки и фиксируем цену заранее
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 p-1 rounded-full mt-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-gray-600">
                    Используем только качественные материалы
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Static image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80"
                  alt="Наша команда мастеров"
                  className="w-full h-[400px] object-cover"
                />
              </div>

              {/* Static stats */}
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-orange-500 to-red-500 text-white p-8 rounded-2xl shadow-2xl max-w-xs">
                <div className="text-center">
                  <p className="text-5xl font-bold mb-2">10+</p>
                  <p className="text-sm opacity-90">Лет успешной работы</p>
                </div>
              </div>

              {/* Static location */}
              <div className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-xl">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <Globe className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">3 филиала</p>
                    <p className="text-xs text-gray-600">по всему городу</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES - Optimized */}
      <section className="py-16 md:py-24 relative z-10 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">
                Полный спектр услуг
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Премиальные услуги по
              <span className="block text-gradient bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                ремонту квартир
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              От косметического обновления до дизайнерского ремонта под ключ
            </p>
          </div>

          {/* Service Tabs */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                { id: "cosmetic", label: "Косметический", color: "blue" },
                { id: "capital", label: "Капитальный", color: "orange" },
                { id: "designer", label: "Дизайнерский", color: "purple" },
                { id: "all", label: "Все услуги", color: "green" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    serviceFilter === tab.id
                      ? tab.id === "blue"
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                        : tab.id === "orange"
                          ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                          : tab.id === "purple"
                            ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg"
                            : "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setServiceFilter(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="relative grid md:grid-cols-3 gap-8">
            {[
              {
                id: "cosmetic",
                title: "Косметический ремонт",
                description:
                  "Быстрое и качественное обновление интерьера без капитальных изменений",
                img: "1600585154340-be6161a56a0c",
                price: "от 2 500 ₽/м²",
                features: [
                  "Покраска стен и потолков",
                  "Замена напольных покрытий",
                  "Обновление освещения",
                  "Замена розеток и выключателей",
                  "Установка плинтусов",
                ],
                duration: "2-4 недели",
                color: "blue",
                badge: "Самое популярное",
              },
              {
                id: "capital",
                title: "Капитальный ремонт",
                description:
                  "Полная перепланировка с заменой всех инженерных систем",
                img: "1581092160562-40aa08e78837",
                price: "от 4 500 ₽/м²",
                features: [
                  "Демонтаж перегородок",
                  "Замена всей электропроводки",
                  "Установка новой сантехники",
                  "Выравнивание стен и потолков",
                  "Монтаж чистовых покрытий",
                ],
                duration: "1.5-3 месяца",
                color: "orange",
                badge: "Комплексный подход",
                featured: true,
              },
              {
                id: "designer",
                title: "Дизайнерский ремонт",
                description:
                  "Эксклюзивный проект с авторским надзором и премиальными материалами",
                img: "1615874959474-d609969a20ed",
                price: "от 7 500 ₽/м²",
                features: [
                  "Разработка 3D-визуализации",
                  "Авторский надзор на всех этапах",
                  "Эксклюзивные материалы и технологии",
                  "Индивидуальное проектирование",
                  "Полная меблировка",
                ],
                duration: "2-6 месяцев",
                color: "purple",
                badge: "Премиум уровень",
              },
            ]
              .filter(
                (service) =>
                  serviceFilter === "all" || serviceFilter === service.id,
              )
              .map((service, index) => (
                <div
                  key={index}
                  className={`relative ${service.featured ? "md:-mt-8 md:mb-8" : ""}`}
                >
                  <div
                    className={`relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-200 ${
                      service.featured
                        ? "ring-4 ring-orange-500/50 bg-gradient-to-br from-white to-orange-50"
                        : "bg-white"
                    }`}
                  >
                    {/* Image Section */}
                    <div className="relative h-60 overflow-hidden">
                      <img
                        src={`https://images.unsplash.com/photo-${service.img}?w=800&q=80`}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      <div className="absolute top-4 right-4 bg-white/95 px-4 py-2 rounded-full shadow-lg">
                        <span className="font-bold text-gray-900">
                          {service.price}
                        </span>
                      </div>

                      <div className="absolute top-4 left-4 bg-black/80 px-3 py-1.5 rounded-full">
                        <div className="flex items-center text-white text-sm">
                          <Clock className="w-3 h-3 mr-1.5" />
                          {service.duration}
                        </div>
                      </div>

                      <div className="absolute bottom-4 left-4">
                        <div
                          className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
                            service.color === "blue"
                              ? "bg-blue-500/90 text-white"
                              : service.color === "orange"
                                ? "bg-orange-500/90 text-white"
                                : "bg-purple-500/90 text-white"
                          }`}
                        >
                          {service.badge}
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 md:p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                            {service.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4">
                            {service.description}
                          </p>
                        </div>
                        {service.featured && (
                          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            ЛУЧШЕЕ
                          </div>
                        )}
                      </div>

                      {/* Features List */}
                      <div className="space-y-3 mb-6">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-center">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </div>
                            <span className="text-gray-700 text-sm">
                              {feature}
                            </span>
                          </div>
                        ))}
                        {service.features.length > 3 && (
                          <div className="text-center pt-2">
                            <span className="text-gray-500 text-sm">
                              + ещё {service.features.length - 3} пунктов
                            </span>
                          </div>
                        )}
                      </div>

                      {/* CTA Button */}
                      <div className="space-y-4">
                        <Link
                          href={`/services/${service.title.toLowerCase().replace(/ /g, "-")}`}
                          className={`block text-center py-3 rounded-xl font-semibold transition-all duration-200 ${
                            service.featured
                              ? "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg"
                              : service.color === "blue"
                                ? "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-200"
                                : service.color === "orange"
                                  ? "bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 hover:bg-gradient-to-r hover:from-orange-100 hover:to-orange-200"
                                  : "bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 hover:bg-gradient-to-r hover:from-purple-100 hover:to-purple-200"
                          }`}
                        >
                          Подробнее об услуге
                        </Link>

                        <button className="w-full border-2 border-gray-300 text-gray-700 py-2.5 rounded-xl font-medium hover:border-gray-400 hover:bg-gray-50 transition-colors flex items-center justify-center">
                          <Calculator className="w-4 h-4 mr-2" />
                          Рассчитать стоимость
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* INCLUDED - Static */}
      <section className="py-16 md:py-20 bg-white relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Что{" "}
              <span className="text-gradient bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                входит
              </span>{" "}
              в стоимость
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Комплексный подход для вашего спокойствия
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <Include
              icon={Hammer}
              title="Материалы"
              text="Подбор, закупка и доставка качественных материалов от проверенных поставщиков"
              stats="150+ поставщиков"
            />
            <Include
              icon={Users}
              title="Работы"
              text="Все этапы ремонта под ключ от демонтажа до уборки"
              stats="15+ специалистов"
            />
            <Include
              icon={FileText}
              title="Контроль"
              text="Ежедневный контроль качества и фотоотчеты от прораба"
              stats="24/7 поддержка"
            />
          </div>

          {/* Static counter */}
          <div className="mt-12 bg-gradient-to-r from-gray-50 to-white rounded-3xl p-8 shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  value: "1500+",
                  label: "Счастливых клиентов",
                  color: "text-orange-600",
                },
                {
                  value: "98%",
                  label: "Рекомендаций",
                  color: "text-green-600",
                },
                {
                  value: "24ч",
                  label: "Средний ответ",
                  color: "text-blue-600",
                },
                { value: "5.0", label: "Рейтинг", color: "text-purple-600" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div
                    className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO - Static */}
      <section className="py-16 md:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Наши{" "}
              <span className="text-gradient bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                работы
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Реализованные проекты, которые говорят сами за себя
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Work
              img="1600607687939-ce8a6c25118c"
              title="Квартира в стиле лофт"
              area="65 м²"
              time="45 дней"
              price="850 000 ₽"
            />
            <Work
              img="1600210492493-0946911123ea"
              title="Современная кухня-гостиная"
              area="42 м²"
              time="30 дней"
              price="520 000 ₽"
              featured
            />
            <Work
              img="1595526114035-0d45ed16cfbf"
              title="Скандинавская спальня"
              area="28 м²"
              time="25 дней"
              price="350 000 ₽"
            />
          </div>

          <div className="text-center mt-12">
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-200"
            >
              Смотреть все проекты
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ - Static */}
      <section className="py-16 md:py-20 bg-white relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Часто задаваемые{" "}
              <span className="text-gradient bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                вопросы
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Ответы на самые популярные вопросы о ремонте
            </p>
          </div>

          <div className="space-y-4">
            <Faq
              q="Сколько длится ремонт?"
              a="Сроки зависят от сложности и объема работ. В среднем косметический ремонт занимает 2-4 недели, капитальный — 1.5-3 месяца."
              number="01"
            />
            <Faq
              q="Вы работаете по договору?"
              a="Да, мы заключаем официальный договор с фиксированной сметой, сроками и гарантийными обязательствами."
              number="02"
            />
            <Faq
              q="Можно ли изменить проект во время ремонта?"
              a="Да, любые изменения согласуются с прорабом и фиксируются в дополнительном соглашении к договору."
              number="03"
            />
            <Faq
              q="Кто закупает материалы?"
              a="Мы можем организовать полную закупку и доставку материалов, либо работать с вашими материалами — как вам удобнее."
              number="04"
            />
          </div>
        </div>
      </section>

      {/* CTA - Static */}
      <section className="py-16 md:py-24 relative z-10">
        <div className="relative bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white rounded-3xl max-w-6xl mx-auto px-8 py-12 md:py-16 text-center shadow-2xl">
          <div className="relative max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full backdrop-blur-sm mb-6">
              <Zap className="w-10 h-10" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Готовы начать{" "}
              <span className="text-yellow-300">ремонт мечты</span>?
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Получите точный расчет стоимости за 2 минуты
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/calculator"
                className="inline-flex items-center justify-center bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 shadow-md"
              >
                Рассчитать стоимость
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-200"
              >
                Заказать звонок
              </Link>
            </div>
            <p className="text-sm mt-6 opacity-75">
              Или позвоните нам:{" "}
              <span className="font-semibold">8 (800) 123-45-67</span>
            </p>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {videoPlaying && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setVideoPlaying(false)}
          >
            <div
              className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setVideoPlaying(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                ×
              </button>
              <div className="aspect-video bg-gray-900 flex items-center justify-center">
                <div className="text-white text-center">
                  <Play className="w-20 h-20 mx-auto mb-4 opacity-50" />
                  <p>Видео о нашей работе</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* STATIC COMPONENTS */

const Feature = ({
  icon: Icon,
  title,
  text,
  color: colorProp,
  highlight,
}: any) => {
  type Color = "orange" | "blue" | "green" | "purple";

  const colorClasses: Record<Color, string> = {
    orange: "bg-orange-500 text-white",
    blue: "bg-blue-500 text-white",
    green: "bg-green-500 text-white",
    purple: "bg-purple-500 text-white",
  };

  const color: Color = (colorProp as Color) || "orange";

  return (
    <div
      className={`relative bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 border ${highlight ? "border-orange-200" : "border-gray-100"}`}
    >
      {highlight && (
        <div className="absolute -top-3 -right-3">
          <Sparkles className="w-6 h-6 text-yellow-500" />
        </div>
      )}
      <div
        className={`w-12 h-12 ${colorClasses[color] || colorClasses.orange} rounded-xl flex items-center justify-center mb-6`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="font-semibold text-xl text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{text}</p>
    </div>
  );
};

const Include = ({ icon: Icon, title, text, stats }: any) => (
  <div className="relative p-6 md:p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200">
    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h3 className="font-semibold text-xl text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed mb-4">{text}</p>
    {stats && (
      <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 rounded-full">
        <span className="text-sm font-medium text-orange-700">{stats}</span>
      </div>
    )}
  </div>
);

const Work = ({ img, title, area, time, price, featured }: any) => (
  <div className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-200">
    {featured && (
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
          Хит сезона
        </div>
      </div>
    )}
    <div className="relative h-64 md:h-72 overflow-hidden">
      <img
        src={`https://images.unsplash.com/photo-${img}?w=800&q=80`}
        className="w-full h-full object-cover"
        alt={title}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <div className="flex items-center space-x-4 text-sm opacity-90">
        <span className="flex items-center">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          {area}
        </span>
        <span className="flex items-center">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {time}
        </span>
      </div>
    </div>
  </div>
);

const Faq = ({ q, a, number }: any) => (
  <div className="bg-gradient-to-r from-white to-gray-50 p-6 rounded-2xl shadow-md border border-gray-200 hover:border-gray-300 transition-all duration-200 cursor-pointer">
    <div className="flex items-start">
      {number && (
        <div className="w-10 h-10 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
          <span className="font-bold text-orange-600">{number}</span>
        </div>
      )}
      <div className="flex-1">
        <h3 className="font-semibold text-lg text-gray-900 mb-3">{q}</h3>
        <p className="text-gray-600 leading-relaxed">{a}</p>
      </div>
      <ChevronDown className="w-5 h-5 text-gray-400 ml-4" />
    </div>
  </div>
);
