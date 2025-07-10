export interface Menu {
  id: number;
  name: string;
  gramms?: string;
  description?: string;
  price: number;
  available_at_restaurant: string;
  type_group_menu: string;
  created_at: string;
  updated_at: string;
  image_url?: string;
  what_cuisine_dish?: string;
}

export interface MenuGroup {
  [key: string]: Menu[];
}

export interface MenuData {
  [key: string]: MenuGroup;
}

export const MENU_TYPE: Record<string, string> = {
  salad: "Салаты",
  soup: "Супы",
  hot_dish: "Горячее",
  garnish: "Гарниры",
  non_alcoholic_drink: "Безалкогольные напитки",
  drink: "Напитки",
  dessert: "Десерты",
  other: "Другое",
}

export interface MenuStatus {
  available: "Доступно";
  unavailable: "Недоступно";
  soon: "Скоро будет";
  special: "Специальное";
  sezon: "Сезонное";
  popular: "Популярное";
  new: "Новое";
}

export interface MenuItemProps {
  params: {
    id: string;
  };
}

export const API_BASE_URL = "http://127.0.0.1:8000";

export interface MenuItemPageProps {
  params: Promise<{ id: string }>;
}

export interface MenuItemContentProps {
  menuItem: Menu;
}