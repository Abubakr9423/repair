"use client";

import Link from "next/link";
import React from "react";
import { motion, Variants } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
  ChevronRight,
  Sparkles,
  Shield,
  Award,
  Wallet,
  Home,
  Calculator,
  TrendingUp,
  Users,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  // animations.ts

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  const floatingAnimation: Variants = {
    initial: { y: 0 },
    animate: {
      y: [0, -20, 0],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const scaleUp: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-50 to-white border-t border-gray-200/50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-orange-200/20 to-red-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Brand Section */}
          <motion.div variants={fadeUp} className="lg:col-span-4">
            <div className="mb-6">
              <Link
                href="/"
                className="inline-flex items-center space-x-3 group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <span className="text-white font-bold text-3xl">Р</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full" />
                </motion.div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-2xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      РемонтПро
                    </span>
                    <Sparkles className="w-4 h-4 text-orange-500" />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Профессиональный ремонт под ключ
                  </p>
                </div>
              </Link>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Создаем уютные и современные пространства с 2012 года. Более 500
              успешных проектов и 98% довольных клиентов.
            </p>

            {/* Trust badges */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Гарантия 3 года</p>
                  <p className="text-sm text-gray-500">На все виды работ</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Премия 2024</p>
                  <p className="text-sm text-gray-500">Лучший ремонт года</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div variants={fadeUp} className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <ChevronRight className="w-4 h-4 mr-2 text-orange-500" />
              Навигация
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Главная", icon: Home },
                { href: "/calculator", label: "Калькулятор", icon: Calculator },
                {
                  href: "/financing",
                  label: "Финансирование",
                  icon: TrendingUp,
                },
                { href: "/contacts", label: "Контакты", icon: Users },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors"
                  >
                    <item.icon className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
                    <span>{item.label}</span>
                    <motion.div
                      initial={{ width: 0 }}
                      whileHover={{ width: 8 }}
                      className="h-0.5 bg-orange-500"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={fadeUp} className="lg:col-span-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <ChevronRight className="w-4 h-4 mr-2 text-orange-500" />
              Контакты
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Телефон</p>
                  <a
                    href="tel:+992931234567"
                    className="text-gray-600 hover:text-orange-600 transition-colors"
                  >
                    +992 93 123 45 67
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <a
                    href="mailto:info@remontpro.tj"
                    className="text-gray-600 hover:text-orange-600 transition-colors"
                  >
                    info@remontpro.tj
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Адрес</p>
                  <p className="text-gray-600">г. Душанбе, ул. Рудаки 25</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-8">
              <p className="font-medium text-gray-900 mb-3">Мы в соцсетях</p>
              <div className="flex space-x-3">
                {[
                  { icon: Facebook, color: "blue", href: "#" },
                  { icon: Instagram, color: "pink", href: "#" },
                  { icon: Youtube, color: "red", href: "#" },
                  { icon: MessageCircle, color: "green", href: "#" },
                ].map((social) => (
                  <motion.a
                    key={social.color}
                    href={social.href}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 bg-${social.color}-50 rounded-lg flex items-center justify-center hover:bg-${social.color}-100 transition-colors`}
                  >
                    <social.icon
                      className={`w-5 h-5 text-${social.color}-600`}
                    />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Working Hours & Newsletter */}
          <motion.div variants={fadeUp} className="lg:col-span-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <ChevronRight className="w-4 h-4 mr-2 text-orange-500" />
              Режим работы
            </h3>
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 border border-gray-200 mb-6">
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Пн-Пт</span>
                    <span className="font-medium text-gray-900">
                      9:00 - 18:00
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Суббота</span>
                    <span className="font-medium text-gray-900">
                      10:00 - 16:00
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Воскресенье</span>
                    <span className="font-medium text-gray-900 text-red-500">
                      Выходной
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center text-sm text-gray-500">
                <p>✉️ Отвечаем на письма 24/7</p>
              </div>
            </div>

            {/* Quick Consultation */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-5 text-white">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold">Быстрая консультация</p>
                  <p className="text-sm opacity-90">Перезвоним за 15 минут</p>
                </div>
              </div>
              <button className="w-full bg-white text-orange-600 py-2.5 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Заказать звонок
              </button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-gray-200/50 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-600 text-sm">
              <p>© {currentYear} РемонтПро. Все права защищены.</p>
              <p className="mt-1 text-gray-500">
                ОГРН 1234567890123 • ИНН 1234567890
              </p>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-600 hover:text-orange-600 transition-colors"
              >
                Политика конфиденциальности
              </Link>
              <Link
                href="/terms"
                className="text-gray-600 hover:text-orange-600 transition-colors"
              >
                Пользовательское соглашение
              </Link>
              <Link
                href="/sitemap"
                className="text-gray-600 hover:text-orange-600 transition-colors"
              >
                Карта сайта
              </Link>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mt-6 flex justify-center">
            <div className="flex items-center space-x-4 text-gray-400">
              <div className="flex items-center space-x-2">
                <Wallet className="w-4 h-4" />
                <span className="text-sm">Принимаем к оплате:</span>
              </div>
              <div className="flex space-x-2">
                {["💳", "💰", "🏦", "📱"].map((icon, idx) => (
                  <div key={idx} className="text-lg">
                    {icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -3 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.button>
    </footer>
  );
};

export default Footer;
