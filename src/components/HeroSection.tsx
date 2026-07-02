import Icon from "@/components/ui/icon"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  onOpenModal: (product: string) => void
}

const HeroSection = ({ onOpenModal }: HeroSectionProps) => {
  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(https://cdn.poehali.dev/projects/45694333-96bb-4e30-b37b-6834c2922ce3/files/5b41a6aa-6712-48ee-8909-78b0f2e0a53b.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/75" />
      </div>

      {/* Тёмная шапка */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 bg-gray-900/90 backdrop-blur border-b border-white/10">
        <div className="flex items-center gap-2">
          <Icon name="Zap" size={18} className="text-white" />
          <span className="font-semibold text-white text-lg">Остов</span>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {["Продукция", "Преимущества", "Применение", "Вопросы", "Контакты"].map((item) => (
            <a
              key={item}
              href="#"
              className="px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors text-sm"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="tel:88002013733"
            className="px-4 py-2 text-white/80 hover:text-white transition-colors text-sm"
          >
            8 (800) 201-37-33
          </a>
          <Button onClick={() => onOpenModal("Коммерческое предложение")} className="bg-white text-gray-900 hover:bg-gray-100 rounded-full px-5 py-2 text-sm font-semibold">
            Получить КП
          </Button>
        </div>
      </nav>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-72px)] px-6 text-center">
        <div className="mb-6 px-4 py-2 bg-white/10 ring-1 ring-white/20 backdrop-blur rounded-full">
          <span className="text-sm font-medium text-white/90">Производитель светодиодных светильников</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-6 text-balance text-white">
          Освещение нового уровня.
        </h1>

        <p className="text-xl md:text-2xl text-white/80 max-w-4xl mb-12 leading-relaxed text-pretty">
          Парковые и уличные светодиодные светильники OstovPark — европейская оптика и диоды, покраска в любой цвет, поставка по всей России и СНГ. Производитель — компания Остов.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 rounded-full px-8 py-4 text-lg font-semibold">
            Смотреть каталог
          </Button>
          <Button
            size="lg"
            onClick={() => onOpenModal("Коммерческое предложение")}
            className="bg-white/10 ring-1 ring-white/30 backdrop-blur border-0 text-white hover:bg-white/20 rounded-full px-8 py-4 text-lg"
          >
            Получить коммерческое предложение
          </Button>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-white/10 ring-1 ring-white/20 backdrop-blur rounded-full">
          <Icon name="ShieldCheck" size={16} className="text-white/80" />
          <span className="text-sm font-medium text-white/80">Гарантия 5 лет на все светильники</span>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
