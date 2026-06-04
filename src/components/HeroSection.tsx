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
          backgroundImage: `url(https://cdn.poehali.dev/projects/45694333-96bb-4e30-b37b-6834c2922ce3/files/b2792526-308b-43d7-8d05-cfbac0242327.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/85" />
      </div>

      <nav className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-black/40 ring-1 ring-white/20 backdrop-blur rounded-full">
          <Icon name="Zap" size={18} />
          <span className="font-medium">Остов</span>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {["Продукция", "Преимущества", "Применение", "Вопросы", "Контакты"].map((item) => (
            <a
              key={item}
              href="#"
              className="px-4 py-2 bg-black/40 ring-1 ring-white/20 backdrop-blur rounded-full hover:bg-black/50 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="tel:+79993309686"
            className="px-4 py-2 bg-black/40 ring-1 ring-white/20 backdrop-blur rounded-full hover:bg-black/50 transition-colors"
          >
            +7 (999) 330-96-86
          </a>
          <Button onClick={() => onOpenModal("Коммерческое предложение")} className="bg-white text-black hover:bg-white/90 rounded-full px-6">
            Получить КП
          </Button>
        </div>
      </nav>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 text-center">
        <div className="mb-6 px-4 py-2 bg-black/40 ring-1 ring-white/20 backdrop-blur rounded-full">
          <span className="text-sm font-medium">Производитель светодиодных светильников</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-6 text-balance">
          Освещение нового уровня.
        </h1>

        <p className="text-xl md:text-2xl text-white/90 max-w-4xl mb-12 leading-relaxed text-pretty">
          Парковые и уличные светодиодные светильники OstovPark — европейская оптика и диоды, покраска в любой цвет, поставка по всей России и СНГ. Производитель — компания Остов.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Button size="lg" className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-4 text-lg">
            Смотреть каталог
          </Button>
          <Button
            size="lg"
            onClick={() => onOpenModal("Коммерческое предложение")}
            className="bg-black/40 ring-1 ring-white/20 backdrop-blur border-0 text-white hover:bg-black/50 rounded-full px-8 py-4 text-lg"
          >
            Получить коммерческое предложение
          </Button>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-black/40 ring-1 ring-white/20 backdrop-blur rounded-full">
          <Icon name="ShieldCheck" size={16} />
          <span className="text-sm font-medium">Гарантия 5 лет на все светильники</span>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
