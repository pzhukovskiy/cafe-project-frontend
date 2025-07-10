import Link from "next/link"
import Button from "../ui/Button"
import Card from "../ui/Card"
import Icon from "../ui/Icon"
import { 
  ArrowRightIcon, 
  MenuIcon, 
  BuildingIcon, 
  ClockIcon, 
  CheckIcon, 
  HeartIcon 
} from "../icons"
import { HERO_DATA, FEATURE_CARDS, FEATURES } from "../../constants/homeData"

const getIconComponent = (iconName: string) => {
  const icons = {
    menu: MenuIcon,
    building: BuildingIcon,
    clock: ClockIcon,
    check: CheckIcon,
    heart: HeartIcon
  };
  return icons[iconName as keyof typeof icons] || MenuIcon;
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                {HERO_DATA.title.split('Бастикаф')[0]}
                <span className="text-blue-600">Бастикаф</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                {HERO_DATA.subtitle}
              </p>
            </div>
            
            <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl overflow-hidden shadow-2xl mb-12">
              <div 
                className="w-full h-full bg-cover bg-center bg-no-repeat" 
                style={{backgroundImage: `url('${HERO_DATA.imageUrl}')`}}
              >
                <div className="w-full h-full bg-black bg-opacity-30 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{HERO_DATA.overlayTitle}</h2>
                    <p className="text-lg md:text-xl">{HERO_DATA.overlaySubtitle}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {FEATURE_CARDS.map((card) => {
            return (
              <Card key={card.id} variant="feature">
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-90 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative h-[300px] md:h-[400px] flex flex-col justify-center items-center text-center p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{card.title}</h3>
                    <p className="text-white/90 text-lg mb-8 max-w-md">{card.description}</p>
                  </div>
                  {card.href ? (
                    <Link href={card.href}>
                      <Button variant={card.buttonVariant} icon={<ArrowRightIcon />}>
                        {card.buttonText}
                      </Button>
                    </Link>
                  ) : (
                    <Button variant={card.buttonVariant} icon={<ArrowRightIcon />}>
                      {card.buttonText}
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((feature) => {
            const IconComponent = getIconComponent(feature.icon);
            return (
              <Card key={feature.id}>
                <div className="text-center">
                  <Icon size="md" color={feature.color as any} className="rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent />
                  </Icon>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  )
}