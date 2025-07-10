export const getStatusColor = (status: string) => {
    switch (status.trim().toLowerCase()) {
        case "available":
        case "доступно":
            return "bg-green-100"; // зелёный фон
        case "unavailable":
        case "недоступно":
            return "bg-red-100"; // красный фон
        case "coming_soon":
        case "скоро будет":
            return "bg-blue-100"; // синий фон
        case "special":
        case "специальное":
            return "bg-purple-100"; // фиолетовый фон
        case "seasonal":
        case "сезонное":
            return "bg-yellow-100"; // жёлтый фон
        case "popular":
        case "популярное":
            return "bg-orange-100"; // оранжевый фон
        case "new":
        case "новое":
            return "bg-cyan-100"; // голубой фон
        default:
            return "bg-gray-100"; // дефолтный
    }
};

// Цвета текста для статусов
export const getStatusTextColor = (status: string) => {
    switch (status.trim().toLowerCase()) {
        case "available":
        case "доступно":
            return "text-green-600"; // зелёный текст
        case "unavailable":
        case "недоступно":
            return "text-red-600"; // красный текст
        case "coming_soon":
        case "скоро будет":
            return "text-blue-600"; // синий текст
        case "special":
        case "специальное":
            return "text-purple-600"; // фиолетовый текст
        case "seasonal":
        case "сезонное":
            return "text-yellow-600"; // жёлтый текст
        case "popular":
        case "популярное":
            return "text-orange-600"; // оранжевый текст
        case "new":
        case "новое":
            return "text-cyan-600"; // голубой текст
        default:
            return "text-gray-600"; // дефолтный
    }
};

// Тексты для статусов
export const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
        case "available":
        case "доступно":
            return "Доступно";
        case "unavailable":
        case "недоступно":
            return "Недоступно";
        case "coming_soon":
        case "скоро будет":
            return "Скоро будет";
        case "special":
        case "специальное":
            return "Специальное";
        case "seasonal":
        case "сезонное":
            return "Сезонное";
        case "popular":
        case "популярное":
            return "Популярное";
        case "new":
        case "новое":
            return "Новое";
        default:
            return status;
    }
};