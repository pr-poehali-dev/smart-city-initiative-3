import { Plus, Minus } from "lucide-react"
import { useState } from "react"

interface FAQ {
  question: string
  answer: string
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

const FaqSection = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <section className="relative z-10 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl bg-white ring-1 ring-gray-300 shadow-lg p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance text-gray-900">Частые вопросы</h2>
              <p className="text-xl text-gray-600 leading-relaxed text-pretty">
                Всё о наших светильниках: характеристики, покраска, гарантия, работа с организациями и тендерами.
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="rounded-2xl bg-slate-50 ring-1 ring-gray-300 overflow-hidden shadow-sm">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                  >
                    <h3 className="text-lg font-semibold pr-4 text-gray-900">{faq.question}</h3>
                    {openFaq === index ? <Minus className="w-5 h-5 flex-shrink-0 text-gray-500" /> : <Plus className="w-5 h-5 flex-shrink-0 text-gray-500" />}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FaqSection