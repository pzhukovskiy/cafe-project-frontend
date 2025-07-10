"use client";

import React from 'react';
import Icon from './Icon';
import { CheckIcon, InfoIcon } from '../icons';

interface NotificationProps {
    type: 'success' | 'error' | 'info';
    message: string;
    onClose?: () => void;
    show?: boolean;
}

export default function Notification({ type, message, onClose, show = true }: NotificationProps) {
    if (!show) return null;

    const getNotificationStyles = () => {
        switch (type) {
            case 'success':
                return {
                    container: 'bg-green-100 border-green-400 text-green-700',
                    icon: 'green' as const,
                    iconComponent: CheckIcon
                };
            case 'error':
                return {
                    container: 'bg-red-100 border-red-400 text-red-700',
                    icon: 'gray' as const,
                    iconComponent: InfoIcon
                };
            case 'info':
                return {
                    container: 'bg-blue-100 border-blue-400 text-blue-700',
                    icon: 'blue' as const,
                    iconComponent: InfoIcon
                };
            default:
                return {
                    container: 'bg-gray-100 border-gray-400 text-gray-700',
                    icon: 'gray' as const,
                    iconComponent: InfoIcon
                };
        }
    };

    const styles = getNotificationStyles();
    const IconComponent = styles.iconComponent;

    return (
        <div className={`p-4 border rounded-lg flex items-start space-x-3 ${styles.container}`}>
            <div className="flex-shrink-0">
                <Icon size="sm" color={styles.icon}>
                    <IconComponent />
                </Icon>
            </div>
            <div className="flex-1">
                <p className="text-sm font-medium">{message}</p>
            </div>
            {onClose && (
                <button
                    onClick={onClose}
                    className="flex-shrink-0 text-current hover:opacity-75 transition-opacity duration-200"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </div>
    );
} 