"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Facebook,
  Instagram,
  MessageCircle,
  Award,
  Users,
  CheckCircle,
  Sparkles,
  Globe,
  Heart,
  Building,
  Shield,
  Map,
  Star,
  ChevronRight,
  MessageSquare,
  Calendar,
  User,
  Coffee,
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
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export default function ContactsPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert("Сообщение отправлено! Мы свяжемся с вами в ближайшее время.");
    setFormData({ name: "", phone: "", message: "" });
    setIsSubmitting(false);
  };

  const contactItems = [
    {
      icon: Phone,
      title: "Телефон",
      lines: ["+992 93 123 4567", "+992 91 987 6543"],
      color: "bg-gradient-to-br from-orange-500 to-red-500",
      button: "Позвонить сейчас",
      action: "tel:+992931234567",
    },
    {
      icon: Mail,
      title: "Email",
      lines: ["info@remontpro.tj", "support@remontpro.tj"],
      color: "bg-gradient-to-br from-red-500 to-pink-500",
      button: "Написать на почту",
      action: "mailto:info@remontpro.tj",
    },
    {
      icon: MapPin,
      title: "Адрес",
      lines: ["Таджикистан, г. Душанбе", "ул. Рудаки, 25"],
      color: "bg-gradient-to-br from-purple-500 to-pink-500",
      button: "Построить маршрут",
      action: "#",
    },
    {
      icon: Clock,
      title: "Режим работы",
      lines: ["Пн-Пт: 9:00 - 18:00", "Сб: 10:00 - 16:00", "Вс: выходной"],
      color: "bg-gradient-to-br from-amber-500 to-orange-500",
      button: "Записаться онлайн",
      action: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-orange-50/50 to-pink-50/50 font-sans text-gray-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-orange-200/20 to-pink-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-red-200/20 to-pink-200/20 rounded-full blur-3xl" />
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-gradient-to-r from-orange-300/10 to-red-300/10 rounded-full blur-xl" />
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-gradient-to-r from-pink-300/10 to-purple-300/10 rounded-full blur-xl" />
      </div>

      {/* Hero Section */}
      <section className="relative py-16 md:py-28 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 blur-xl opacity-50" />
              <div className="relative bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-2xl shadow-2xl">
                <Mail className="w-16 h-16 text-white mx-auto" />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            <Sparkles className="absolute -top-6 -left-6 w-12 h-12 text-orange-400/30 hidden md:block" />
            <Sparkles className="absolute -top-6 -right-6 w-12 h-12 text-red-400/30 hidden md:block" />

            <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent">
              Контакты
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Свяжитесь с нами любым удобным способом. Мы всегда рады помочь!
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-700">
                Онлайн 24/7
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            <StatCard
              icon={Award}
              color="orange"
              number="10+"
              text="лет на рынке"
              delay={0}
            />
            <StatCard
              icon={Users}
              color="red"
              number="500+"
              text="довольных клиентов"
              delay={0.1}
            />
            <StatCard
              icon={CheckCircle}
              color="pink"
              number="100%"
              text="гарантия качества"
              delay={0.2}
            />
            <StatCard
              icon={Calendar}
              color="purple"
              number="24ч"
              text="среднее время ответа"
              delay={0.3}
            />
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
              Контактная информация
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Выберите удобный способ связи или посетите наш офис
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
          >
            {contactItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl opacity-0 group-hover:opacity-10 blur transition-opacity duration-500" />
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-5 md:p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100/50">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <div
                        className={`${item.color} p-3 md:p-4 rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg md:text-xl mb-2">
                          {item.title}
                        </h3>
                        <div className="space-y-1 mb-4">
                          {item.lines.map((line, i) => (
                            <p
                              key={i}
                              className="text-gray-600 text-sm md:text-base"
                            >
                              {line}
                            </p>
                          ))}
                        </div>
                        <a
                          href={item.action}
                          className="inline-flex items-center gap-2 text-sm md:text-base font-medium text-orange-600 hover:text-orange-700 group-hover:gap-3 transition-all"
                        >
                          {item.button}
                          <ChevronRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Social Media */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-10 md:mt-16 text-center"
          >
            <h3 className="text-lg md:text-2xl font-semibold mb-6">
              Мы в социальных сетях
            </h3>
            <div className="flex justify-center gap-3 md:gap-6">
              <SocialButton
                icon={Facebook}
                label="Facebook"
                color="from-blue-500 to-blue-600"
              />
              <SocialButton
                icon={Instagram}
                label="Instagram"
                color="from-pink-500 to-purple-600"
                gradient
              />
              <SocialButton
                icon={MessageCircle}
                label="Telegram"
                color="from-blue-400 to-cyan-500"
              />
              <SocialButton
                icon={MessageSquare}
                label="WhatsApp"
                color="from-green-500 to-emerald-600"
                className="hidden sm:flex"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <Send className="w-8 h-8 text-orange-500" />
              <h2 className="text-2xl md:text-4xl font-bold">Напишите нам</h2>
            </div>
            <p className="text-gray-600 text-sm md:text-base">
              Заполните форму и мы свяжемся с вами в течение 24 часов
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-10 border border-gray-100/50">
              <div className="space-y-5">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Ваше имя *"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 focus:outline-none transition-all placeholder:text-gray-400"
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="Телефон *"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 focus:outline-none transition-all placeholder:text-gray-400"
                  />
                </div>

                <div className="relative">
                  <MessageCircle className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Сообщение *"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 focus:outline-none transition-all placeholder:text-gray-400 resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-xl font-semibold flex justify-center items-center gap-3 shadow-lg transition-all ${
                    isSubmitting
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Отправка...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Отправить сообщение
                    </>
                  )}
                </motion.button>

                <p className="text-center text-gray-500 text-sm">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </div>
            </div>
          </motion.form>
        </div>
      </section>

      {/* Mission & Guarantees */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          >
            <motion.div variants={fadeUp} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8 border border-orange-100/50">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold">Наша миссия</h3>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p className="text-sm md:text-base">
                    Мы стремимся сделать процесс ремонта максимально комфортным
                    и прозрачным для каждого клиента.
                  </p>
                  <p className="text-sm md:text-base">
                    Наша цель — превратить ваш дом в место мечты с
                    использованием современных технологий и качественных
                    материалов.
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-orange-600 font-medium">
                    <Coffee className="w-4 h-4" />
                    <span className="text-sm">Приходите на чашку кофе!</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8 border border-red-100/50">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold">
                    Наши гарантии
                  </h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Фиксированная цена в договоре",
                    "Соблюдение сроков работ",
                    "Гарантия 3 года на все работы",
                    "Профессиональная бригада мастеров",
                    "Бесплатный выезд на замер",
                    "Поэтапная оплата",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-700 text-sm md:text-base">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <MapPin className="w-8 h-8 text-red-500" />
              <h2 className="text-2xl md:text-4xl font-bold">
                Наше расположение
              </h2>
            </div>
            <p className="text-gray-600 text-sm md:text-base">
              Приезжайте к нам в офис для личной консультации
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl overflow-hidden border border-gray-200/50">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                        <Building className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Офис RemontPro</h3>
                        <p className="text-gray-600">Таджикистан, г. Душанбе</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0" />
                        <p className="text-gray-700">ул. Рудаки, 25, 3 этаж</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <p className="text-gray-700">
                          Пн-Пт: 9:00 - 18:00, Сб: 10:00 - 16:00
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-amber-500 flex-shrink-0" />
                        <p className="text-gray-700">Парковка для клиентов</p>
                      </div>
                    </div>
                    <button className="mt-6 w-full md:w-auto px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2">
                      <Map className="w-4 h-4" />
                      Построить маршрут
                    </button>
                  </div>
                  <div className="flex-1 h-64 md:h-80 bg-gradient-to-br from-orange-100 to-pink-100 rounded-xl flex flex-col items-center justify-center p-4">
                    <Map className="w-16 h-16 text-orange-400 mb-4" />
                    <p className="text-gray-600 text-center text-sm md:text-base">
                      Интерактивная карта с маршрутом
                    </p>
                    <div className="mt-4 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full">
                      <span className="text-xs md:text-sm text-gray-700 font-medium">
                        Google Maps • 2GIS • Яндекс.Карты
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Languages & CTA */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <Globe className="w-8 h-8 text-blue-500" />
                <h3 className="text-xl md:text-2xl font-bold">
                  Поддержка языков
                </h3>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4 rounded-xl border border-blue-100 shadow-sm">
                  <span className="text-xl md:text-2xl font-bold text-blue-600">
                    Русский
                  </span>
                  <p className="text-sm text-gray-600 mt-1">Основной язык</p>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 rounded-xl border border-purple-100 shadow-sm">
                  <span className="text-xl md:text-2xl font-bold text-purple-600">
                    Тоҷикӣ
                  </span>
                  <p className="text-sm text-gray-600 mt-1">Родной язык</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-orange-500/10 via-red-500/10 to-pink-500/10 rounded-2xl p-6 md:p-8 border border-orange-100/50">
                <h3 className="text-xl md:text-2xl font-bold mb-4">
                  Нужна консультация?
                </h3>
                <p className="text-gray-600 mb-6 text-sm md:text-base">
                  Оставьте заявку и мы перезвоним вам в течение 15 минут
                </p>
                <button className="inline-flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:shadow-xl transition-all hover:scale-[1.02]">
                  <Phone className="w-5 h-5" />
                  Заказать звонок
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 px-4">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-8 md:p-12 shadow-2xl">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-2xl" />

            <div className="relative z-10">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                Готовы начать ремонт?
              </h2>
              <p className="text-orange-100 mb-8 text-lg md:text-xl">
                Получите бесплатный расчёт стоимости за 30 минут
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all text-lg"
              >
                Рассчитать стоимость
              </motion.button>

              <div className="mt-8 flex flex-wrap justify-center gap-4 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Бесплатный замер
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Гарантия 3 года
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Рассрочка 0%
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

const StatCard = ({ icon: Icon, color, number, text, delay }: any) => (
  <motion.div variants={fadeUp} custom={delay} className="group relative">
    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
    <div className="relative bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50">
      <div className="flex flex-col items-center text-center">
        <div
          className={`p-3 md:p-4 bg-gradient-to-br from-${color}-100 to-${color}-50 rounded-lg md:rounded-xl mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className={`w-6 h-6 md:w-8 md:h-8 text-${color}-600`} />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          {number}
        </h3>
        <p className="text-gray-600 text-sm md:text-base">{text}</p>
      </div>
    </div>
  </motion.div>
);

const SocialButton = ({
  icon: Icon,
  label,
  color,
  gradient = false,
  className = "",
}: any) => (
  <motion.a
    href="#"
    whileHover={{ y: -3 }}
    whileTap={{ scale: 0.95 }}
    className={`relative group ${className}`}
  >
    <div
      className={`absolute inset-0 ${color} rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300`}
    />
    <div
      className={`relative flex items-center gap-2 px-4 py-3 ${gradient ? `bg-gradient-to-br ${color}` : `bg-${color.split(" ")[1]}`} text-white rounded-xl hover:shadow-lg transition-all`}
    >
      <Icon className="w-5 h-5" />
      <span className="text-sm font-medium hidden sm:inline">{label}</span>
    </div>
  </motion.a>
);
