import { Zap, ShieldCheck, Thermometer, Leaf, Plus, Minus, Phone, Sun, Clock, Award } from "lucide-react"
import Icon from "@/components/ui/icon"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface FAQ {
  question: string
  answer: string
}

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqs: FAQ[] = [
    {
      question: "Какой срок службы светодиодных светильников?",
      answer:
        "Наши светодиодные светильники рассчитаны на срок службы от 50 000 до 100 000 часов работы. При среднесуточном включении 12 часов это более 10 лет без замены источника света.",
    },
    {
      question: "Можно ли заказать покраску в нестандартный цвет?",
      answer:
        "Да, мы производим покраску корпуса светильников в любой цвет по каталогу RAL. Индивидуальная покраска доступна при заказе от 10 единиц. Стандартные цвета — антрацит, черный, серый, зеленый.",
    },
    {
      question: "Какая степень защиты у ваших светильников?",
      answer:
        "Все уличные и парковые светильники имеют степень защиты не ниже IP65, что обеспечивает полную защиту от пыли и струй воды. Корпус выполнен из литого алюминиевого сплава и устойчив к коррозии.",
    },
    {
      question: "Как оформить заказ для организации или тендера?",
      answer:
        "Мы работаем с юридическими лицами: предоставляем полный пакет документов, коммерческое предложение, технические паспорта и сертификаты. Свяжитесь с нами по телефону или через форму — менеджер ответит в течение рабочего дня.",
    },
  ]

  return (
    <div className="min-h-screen bg-[#0B0F12] text-white">
      {/* Hero Section */}
      <div className="relative min-h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(https://cdn.poehali.dev/projects/45694333-96bb-4e30-b37b-6834c2922ce3/files/b2792526-308b-43d7-8d05-cfbac0242327.jpg)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/85" />
        </div>

        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between p-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-black/40 ring-1 ring-white/20 backdrop-blur rounded-full">
            <Icon name="Zap" size={18} />
            <span className="font-medium">ExterLight</span>
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
            <Button className="bg-white text-black hover:bg-white/90 rounded-full px-6">Получить КП</Button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 text-center">
          <div className="mb-6 px-4 py-2 bg-black/40 ring-1 ring-white/20 backdrop-blur rounded-full">
            <span className="text-sm font-medium">Производитель светодиодных светильников</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-6 text-balance">
            Освещение нового уровня.
          </h1>

          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mb-12 leading-relaxed text-pretty">
            Парковые и уличные светодиодные светильники ParkRay — европейская оптика и диоды, покраска в любой цвет, поставка по всей России и СНГ.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button size="lg" className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-4 text-lg">
              Смотреть каталог
            </Button>
            <Button
              size="lg"
              variant="outline"
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

      {/* Features Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            <div className="rounded-2xl bg-black/20 ring-1 ring-white/15 backdrop-blur p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-black/30 ring-1 ring-white/20 mb-6">
                <Icon name="Zap" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Энергоэффективность</h3>
              <p className="text-white/80 leading-relaxed">До 70% экономии электроэнергии по сравнению с традиционными лампами.</p>
            </div>

            <div className="rounded-2xl bg-black/20 ring-1 ring-white/15 backdrop-blur p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-black/30 ring-1 ring-white/20 mb-6">
                <Icon name="ShieldCheck" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Защита IP65</h3>
              <p className="text-white/80 leading-relaxed">Полная защита от пыли и воды. Работает в любых климатических условиях.</p>
            </div>

            <div className="rounded-2xl bg-black/20 ring-1 ring-white/15 backdrop-blur p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-black/30 ring-1 ring-white/20 mb-6">
                <Icon name="Clock" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Срок службы 10+ лет</h3>
              <p className="text-white/80 leading-relaxed">До 100 000 часов работы без замены источника света и обслуживания.</p>
            </div>

            <div className="rounded-2xl bg-black/20 ring-1 ring-white/15 backdrop-blur p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-black/30 ring-1 ring-white/20 mb-6">
                <Icon name="Leaf" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Экология</h3>
              <p className="text-white/80 leading-relaxed">Не содержит ртути и вредных веществ. Безопасны для людей и окружающей среды.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 backdrop-blur p-12">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance">Серия ParkRay</h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto text-pretty">
                Светильники для парков, скверов, пешеходных зон и придомовых территорий.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur p-8 h-80 flex flex-col">
                <div className="flex-1">
                  <div className="text-3xl font-bold text-white/60 mb-4">20 Вт</div>
                  <h3 className="text-xl font-semibold mb-4">ParkRay BL1 Mini</h3>
                  <p className="text-white/80 leading-relaxed text-sm">
                    Компактный светильник для дорожек, аллей и входных групп. Световой поток 2 400 лм. Цветовая температура 4000К.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur p-8 h-80 flex flex-col">
                <div className="flex-1">
                  <div className="text-3xl font-bold text-white/60 mb-4">40 Вт</div>
                  <h3 className="text-xl font-semibold mb-4">ParkRay BL1</h3>
                  <p className="text-white/80 leading-relaxed text-sm">
                    Универсальная модель для парковых зон. Световой поток 5 200 лм. Угол рассеивания 120°. Монтаж на опору или кронштейн.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur p-8 h-80 flex flex-col">
                <div className="flex-1">
                  <div className="text-3xl font-bold text-white/60 mb-4">80 Вт</div>
                  <h3 className="text-xl font-semibold mb-4">ParkRay BL1 Max</h3>
                  <p className="text-white/80 leading-relaxed text-sm">
                    Для крупных парков и площадей. Световой поток 10 400 лм. Высота установки до 12 м. Диммирование 0–10В.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur p-8 h-80 flex flex-col">
                <div className="flex-1">
                  <div className="text-3xl font-bold text-white/60 mb-4">120 Вт</div>
                  <h3 className="text-xl font-semibold mb-4">ParkRay BL1 Pro</h3>
                  <p className="text-white/80 leading-relaxed text-sm">
                    Профессиональный светильник для освещения улиц и больших территорий. Световой поток 15 600 лм. Управление DALI.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90 rounded-full px-12 py-4 text-lg font-semibold"
              >
                Скачать полный каталог
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 backdrop-blur p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance">
                  Частые вопросы
                </h2>
                <p className="text-xl text-white/80 leading-relaxed text-pretty">
                  Всё о наших светильниках: характеристики, покраска, гарантия, работа с организациями и тендерами.
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                    >
                      <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                      {openFaq === index ? (
                        <Minus className="w-5 h-5 flex-shrink-0" />
                      ) : (
                        <Plus className="w-5 h-5 flex-shrink-0" />
                      )}
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-6">
                        <p className="text-white/80 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-black/20 ring-1 ring-white/15 backdrop-blur p-12">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance">Свяжитесь с нами</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div className="rounded-2xl bg-white/95 text-black p-8 shadow-2xl">
                <h3 className="text-2xl font-bold mb-6">Отправить запрос</h3>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Имя</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ваше имя или название организации"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">Телефон</label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Что вас интересует?</label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Расскажите о вашем объекте или задаче — подберём оптимальное решение..."
                    />
                  </div>
                  <Button className="w-full bg-black text-white hover:bg-gray-800 rounded-lg py-3 font-normal text-base">
                    Отправить запрос
                  </Button>
                </form>
              </div>

              <div className="space-y-8">
                <div>
                  <p className="text-xl text-white/90 leading-relaxed text-pretty">
                    Подберём светильники под ваш объект, рассчитаем проект освещения, предоставим коммерческое предложение и полный пакет документов для тендера.
                  </p>
                </div>

                <div className="rounded-2xl bg-white/95 text-black p-6 shadow-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                      <Icon name="Phone" size={28} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">Отдел продаж</h4>
                      <p className="text-gray-600">ExterLight — производитель</p>
                    </div>
                  </div>
                  <Button className="w-full bg-black text-white hover:bg-gray-800 rounded-lg flex items-center justify-center gap-2 py-3">
                    <Icon name="Phone" size={16} />
                    8 (800) 511-36-12 — бесплатно
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 text-center">
                    <div className="text-3xl font-bold mb-2">10+</div>
                    <p className="text-white/70 text-sm">лет на рынке</p>
                  </div>
                  <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 text-center">
                    <div className="text-3xl font-bold mb-2">5000+</div>
                    <p className="text-white/70 text-sm">объектов сдано</p>
                  </div>
                  <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 text-center">
                    <div className="text-3xl font-bold mb-2">5 лет</div>
                    <p className="text-white/70 text-sm">гарантия</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Icon name="Zap" size={18} />
            <span className="font-medium">ExterLight</span>
          </div>
          <p className="text-white/50 text-sm text-center">
            © 2024 ExterLight. Производитель светодиодных светильников. Доставка по России и СНГ.
          </p>
          <a href="tel:88005113612" className="text-white/70 hover:text-white transition-colors">
            8 (800) 511-36-12
          </a>
        </div>
      </footer>
    </div>
  )
}

export default Index