"use client";

import SearchAndFilter from "@/components/searchAndFilter/page";
import type { Menu, MenuData } from "@/types/menu.type";
import { API_BASE_URL, MENU_TYPE } from "@/types/menu.type";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useMemo } from "react";
import BlockStatusCard from "@/components/blockStatusCard/page";
import { MenuItemSkeleton } from "@/components/ui/Skeleton";
import CachedImage from "@/components/ui/CachedImage";

export default function Menu() {
    const [data, setData] = useState<MenuData>({});
    const [filteredData, setFilteredData] = useState<MenuData>({});
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [selectedMenuType, setSelectedMenuType] = useState("all");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const hasRestoredScroll = useRef(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const { data } = await axios.get(`${API_BASE_URL}/api/menu`);
                setData(data);
                setFilteredData(data);
            } catch (error: any) {
                console.error("Ошибка при загрузке данных:", error);
                if (error.response?.status === 404) {
                    setError("Меню не найдено");
                } else if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
                    setError("Ошибка подключения к серверу");
                } else {
                    setError("Произошла ошибка при загрузке меню");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!hasRestoredScroll.current && Object.keys(data).length > 0) {
            const scrollY = sessionStorage.getItem("scrollY");
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY));
                sessionStorage.removeItem("scrollY");
                hasRestoredScroll.current = true;
            }
        }
    }, [data]);

    const applyFilters = useMemo(() => {
        let filtered = { ...data };

        // Фильтр по типу меню
        if (selectedMenuType !== "all") {
            filtered = Object.fromEntries(
                Object.entries(filtered).filter(([menuType]) => menuType === selectedMenuType)
            );
        }

        // Фильтр по категории
        if (selectedFilter !== "all") {
            Object.keys(filtered).forEach(menuType => {
                if (filtered[menuType]) {
                    // Оставляем только выбранную категорию
                    filtered[menuType] = Object.fromEntries(
                        Object.entries(filtered[menuType]).filter(([category]) => category === selectedFilter)
                    );
                }
            });
        }

        // Фильтр по поиску для каждого типа меню
        Object.keys(filtered).forEach(menuType => {
            if (filtered[menuType]) {
                Object.keys(filtered[menuType]).forEach(category => {
                    filtered[menuType][category] = filtered[menuType][category].filter((item: Menu) => {
                        const matchesSearch = searchTerm === "" ||
                            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
                        return matchesSearch;
                    });
                });

                // Удаляем пустые категории
                filtered[menuType] = Object.fromEntries(
                    Object.entries(filtered[menuType]).filter(([_, items]) => items.length > 0)
                );
            }
        });

        // Удаляем пустые типы меню
        filtered = Object.fromEntries(
            Object.entries(filtered).filter(([_, menuGroups]) => 
                Object.keys(menuGroups).length > 0
            )
        );

        return filtered;
    }, [data, searchTerm, selectedFilter, selectedMenuType]);

    useEffect(() => {
        setFilteredData(applyFilters);
    }, [applyFilters]);

    const handleClick = (id: string) => {
        // Валидация ID перед переходом
        if (!id || isNaN(Number(id))) {
            console.error("Некорректный ID блюда:", id);
            return;
        }
        
        sessionStorage.setItem("scrollY", String(window.scrollY));
        router.push(`/menu/${id}`);
    };

    const handleClearFilters = () => {
        setSearchTerm("");
        setSelectedFilter("all");
        setSelectedMenuType("all");
    };

    return (
        <div>
            <SearchAndFilter
                searchTerm={searchTerm}
                selectedFilter={selectedFilter}
                selectedMenuType={selectedMenuType}
                onSearchChange={setSearchTerm}
                onFilterChange={setSelectedFilter}
                onMenuTypeChange={setSelectedMenuType}
                onClearFilters={handleClearFilters}
            />
            
            {/* Показываем скелетоны во время загрузки */}
            {isLoading && (
                <div className="flex flex-col gap-4 max-w-7xl mx-auto pt-4 pb-4 px-4 sm:px-6 lg:px-8 w-full">
                    <div className="h-8 bg-gray-200 rounded animate-pulse w-48" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <MenuItemSkeleton key={index} />
                        ))}
                    </div>
                </div>
            )}

            {/* Показываем ошибку */}
            {error && !isLoading && (
                <div className="flex flex-col gap-4 max-w-7xl mx-auto pt-4 pb-4 px-4 sm:px-6 lg:px-8 w-full">
                    <div className="text-center py-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">{error}</h2>
                        <p className="text-gray-600 mb-4">Попробуйте обновить страницу или обратитесь к администратору</p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Обновить страницу
                        </button>
                    </div>
                </div>
            )}
            
            {/* Показываем данные после загрузки */}
            {!isLoading && !error && Object.entries(filteredData).map(([menuType, categories]) => (
                <div key={menuType} className="flex flex-col gap-4 max-w-7xl mx-auto pt-4 pb-4 px-4 sm:px-6 lg:px-8 w-full">
                    <h1 className="text-3xl font-bold text-gray-800">{menuType}</h1>
                    {Object.entries(categories).map(([category, items]) => (
                        <div key={category} className="flex flex-col gap-4">
                            <h2 className="text-2xl font-bold">{MENU_TYPE[category] ?? category}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                                {items.map((item: Menu) => (
                                    <div
                                        key={item.id}
                                        className="bg-white rounded-[14px] shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden"
                                        onClick={() => handleClick(item.id.toString())}
                                    >
                                        {/* Изображение блюда с кешированием */}
                                        <div className="w-full h-[200px] overflow-hidden bg-gray-200 relative">
                                            <CachedImage
                                                src={item.image_url ? `${API_BASE_URL}${item.image_url}` : ""}
                                                alt={item.name}
                                                className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                                                fallbackClassName="h-full w-full"
                                                skeletonClassName="h-full w-full"
                                            />
                                        </div>

                                        {/* Информация о блюде */}
                                        <div className="p-4 flex flex-col flex-1">
                                            <div className="mb-3">
                                                <h3 className="text-[16px] font-bold mb-2 line-clamp-2">{item.name}</h3>
                                                {item.gramms && <p className="text-[12px] text-gray-500 mb-2">{item.gramms} г</p>}
                                                <p className="text-[12px] text-gray-500 line-clamp-2">
                                                    {item.description}
                                                </p>
                                            </div>
                                            <div className="mt-auto">
                                                <div className="mb-3">
                                                    <BlockStatusCard
                                                        status={item.available_at_restaurant}
                                                        cuisine={item.what_cuisine_dish}
                                                    />
                                                </div>
                                                <p className="text-[18px] font-bold text-blue-600">{item.price} руб.</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}