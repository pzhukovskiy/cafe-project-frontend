"use client";

import { useRouter } from "next/navigation";

interface ErrorMessageProps {
    message?: string;
    description?: string;
}

// Клиентский компонент для кнопки
function BackButton() {
    const router = useRouter();
    
    return (
        <button 
            onClick={() => router.back()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
            Назад
        </button>
    );
}

export default function ErrorMessage({ 
    message = "Блюдо не найдено", 
    description = "Запрашиваемое блюдо не существует или было удалено" 
}: ErrorMessageProps) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{message}</h2>
                <p className="text-gray-600 mb-6">{description}</p>
                <BackButton />
            </div>
        </div>
    )
}