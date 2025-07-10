"use client";

import React, { useState } from 'react';
import Card from '@/components/ui/Card';
import Icon from '@/components/ui/Icon';
import { Map } from '@/components/ui/Map';
import {
    ClockIcon,
    MapPinIcon,
    PhoneIcon,
    HeartIcon,
    CheckIcon,
    InfoIcon,
    BuildingIcon,
    MenuIcon
} from '@/components/icons';
import Link from 'next/link';
import Notification from '@/components/ui/Notification';

export default function Contacts() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [submitMessage, setSubmitMessage] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setSubmitMessage('');

        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                setSubmitStatus('success');
                setSubmitMessage('Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                });
            } else {
                setSubmitStatus('error');
                setSubmitMessage(result.error || 'Произошла ошибка при отправке сообщения');
            }
        } catch (error) {
            console.error('Ошибка при отправке формы:', error);
            setSubmitStatus('error');
            setSubmitMessage('Произошла ошибка при отправке сообщения');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Hero секция */}
            <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20 lg:py-32">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Контакты
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                        Свяжитесь с нами любым удобным способом
                    </p>
                </div>
            </section>

            {/* Основная контактная информация */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Контактные данные */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                                    Свяжитесь с нами
                                </h2>
                                <p className="text-lg text-gray-600 mb-8">
                                    Мы всегда рады ответить на ваши вопросы и помочь с бронированием столика
                                </p>
                            </div>

                            {/* Адрес */}
                            <Card className="p-6 hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Icon size="sm" color="blue" className="flex items-center justify-center">
                                            <MapPinIcon />
                                        </Icon>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Адрес</h3>
                                        <p className="text-gray-600 mb-2">пр-т Любимова, 10</p>
                                        <p className="text-gray-600 mb-2">Минск, Беларусь</p>
                                        <p className="text-gray-600">220017</p>
                                    </div>
                                </div>
                            </Card>

                            {/* Телефон */}
                            <Card className="p-6 hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Icon size="sm" color="green" className="flex items-center justify-center">
                                            <PhoneIcon />
                                        </Icon>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Телефон</h3>
                                        <p className="text-gray-600 mb-2"><a href="tel:+375291829463">+375 (29) 182-94-63</a></p>
                                        <p className="text-sm text-gray-500">Ежедневно с 10:00 до 23:00</p>
                                    </div>
                                </div>
                            </Card>

                            {/* Email */}
                            <Card className="p-6 hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Icon size="sm" color="purple" className="flex items-center justify-center">
                                            <InfoIcon />
                                        </Icon>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
                                        <p className="text-gray-600 mb-2">batiscafclub@gmail.com</p>
                                        <p className="text-sm text-gray-500">Ответим в течение 2 часов</p>
                                    </div>
                                </div>
                            </Card>

                            {/* Часы работы */}
                            <Card className="p-6 hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Icon size="sm" color="orange" className="flex items-center justify-center">
                                            <ClockIcon />
                                        </Icon>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Часы работы</h3>
                                        <div className="space-y-1 text-gray-600">
                                            <p><strong>Понедельник - Четверг:</strong> 12:00 - 03:00</p>
                                            <p><strong>Пятница - Суббота:</strong> 13:00 - 05:00</p>
                                            <p><strong>Воскресенье:</strong> 13:00 - 03:00</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Карта */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                                    Как нас найти
                                </h2>
                                <p className="text-lg text-gray-600 mb-8">
                                    Мы находимся в самом сердце города, в удобном месте с хорошей транспортной доступностью
                                </p>
                            </div>

                            {/* Интерактивная карта */}
                            <Card className="p-6 hover:shadow-xl transition-shadow duration-300">
                                <Map className="w-full h-96" height="400px" />
                            </Card>

                            {/* Транспортная доступность */}
                            <Card className="p-6 hover:shadow-xl transition-shadow duration-300">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Как добраться</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span className="text-blue-600 font-bold text-sm">М</span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">Метро</p>
                                            <p className="text-gray-600">Станция "Малиновка" (синяя линия)</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                            <span className="text-red-600 font-bold text-sm">А</span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">Автобус</p>
                                            <p className="text-gray-600">Маршруты №104, №75, №116</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                            <span className="text-green-600 font-bold text-sm">Т</span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">Троллейбус</p>
                                            <p className="text-gray-600">Маршруты №47, №64</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                            <Icon size="sm" color="purple" className="flex items-center justify-center">
                                                <BuildingIcon />
                                            </Icon>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">Автомобиль</p>
                                            <p className="text-gray-600">Есть парковка для гостей</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Дополнительные услуги */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Дополнительные услуги
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Мы предлагаем широкий спектр услуг для вашего комфорта
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card className="text-center p-6 hover:shadow-xl transition-shadow duration-300">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Icon color="blue" className="rounded-full flex items-center justify-center mx-auto">
                                    <CheckIcon />
                                </Icon>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Бронирование столиков</h3>
                            <p className="text-gray-600 mb-4">
                                Забронируйте столик заранее и получите скидку 10% на первое посещение
                            </p>
                            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                                Забронировать
                            </button>
                        </Card>

                        <Card className="text-center p-6 hover:shadow-xl transition-shadow duration-300">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Icon color="green" className="rounded-full flex items-center justify-center mx-auto">
                                    <HeartIcon />
                                </Icon>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Кейтеринг</h3>
                            <p className="text-gray-600 mb-4">
                                Организуем выездное обслуживание для ваших мероприятий и праздников
                            </p>
                            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200">
                                Узнать больше
                            </button>
                        </Card>

                        <Card className="text-center p-6 hover:shadow-xl transition-shadow duration-300">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Icon color="purple" className="rounded-full flex items-center justify-center mx-auto">
                                    <MenuIcon />
                                </Icon>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Доставка</h3>
                            <p className="text-gray-600 mb-4">
                                Доставляем блюда в любую точку города в течение 60 минут
                            </p>
                            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200">
                                Заказать доставку
                            </button>
                        </Card>
                    </div>
                </div>
            </section>

            {/* FAQ секция */}
            <section className="py-16 lg:py-24 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Часто задаваемые вопросы
                        </h2>
                        <p className="text-xl text-gray-600">
                            Ответы на самые популярные вопросы
                        </p>
                    </div>

                    <div className="space-y-6">
                        <Card className="p-6 hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                Можно ли забронировать столик онлайн?
                            </h3>
                            <p className="text-gray-600">
                                Да, вы можете забронировать столик через наш сайт или по телефону.
                                Онлайн бронирование доступно 24/7.
                            </p>
                        </Card>

                        <Card className="p-6 hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                Есть ли у вас парковка?
                            </h3>
                            <p className="text-gray-600">
                                Да, у нас есть бесплатная парковка для гостей ресторана.
                                Парковка рассчитана на 20 автомобилей.
                            </p>
                        </Card>

                        <Card className="p-6 hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                Принимаете ли вы карты?
                            </h3>
                            <p className="text-gray-600">
                                Да, мы принимаем все основные банковские карты: Visa, MasterCard,
                                American Express, а также карты местных банков.
                            </p>
                        </Card>

                        <Card className="p-6 hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                Можно ли заказать блюда на вынос?
                            </h3>
                            <p className="text-gray-600">
                                Да, мы предлагаем услугу "на вынос". Вы можете заказать блюда
                                по телефону или через наш сайт.
                            </p>
                        </Card>

                        <Card className="p-6 hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                Есть ли у вас детское меню?
                            </h3>
                            <p className="text-gray-600">
                                Да, у нас есть специальное детское меню с блюдами,
                                которые понравятся самым маленьким гостям.
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Форма обратной связи */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Напишите нам
                        </h2>
                        <p className="text-xl text-gray-600">
                            Оставьте сообщение, и мы свяжемся с вами в ближайшее время
                        </p>
                    </div>

                    <Card className="p-8 hover:shadow-xl transition-shadow duration-300">
                        {/* Статус отправки */}
                        <Notification
                            type={submitStatus === 'success' ? 'success' : submitStatus === 'error' ? 'error' : 'info'}
                            message={submitMessage}
                            show={submitStatus !== 'idle'}
                            onClose={() => setSubmitStatus('idle')}
                        />

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Имя *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Ваше имя"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                    Телефон
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="+375 (29) 182-94-63"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                    Тема *
                                </label>
                                <select
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">Выберите тему</option>
                                    <option value="booking">Бронирование столика</option>
                                    <option value="delivery">Доставка</option>
                                    <option value="catering">Кейтеринг</option>
                                    <option value="feedback">Отзыв</option>
                                    <option value="other">Другое</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Сообщение *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={6}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Опишите ваш вопрос или пожелание..."
                                ></textarea>
                            </div>

                            <div className="text-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`px-8 py-3 rounded-lg font-semibold transition-colors duration-200 ${isSubmitting
                                            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                        }`}
                                >
                                    {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
                                </button>
                            </div>
                        </form>
                    </Card>
                </div>
            </section>

            {/* CTA секция */}
            <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Готовы к незабываемому гастрономическому опыту?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Свяжитесь с нами прямо сейчас и забронируйте столик
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                            Забронировать столик
                        </button>
                        <Link href="/menu">
                            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                                Посмотреть меню
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}