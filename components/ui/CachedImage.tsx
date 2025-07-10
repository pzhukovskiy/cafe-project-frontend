"use client";

import React from 'react';
import { useCachedImage } from '@/hooks/useImageCache';
import Skeleton from './Skeleton';
import Icon from './Icon';
import { InfoIcon } from '../icons';

interface CachedImageProps {
    src: string;
    alt: string;
    className?: string;
    fallbackClassName?: string;
    skeletonClassName?: string;
    showSkeleton?: boolean;
    onLoad?: () => void;
    onError?: () => void;
}

/**
 * Компонент для отображения кешированных изображений
 * Показывает скелетон во время загрузки и заглушку при ошибке
 */
export default function CachedImage({
    src,
    alt,
    className = "",
    fallbackClassName = "",
    skeletonClassName = "",
    showSkeleton = true,
    onLoad,
    onError
}: CachedImageProps) {
    const { isLoading, hasError, isLoaded } = useCachedImage(src);

    React.useEffect(() => {
        if (isLoaded && onLoad) {
            onLoad();
        }
        if (hasError && onError) {
            onError();
        }
    }, [isLoaded, hasError, onLoad, onError]);

    // Показываем скелетон во время загрузки
    if (isLoading && showSkeleton) {
        return (
            <Skeleton 
                className={`bg-gray-200 ${skeletonClassName}`}
                height="h-full"
                rounded="rounded"
            />
        );
    }

    // Показываем заглушку при ошибке или отсутствии изображения
    if (hasError || !src) {
        return (
            <div className={`flex items-center justify-center ${fallbackClassName}`}>
                <InfoIcon/>
            </div>
        );
    }

    // Показываем изображение
    return (
        <img
            src={src}
            alt={alt}
            className={className}
            loading="lazy"
        />
    );
}

/**
 * Мемоизированная версия компонента для оптимизации производительности
 */
export const MemoizedCachedImage = React.memo(CachedImage, (prevProps, nextProps) => {
    return prevProps.src === nextProps.src && 
           prevProps.alt === nextProps.alt &&
           prevProps.className === nextProps.className;
}); 