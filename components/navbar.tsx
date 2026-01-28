'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const pathname = usePathname()

    const isActive = (path: string) => pathname === path

    return (
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">Р</span>
                        </div>
                        <span className="font-bold text-xl text-gray-900">РемонтПро</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        <NavLink href="/" label="Главная" active={isActive('/')} />
                        <NavLink href="/calculator" label="Калькулятор" active={isActive('/calculator')} />
                        <NavLink href="/financing" label="Финансирование" active={isActive('/financing')} />
                        <NavLink href="/contacts" label="Контакты" active={isActive('/contacts')} />
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        aria-label="Toggle menu"
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <nav className="md:hidden py-4 space-y-2">
                        <MobileNavLink href="/" label="Главная" active={isActive('/')} onClick={() => setIsMenuOpen(false)} />
                        <MobileNavLink href="/calculator" label="Калькулятор" active={isActive('/calculator')} onClick={() => setIsMenuOpen(false)} />
                        <MobileNavLink href="/financing" label="Финансирование" active={isActive('/financing')} onClick={() => setIsMenuOpen(false)} />
                        <MobileNavLink href="/contacts" label="Контакты" active={isActive('/contacts')} onClick={() => setIsMenuOpen(false)} />
                    </nav>
                )}
            </div>
        </header>
    )
}

export default Navbar

/* 🔹 Helper Components for cleaner code */
function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
    return (
        <Link
            href={href}
            className={`transition-colors ${active ? 'text-orange-600 font-semibold' : 'text-gray-600 hover:text-orange-600'
                }`}
        >
            {label}
        </Link>
    )
}

function MobileNavLink({
    href,
    label,
    active,
    onClick,
}: {
    href: string
    label: string
    active: boolean
    onClick: () => void
}) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`block px-4 py-2 rounded-lg transition-colors ${active ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'
                }`}
        >
            {label}
        </Link>
    )
}