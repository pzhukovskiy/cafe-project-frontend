"use client";

import React from 'react';

interface SkeletonProps {
    className?: string;
    width?: string;
    height?: string;
    rounded?: string;
}

/**
 * Компонент скелетона с анимацией загрузки
 */
export default function Skeleton({ 
    className = "", 
    width = "w-full", 
    height = "h-4", 
    rounded = "rounded" 
}: SkeletonProps) {
    return (
        <div 
            className={`${width} ${height} ${rounded} bg-gray-200 animate-pulse ${className}`}
        />
    );
}

/**
 * Скелетон для карточки блюда
 */
export function MenuItemSkeleton() {
    return (
        <div className="bg-white rounded-[14px] shadow-md flex flex-col overflow-hidden">
            {/* Скелетон изображения */}
            <div className="w-full h-[200px] bg-gray-200 animate-pulse" />
            
            {/* Скелетон контента */}
            <div className="p-4 flex flex-col flex-1">
                <div className="mb-3">
                    {/* Скелетон названия */}
                    <Skeleton className="h-5 mb-2" />
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    
                    {/* Скелетон веса */}
                    <Skeleton className="h-3 w-16 mb-2" />
                    
                    {/* Скелетон описания */}
                    <Skeleton className="h-3 mb-1" />
                    <Skeleton className="h-3 w-5/6" />
                </div>
                
                <div className="mt-auto">
                    {/* Скелетон статуса */}
                    <div className="mb-3 flex gap-2">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-6 w-24" />
                    </div>
                    
                    {/* Скелетон цены */}
                    <Skeleton className="h-6 w-20" />
                </div>
            </div>
        </div>
    );
}

/**
 * Скелетон для детальной страницы блюда
 */
export function MenuItemDetailSkeleton() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Скелетон изображения */}
                    <div className="relative">
                        <Skeleton className="aspect-square rounded-2xl" />
                    </div>
                    
                    {/* Скелетон информации */}
                    <div className="flex flex-col justify-center space-y-6">
                        <div>
                            <Skeleton className="h-12 mb-4" />
                            <Skeleton className="h-6 w-3/4 mb-2" />
                            <Skeleton className="h-6 w-1/2" />
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <Skeleton className="w-8 h-8 rounded-full" />
                                    <div className="flex-1">
                                        <Skeleton className="h-4 w-12 mb-1" />
                                        <Skeleton className="h-6 w-20" />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <Skeleton className="w-8 h-8 rounded-full" />
                                    <div className="flex-1">
                                        <Skeleton className="h-4 w-12 mb-1" />
                                        <Skeleton className="h-6 w-16" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Скелетон дополнительной информации */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                            <Skeleton className="h-6 w-32 mx-auto mb-4" />
                            <div className="space-y-3">
                                {[1, 2, 3, 4].map((j) => (
                                    <div key={j} className="flex justify-between items-center">
                                        <Skeleton className="h-4 w-16" />
                                        <Skeleton className="h-4 w-12" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 