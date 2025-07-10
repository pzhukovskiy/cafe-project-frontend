import { API_BASE_URL, MenuItemContentProps } from "@/types/menu.type";
import Card from "../ui/Card";
import Icon from "../ui/Icon";
import { ClockIcon, ScaleIcon, CurrencyIcon, InfoIcon } from "../icons";
import CachedImage from "../ui/CachedImage";
import React from "react";

/**
 * Компонент для отображения детальной информации о блюде
 * Включает в себя изображение, описание, статус, цену и дополнительную информацию
 */
function MenuItemContent({ menuItem }: MenuItemContentProps) {
    /**
     * Форматирует цену в российском формате с разделителями тысяч
     * @param price - цена блюда
     * @returns отформатированная строка цены
     */
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('ru-RU').format(price);
    };

    /**
     * Получает цветовую схему и текст для статуса блюда
     * @param status - статус блюда (available, unavailable, etc.)
     * @returns объект с текстом, цветом текста и цветом фона
     */
    const getAvailabilityStatus = (status: string) => {
        const statusMap = {
            'available': { text: 'Доступно', color: 'text-green-600', bg: 'bg-green-100' },
            'unavailable': { text: 'Недоступно', color: 'text-red-600', bg: 'bg-red-100' },
            'coming_soon': { text: 'Скоро будет', color: 'text-blue-600', bg: 'bg-blue-100' },
            'special': { text: 'Специальное', color: 'text-purple-600', bg: 'bg-purple-100' },
            'seasonal': { text: 'Сезонное', color: 'text-yellow-600', bg: 'bg-yellow-100' },
            'popular': { text: 'Популярное', color: 'text-orange-600', bg: 'bg-orange-100' },
            'new': { text: 'Новое', color: 'text-cyan-600', bg: 'bg-cyan-100' }
        };
        return statusMap[status.toLowerCase() as keyof typeof statusMap] || 
               { text: status, color: 'text-gray-600', bg: 'bg-gray-100' };
    };

    /**
     * Переводит название кухни на русский язык
     * @param cuisine - название кухни на английском
     * @returns переведенное название кухни
     */
    const getCuisineName = (cuisine: string) => {
        const cuisineMap = {
            'belarussian': 'Белорусская',
            'traditional': 'Традиционная',
        };
        return cuisineMap[cuisine.toLowerCase() as keyof typeof cuisineMap] || cuisine;
    };

    // Получаем статус блюда для отображения
    const status = getAvailabilityStatus(menuItem.available_at_restaurant);

    return (
        // Основной контейнер с градиентным фоном
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Контейнер с максимальной шириной и адаптивными отступами */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Основная секция с изображением и информацией */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Секция с изображением блюда */}
                    <div className="relative">
                        {/* Контейнер для изображения с квадратными пропорциями */}
                        <div className="aspect-square bg-gray-200 rounded-2xl overflow-hidden shadow-2xl">
                            <CachedImage
                                src={menuItem.image_url ? `${API_BASE_URL}${menuItem.image_url}` : ""}
                                alt={menuItem.name}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                fallbackClassName="w-full h-full"
                                skeletonClassName="w-full h-full"
                            />
                        </div>
                        
                        {/* Бейдж статуса блюда (левый верхний угол) */}
                        <div className="absolute top-4 left-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${status.bg} ${status.color}`}>
                                {status.text}
                            </span>
                        </div>

                        {/* Бейдж цены (правый верхний угол) */}
                        <div className="absolute top-4 right-4">
                            <span className="inline-flex items-center px-4 py-2 rounded-full text-lg font-bold bg-white text-blue-600 shadow-lg">
                                {formatPrice(menuItem.price)} (руб.)
                            </span>
                        </div>
                    </div>

                    {/* Секция с информацией о блюде */}
                    <div className="flex flex-col justify-center space-y-6">
                        {/* Название и описание блюда */}
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                                {menuItem.name}
                            </h1>
                            
                            {/* Описание блюда (если есть) */}
                            {menuItem.description && (
                                <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6">
                                    {menuItem.description}
                                </p>
                            )}
                        </div>

                        {/* Карточки с основной информацией (цена и вес) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Карточка с ценой */}
                            <Card className="bg-white/80 backdrop-blur-sm">
                                <div className="flex items-center space-x-3">
                                    <Icon size="sm" color="blue" className="rounded-full">
                                        <CurrencyIcon />
                                    </Icon>
                                    <div>
                                        <p className="text-sm text-gray-500">Цена</p>
                                        <p className="text-xl font-bold text-gray-900">{formatPrice(menuItem.price)} (руб.)</p>
                                    </div>
                                </div>
                            </Card>

                            {/* Карточка с весом (если указан) */}
                            {menuItem.gramms && (
                                <Card className="bg-white/80 backdrop-blur-sm">
                                    <div className="flex items-center space-x-3">
                                        <Icon size="sm" color="green" className="rounded-full">
                                            <ScaleIcon />
                                        </Icon>
                                        <div>
                                            <p className="text-sm text-gray-500">Вес</p>
                                            <p className="text-xl font-bold text-gray-900">{menuItem.gramms} г</p>
                                        </div>
                                    </div>
                                </Card>
                            )}
                        </div>

                        {/* Бейдж типа кухни */}
                        {menuItem.what_cuisine_dish && (
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-500">Кухня:</span>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                                    {getCuisineName(menuItem.what_cuisine_dish)}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Мемоизированная версия компонента для оптимизации производительности
export default React.memo(MenuItemContent, (prevProps, nextProps) => {
    return prevProps.menuItem.id === nextProps.menuItem.id &&
           prevProps.menuItem.updated_at === nextProps.menuItem.updated_at;
});