'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, Calculator, Home, Wallet, Users, Sparkles, ChevronDown, Calendar, LucideIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface NavItem {
    href: string
    label: string
    icon: LucideIcon
    description: string
}

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [hoveredItem, setHoveredItem] = useState<string | null>(null)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navItems: NavItem[] = [
        {
            href: "/home",
            label: "Главная",
            icon: Home,
            description: "Добро пожаловать"
        },
        {
            href: "/calculator",
            label: "Калькулятор",
            icon: Calculator,
            description: "Рассчитайте стоимость"
        },
        {
            href: "/financing",
            label: "Финансирование",
            icon: Wallet,
            description: "Рассрочка 0%"
        },
        {
            href: "/contacts",
            label: "Контакты",
            icon: Users,
            description: "Свяжитесь с нами"
        },
    ]

    const isActive = (path: string) => pathname === path

    return (
        <div className='mb-20'>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-white/20'
                    : 'bg-white/90 backdrop-blur-md border-b border-gray-200/50'
                    }`}
            >
                {/* Top Banner */}
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-center py-2 text-sm">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                <span>Акция: Бесплатный дизайн-проект при заказе ремонта</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Navigation */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <Link
                            href="/home"
                            className="flex items-center space-x-3 group"
                            onMouseEnter={() => setHoveredItem('logo')}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                                className="relative"
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                                    <span className="text-white font-bold text-2xl">Р</span>
                                </div>
                            </motion.div>
                            <div>
                                <div className="flex items-center gap-1">
                                    <span className="font-bold text-2xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                        РемонтПро
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500">Ремонт квартир под ключ</p>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-1">
                            {navItems.map((item) => {
                                const active = isActive(item.href)
                                return (
                                    // <motion.div
                                    //     key={item.href}
                                    //     onMouseEnter={() => setHoveredItem(item.href)}
                                    //     onMouseLeave={() => setHoveredItem(null)}
                                    //     whileHover={{ y: -2 }}
                                    //     className="relative"
                                    // >
                                        <Link
                                            href={item.href}
                                            className={`group relative px-5 py-3 rounded-xl transition-all duration-300 ${active
                                                ? 'text-orange-600 bg-gradient-to-r from-orange-50 to-red-50'
                                                : 'text-gray-700 hover:text-orange-600'
                                                }`}
                                        >
                                            <div className="flex items-center space-x-2">
                                                <item.icon className={`w-4 h-4 transition-colors ${active ? 'text-orange-600' : 'text-gray-400 group-hover:text-orange-500'
                                                    }`} />
                                                <span className="font-medium">{item.label}</span>
                                                {active && (
                                                    <motion.div
                                                        layoutId="activeTab"
                                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                                                    />
                                                )}
                                            </div>
                                        </Link>
                                    // </motion.div>
                                )
                            })}

                            {/* Call to Action Button */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="ml-4"
                            >
                                <Link
                                    href="/contact"
                                    className="group relative flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                                >
                                    <Phone className="w-4 h-4 relative z-10" />
                                    <span className="relative z-10">Заказать звонок</span>
                                </Link>
                            </motion.div>
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            aria-label="Toggle menu"
                            className="lg:hidden p-3 rounded-xl hover:bg-gray-100 transition-colors relative"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <div className="relative w-6 h-6">
                                {isMenuOpen ? (
                                    <X className="w-6 h-6 text-gray-700" />
                                ) : (
                                    <Menu className="w-6 h-6 text-gray-700" />
                                )}
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.nav
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="lg:hidden bg-white border-t border-gray-200 overflow-hidden"
                        >
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                                <div className="space-y-1">
                                    {navItems.map((item, index) => (
                                        <MobileNavLink
                                            key={item.href}
                                            href={item.href}
                                            label={item.label}
                                            icon={item.icon}
                                            active={isActive(item.href)}
                                            onClick={() => setIsMenuOpen(false)}
                                        />
                                    ))}

                                    <div className="pt-4">
                                        <div className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border border-gray-200">
                                            <div className="flex items-center space-x-3 mb-3">
                                                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                                                    <Phone className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">Бесплатная консультация</p>
                                                    <p className="text-sm text-gray-600">Перезвоним за 15 минут</p>
                                                </div>
                                            </div>
                                            <Link
                                                href="/contact"
                                                onClick={() => setIsMenuOpen(false)}
                                                className="block w-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
                                            >
                                                Заказать звонок
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </motion.header>

            {/* Floating Action Button for Mobile */}
            <div className="fixed bottom-6 right-6 lg:hidden z-40">
                <Link
                    href="/contact"
                    className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300"
                >
                    <Phone className="w-6 h-6" />
                </Link>
            </div>
        </div>
    )
}

export default Navbar

interface MobileNavLinkProps {
    href: string
    label: string
    icon: LucideIcon
    active: boolean
    onClick: () => void
}

function MobileNavLink({ href, label, icon: Icon, active, onClick }: MobileNavLinkProps) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`flex items-center space-x-3 px-4 py-4 rounded-xl transition-all ${active
                ? 'bg-gradient-to-r from-orange-50 to-red-50 text-orange-600 border-l-4 border-orange-500'
                : 'text-gray-700 hover:bg-gray-50'
                }`}
        >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${active ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gray-100'
                }`}>
                <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-gray-600'}`} />
            </div>
            <div className="flex-1">
                <span className="font-medium block">{label}</span>
                <span className={`text-xs ${active ? 'text-orange-500' : 'text-gray-500'}`}>
                    {active ? 'Текущая страница' : 'Перейти'}
                </span>
            </div>
        </Link>
    )
}