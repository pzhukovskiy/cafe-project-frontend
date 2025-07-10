import { PhoneIcon, MapPinIcon, ClockIcon, HeartIcon } from "../icons";

export default function Footer() {
    const workingHours = [
        { day: 'Пн', time: '12:00—03:00' },
        { day: 'Вт', time: '12:00—03:00' },
        { day: 'Ср', time: '12:00—03:00' },
        { day: 'Чт', time: '12:00—03:00' },
        { day: 'Пт', time: '13:00—05:00' },
        { day: 'Сб', time: '13:00—05:00' },
        { day: 'Вс', time: '13:00—03:00' },
    ];

    return (
        <footer className="bg-gray-900 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto w-full">
                    {/* Информация о ресторане */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">Б</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Батискаф</h3>
                                <p className="text-gray-400">Ресторан</p>
                            </div>
                        </div>
                        <p className="text-gray-300 mb-4 max-w-md">
                            Добро пожаловать в ресторан "Батискаф" - место, где традиции встречаются с инновациями. 
                            Мы предлагаем изысканную кухню и неповторимую атмосферу для вашего отдыха.
                        </p>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                                <span className="text-sm text-gray-400">786 отзывов</span>
                                <div className="flex items-center space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-4 h-4 ${i < 3 ? 'text-yellow-400' : 'text-gray-600'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                    <span className="text-sm font-medium">3.4</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Время работы */}
                    <div className="w-full max-w-none">
                        <h4 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                            <ClockIcon className="w-5 h-5" />
                            <span>Время работы</span>
                        </h4>
                        <div className="space-y-2 w-full">
                            {workingHours.map((item) => (
                                <div key={item.day} className="flex justify-start items-center w-full">
                                    <span className="text-gray-300 min-w-[30px]">{item.day}</span>
                                    <span className="text-white font-medium pl-[25px]">{item.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Контакты */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Контакты</h4>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <PhoneIcon className="w-4 h-4" />
                                <a 
                                    href="tel:+375291829463" 
                                    className="text-gray-300 hover:text-white transition-colors duration-200"
                                >
                                    +375 29 182-94-63
                                </a>
                            </div>
                            <div className="flex items-start space-x-3">
                                <MapPinIcon className="w-4 h-4" />
                                <span className="text-gray-300">
                                    Минск, пр-т Любимова, 10
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Нижняя часть footer */}
                <div className="border-t border-gray-800 mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-gray-400 text-sm">
                            © 2025 Ресторан "Батискаф". Все права защищены.
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <a href="/privacy" className="hover:text-white transition-colors duration-200">
                                Политика конфиденциальности
                            </a>
                            <a href="/terms" className="hover:text-white transition-colors duration-200">
                                Условия использования
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}