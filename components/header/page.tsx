import Link from "next/link";
import { PhoneIcon, MapPinIcon, ClockIcon } from "../icons";

export default function Header() {
    return (
        <header className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Верхняя панель с контактами */}
                <div className="hidden md:flex items-center justify-between py-2 border-b border-gray-100">
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                            <PhoneIcon className="w-4 h-4" />
                            <a href="tel:+375291829463">+375 29 182-94-63</a>
                        </div>
                        <div className="flex items-center space-x-2">
                            <MapPinIcon className="w-4 h-4" />
                            <span>Минск, пр-т Любимова, 10</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <ClockIcon className="w-4 h-4" />
                            <span>Ежедневно с 12:00</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                            <span className="text-sm text-gray-600">786 отзывов</span>
                            <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-4 h-4 ${i < 3 ? 'text-yellow-400' : 'text-gray-300'}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                                <span className="text-sm font-medium text-gray-900">3.4</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Основная навигация */}
                <div className="flex items-center justify-between py-4">
                    {/* Логотип */}
                    <Link href="/" className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">Б</span>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Батискаф</h1>
                            <p className="text-sm text-gray-600">Ресторан</p>
                        </div>
                    </Link>

                    {/* Навигация */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
                            Главная
                        </Link>
                        <Link href="/menu" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
                            Меню
                        </Link>
                        <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
                            О нас
                        </Link>
                        <Link href="/contacts" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
                            Контакты
                        </Link>
                    </nav>

                    {/* Мобильная кнопка меню */}
                    <div className="md:hidden">
                        <button className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}