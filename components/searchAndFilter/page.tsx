"use client";

import { useState } from "react";

interface SearchAndFilterProps {
    searchTerm: string;
    selectedFilter: string;
    selectedMenuType: string;
    onSearchChange: (searchTerm: string) => void;
    onFilterChange: (filter: string) => void;
    onMenuTypeChange: (menuType: string) => void;
    onClearFilters: () => void;
}

export default function SearchAndFilter({ 
    searchTerm,
    selectedFilter,
    selectedMenuType,
    onSearchChange, 
    onFilterChange, 
    onMenuTypeChange,
    onClearFilters
}: SearchAndFilterProps) {
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(e.target.value);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onFilterChange(e.target.value);
    };

    const handleMenuTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onMenuTypeChange(e.target.value);
    };

    const clearFilters = () => {
        onClearFilters();
    };

    return (
        <div className="w-full bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Поиск и фильтры</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Поиск */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Поиск блюд
                        </label>
                        <input
                            type="text"
                            placeholder="Введите название блюда..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Фильтр по типу меню */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Тип меню
                        </label>
                        <select
                            value={selectedMenuType}
                            onChange={handleMenuTypeChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">Все меню</option>
                            <option value="Основное меню">Основное меню</option>
                            <option value="Банкетное меню">Банкетное меню</option>
                        </select>
                    </div>

                    {/* Фильтр по категории */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Категория
                        </label>
                        <select
                            value={selectedFilter}
                            onChange={handleFilterChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">Все категории</option>
                            <option value="hot_dish">Горячее</option>
                            <option value="cold_dish">Холодные блюда</option>
                            <option value="salad">Салаты</option>
                            <option value="soup">Супы</option>
                            <option value="dessert">Десерты</option>
                            <option value="drink">Напитки</option>
                        </select>
                    </div>

                    {/* Кнопка сброса */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 opacity-0">
                            Сброс
                        </label>
                        <button
                            onClick={clearFilters}
                            className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
                        >
                            Сбросить фильтры
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 