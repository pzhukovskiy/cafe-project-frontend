export const HERO_DATA = {
  title: "Добро пожаловать в Бастикаф",
  subtitle: "Откройте для себя изысканную кухню и неповторимую атмосферу нашего ресторана",
  imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  overlayTitle: "Ресторан Бастикаф",
  overlaySubtitle: "Традиции и инновации в каждой тарелке"
};

export const FEATURE_CARDS = [
  {
    id: "menu",
    title: "Наше Меню",
    description: "Изучите наше разнообразное меню с блюдами на любой вкус",
    gradient: "from-blue-600 to-purple-700",
    buttonText: "Открыть меню",
    buttonVariant: "primary" as const,
    href: "/menu",
    icon: "menu"
  },
  {
    id: "contacts",
    title: "Контакты",
    description: "Свяжитесь с нами любым удобным способом",
    gradient: "from-orange-500 to-red-600",
    buttonText: "Узнать больше",
    buttonVariant: "secondary" as const,
    href: "/contacts",
    icon: "building"
  },
  // {
  //   id: "about",
  //   title: "О Нас",
  //   description: "Узнайте больше о нашей истории, традициях и философии",
  //   gradient: "from-orange-500 to-red-600",
  //   buttonText: "Узнать больше",
  //   buttonVariant: "secondary" as const,
  //   href: "/about",
  //   icon: "building"
  // }
];

export const FEATURES = [
  {
    id: "service",
    title: "Быстрое обслуживание",
    description: "Мы ценим ваше время и обеспечиваем быстрое и качественное обслуживание",
    icon: "clock",
    color: "blue"
  },
  {
    id: "ingredients",
    title: "Свежие ингредиенты",
    description: "Используем только свежие и качественные ингредиенты для наших блюд",
    icon: "check",
    color: "green"
  },
  {
    id: "atmosphere",
    title: "Уютная атмосфера",
    description: "Создаем комфортную и приятную атмосферу для вашего отдыха",
    icon: "heart",
    color: "purple"
  }
]; 