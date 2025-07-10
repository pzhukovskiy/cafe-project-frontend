"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';

interface CachedImage {
    src: string;
    loaded: boolean;
    error: boolean;
}

/**
 * Хук для кеширования изображений
 * Предотвращает повторную загрузку уже загруженных изображений
 */
export function useImageCache() {
    const [imageCache, setImageCache] = useState<Map<string, CachedImage>>(new Map());

    /**
     * Загружает изображение и кеширует результат
     */
    const loadImage = useCallback((src: string): Promise<boolean> => {
        return new Promise((resolve) => {
            // Проверяем, есть ли изображение в кеше
            const cached = imageCache.get(src);
            if (cached) {
                resolve(cached.loaded && !cached.error);
                return;
            }

            // Создаем новый объект Image для предзагрузки
            const img = new Image();
            
            img.onload = () => {
                setImageCache(prev => new Map(prev).set(src, {
                    src,
                    loaded: true,
                    error: false
                }));
                resolve(true);
            };

            img.onerror = () => {
                setImageCache(prev => new Map(prev).set(src, {
                    src,
                    loaded: false,
                    error: true
                }));
                resolve(false);
            };

            img.src = src;
        });
    }, [imageCache]);

    /**
     * Проверяет статус изображения в кеше
     */
    const getImageStatus = useCallback((src: string) => {
        return imageCache.get(src) || { src, loaded: false, error: false };
    }, [imageCache]);

    /**
     * Очищает кеш изображений
     */
    const clearCache = useCallback(() => {
        setImageCache(new Map());
    }, []);

    return {
        loadImage,
        getImageStatus,
        clearCache,
        imageCache: useMemo(() => imageCache, [imageCache])
    };
}

/**
 * Хук для загрузки одного изображения с кешированием
 */
export function useCachedImage(src: string) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const { loadImage, getImageStatus } = useImageCache();

    useEffect(() => {
        if (!src) {
            setIsLoading(false);
            setHasError(true);
            return;
        }

        const status = getImageStatus(src);
        
        if (status.loaded) {
            setIsLoading(false);
            setHasError(false);
            return;
        }

        if (status.error) {
            setIsLoading(false);
            setHasError(true);
            return;
        }

        setIsLoading(true);
        setHasError(false);

        loadImage(src).then((success) => {
            setIsLoading(false);
            setHasError(!success);
        });
    }, [src, loadImage, getImageStatus]);

    return {
        isLoading,
        hasError,
        isLoaded: !isLoading && !hasError
    };
} 