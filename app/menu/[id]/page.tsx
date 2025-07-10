import ErrorMessage from "@/components/error/page";
import MenuItemContent from "@/components/menuItemContent/page";
import { API_BASE_URL, type Menu, type MenuItemPageProps } from "@/types/menu.type";
import { MenuItemDetailSkeleton } from "@/components/ui/Skeleton";
import axios from "axios";
import { Suspense } from "react";

export default async function MenuItemPage({ params }: MenuItemPageProps) {
    try {
        const { id } = await params;

        // Валидация ID
        if (!id || isNaN(Number(id))) {
            console.error("Некорректный ID блюда:", id);
            return <ErrorMessage message="Блюдо не найдено" />;
        }

        const { data } = await axios.get<Menu>(`${API_BASE_URL}/api/menu/${id}`);

        // Проверка, что данные получены
        if (!data || !data.id) {
            console.error("Блюдо не найдено в базе данных:", id);
            return <ErrorMessage message="Блюдо не найдено" />;
        }

        return (
            <Suspense fallback={<MenuItemDetailSkeleton />}>
                <MenuItemContent menuItem={data} />
            </Suspense>
        );
    } catch (error: any) {
        console.error("Ошибка при загрузке блюда:", error);
        
        // Определяем тип ошибки для более информативного сообщения
        if (error.response?.status === 404) {
            return <ErrorMessage message="Блюдо не найдено" />;
        } else if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
            return <ErrorMessage message="Ошибка подключения к серверу" />;
        } else {
            return <ErrorMessage message="Произошла ошибка при загрузке блюда" />;
        }
    }
}
