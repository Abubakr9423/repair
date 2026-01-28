import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-white/90 backdrop-blur-md border-t border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Brand */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">Р</span>
                            </div>
                            <span className="font-bold text-xl text-gray-900">РемонтПро</span>
                        </div>
                        <p className="text-sm text-gray-600">
                            Профессиональный ремонт жилья с прозрачными ценами и гарантией качества
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Навигация</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/" className="hover:text-orange-600 transition">Главная</Link></li>
                            <li><Link href="/calculator" className="hover:text-orange-600 transition">Калькулятор</Link></li>
                            <li><Link href="/financing" className="hover:text-orange-600 transition">Финансирование</Link></li>
                            <li><Link href="/contacts" className="hover:text-orange-600 transition">Контакты</Link></li>
                        </ul>
                    </div>

                    {/* Contacts */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Контакты</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>+992 93 123 4567</li>
                            <li>info@remontpro.tj</li>
                            <li>г. Душанбе, ул. Рудаки 25</li>
                        </ul>
                    </div>

                    {/* Working Hours */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Режим работы</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>Пн-Пт: 9:00 - 18:00</li>
                            <li>Сб: 10:00 - 16:00</li>
                            <li>Вс: выходной</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-500">
                    <p>© 2026 РемонтПро. Все права защищены.</p>
                </div>
            </div>
        </footer>)
}

export default Footer