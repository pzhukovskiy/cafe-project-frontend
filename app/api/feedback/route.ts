import { NextRequest, NextResponse } from 'next/server';

interface FeedbackData {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: FeedbackData = await request.json();
        
        // Валидация данных
        if (!body.name || !body.email || !body.subject || !body.message) {
            return NextResponse.json(
                { error: 'Все обязательные поля должны быть заполнены' },
                { status: 400 }
            );
        }

        // Валидация email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email)) {
            return NextResponse.json(
                { error: 'Некорректный формат email' },
                { status: 400 }
            );
        }

        // Здесь можно добавить логику для отправки данных на ваш бэкенд
        // Например, отправка на ваш API сервер
        const backendResponse = await sendToBackend(body);
        
        if (backendResponse.success) {
            return NextResponse.json(
                { 
                    success: true, 
                    message: 'Сообщение успешно отправлено',
                    data: backendResponse.data 
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { error: backendResponse.error || 'Ошибка при отправке на сервер' },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error('Ошибка при обработке формы обратной связи:', error);
        return NextResponse.json(
            { error: 'Внутренняя ошибка сервера' },
            { status: 500 }
        );
    }
}

/**
 * Функция для отправки данных на ваш бэкенд
 * Замените URL и логику на ваши реальные данные
 */
async function sendToBackend(data: FeedbackData) {
    try {
        // Замените URL на адрес вашего бэкенда
        const response = await fetch(`${process.env.BACKEND_URL || 'http://127.0.0.1:8000'}/api/feedback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Добавьте необходимые заголовки для авторизации, если нужно
                // 'Authorization': `Bearer ${process.env.API_TOKEN}`,
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                phone: data.phone,
                subject: data.subject,
                message: data.message,
                created_at: new Date().toISOString(),
                source: 'website_contact_form'
            })
        });

        if (response.ok) {
            const result = await response.json();
            return { success: true, data: result };
        } else {
            const error = await response.text();
            console.error('Ошибка бэкенда:', error);
            return { success: false, error: 'Ошибка при отправке на сервер' };
        }
    } catch (error) {
        console.error('Ошибка при отправке на бэкенд:', error);
        return { success: false, error: 'Сетевая ошибка' };
    }
} 