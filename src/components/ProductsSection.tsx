import { X, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useImperativeHandle, forwardRef } from "react"

const SEND_URL = "https://functions.poehali.dev/1dff2903-7852-4d42-8659-930221875f94"

interface ModalState {
  open: boolean
  product: string
}

export interface ProductsSectionRef {
  openModal: (product: string) => void
}

const useRequestForm = () => {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const reset = () => {
    setName(""); setPhone(""); setMessage(""); setSuccess(false); setError("")
  }

  const submit = async (product: string) => {
    if (!name.trim() || !phone.trim()) {
      setError("Пожалуйста, заполните имя и телефон")
      return
    }
    setLoading(true)
    setError("")
    try {
      const res = await fetch(SEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message, product }),
      })
      if (res.ok) {
        setSuccess(true)
      } else {
        setError("Ошибка отправки. Попробуйте позвонить нам напрямую.")
      }
    } catch {
      setError("Ошибка соединения. Попробуйте позвонить нам напрямую.")
    } finally {
      setLoading(false)
    }
  }

  return { name, setName, phone, setPhone, message, setMessage, loading, success, error, reset, submit }
}

const products = [
  {
    name: "OstovPark C1-8",
    img: "https://extrl.ru/upload/resize_cache/iblock/313/hcc61bmu12vqibbeccf3jhrokzfbr8wa/1000_540_1/ParkRay%20BL1A%20L1000_300.4373%20(1152%D1%851080).png",
    desc: "Классическая форма для аллей и пешеходных дорожек. Равномерное рассеивание света, защита IP65.",
  },
  {
    name: "OstovPark K1-8",
    img: "https://extrl.ru/upload/iblock/7e1/zzd1ot0ygurirppi067c8yjhfjtb2dgq/PR%20BL1DT1_500%20(1000%D1%85540)%20%D1%81%D0%BF%D0%B5%D1%80%D0%B5%D0%B4%D0%B8.4532.png",
    desc: "Современный дизайн для парков и скверов. Оптика европейского качества, долгий срок службы.",
  },
  {
    name: "OstovPark X1-8",
    img: "https://extrl.ru/upload/resize_cache/iblock/e3b/ncc2gch3a0uzgeagentorxmxdcv2iwcc/1000_540_1/%D0%90%D0%AD%D0%9A-101_25.0822%20%D0%A1%D0%B2%D0%B5%D1%82%D0%B8%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA%204%20%D0%BC%20120%20%D0%B3%D1%80%202%20%D0%B1%D0%BB%D0%BE%D0%BA%D0%B0%20(1152%D1%851080).png",
    desc: "X-образная конструкция на 2 блока. Подходит для освещения широких зон и перекрёстков дорожек.",
  },
  {
    name: "OstovPark L1-8",
    img: "https://extrl.ru/upload/resize_cache/iblock/610/jm0t0keh7aak23a09c7tfh8nnxbcxb5r/1000_540_1/%D0%90%D0%AD%D0%9A-101_03.0822%20(%D0%A1%D0%B2%D0%B5%D1%82%D0%B8%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA%204%20%D0%BC).18%20(1152%D1%851080).png",
    desc: "L-образная форма для монтажа на опору у стен и ограждений. Направленный световой поток.",
  },
  {
    name: "OstovPark Y1-8",
    img: "https://extrl.ru/upload/resize_cache/iblock/a5d/zicyerh47tdjwrndg685fl8gnifgvsw6/1000_540_1/%D0%90%D0%AD%D0%9A-101_31.0822%20%D0%A1%D0%B2%D0%B5%D1%82%D0%B8%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA%204%20%D0%BC%20Y-%D0%BE%D0%B1%D1%80%204%20%D0%B1%D0%BB%D0%BE%D0%BA%D0%B0.png",
    desc: "Y-образная конструкция на 4 блока. Максимальное покрытие для больших парковых территорий.",
  },
  {
    name: "OstovPark T1-8",
    img: "https://cdn.poehali.dev/projects/45694333-96bb-4e30-b37b-6834c2922ce3/bucket/245f35a8-0749-415d-8903-07d4a8b2a9e1.png",
    desc: "Т-образная конструкция с двумя световыми блоками. Освещение аллей и широких пешеходных зон.",
  },
  {
    name: "OstovPark Triple1-8",
    img: "https://cdn.poehali.dev/projects/45694333-96bb-4e30-b37b-6834c2922ce3/bucket/f3de18f3-ceba-491b-aa7a-64b289a7d75b.jpg",
    desc: "Тройная конструкция с тремя световыми блоками. Для освещения перекрёстков и площадей.",
  },
  {
    name: "OstovPark Q1-8",
    img: "https://cdn.poehali.dev/projects/45694333-96bb-4e30-b37b-6834c2922ce3/bucket/f3de18f3-ceba-491b-aa7a-64b289a7d75b.jpg",
    desc: "Четырёхсторонняя конструкция для равномерного освещения больших открытых пространств.",
  },
  {
    name: "OstovPark CL1-8",
    img: "https://cdn.poehali.dev/projects/45694333-96bb-4e30-b37b-6834c2922ce3/bucket/f3de18f3-ceba-491b-aa7a-64b289a7d75b.jpg",
    desc: "Компактная модель с одним направленным блоком. Для входных групп и узких дорожек.",
  },
  {
    name: "OstovPark CT1-8",
    img: "https://cdn.poehali.dev/projects/45694333-96bb-4e30-b37b-6834c2922ce3/bucket/f3de18f3-ceba-491b-aa7a-64b289a7d75b.jpg",
    desc: "Комбинированная конструкция с верхним и боковым блоком. Универсальное решение для парков.",
  },
]

const ProductsSection = forwardRef<ProductsSectionRef>((_, ref) => {
  const [modal, setModal] = useState<ModalState>({ open: false, product: "" })
  const form = useRequestForm()

  const openModal = (product: string) => {
    form.reset()
    setModal({ open: true, product })
  }

  const closeModal = () => {
    setModal({ open: false, product: "" })
    form.reset()
  }

  useImperativeHandle(ref, () => ({ openModal }))

  return (
    <>
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative w-full max-w-md bg-[#2a3347] ring-1 ring-white/20 rounded-3xl p-8 shadow-2xl">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {form.success ? (
              <div className="text-center py-6">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Заявка отправлена!</h3>
                <p className="text-white/70 mb-6">Менеджер свяжется с вами в течение рабочего дня.</p>
                <Button onClick={closeModal} className="bg-white text-black hover:bg-white/90 rounded-full px-8">
                  Закрыть
                </Button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-1">Запросить цену</h3>
                <p className="text-white/50 text-sm mb-6">{modal.product}</p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">Имя или организация *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => form.setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 ring-1 ring-white/15 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/40"
                      placeholder="Иван Иванов"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">Телефон *</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => form.setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 ring-1 ring-white/15 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/40"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">Комментарий</label>
                    <textarea
                      value={form.message}
                      onChange={e => form.setMessage(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 ring-1 ring-white/15 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/40 resize-none"
                      placeholder="Количество, объект, сроки..."
                    />
                  </div>

                  {form.error && (
                    <p className="text-red-400 text-sm">{form.error}</p>
                  )}

                  <Button
                    onClick={() => form.submit(modal.product)}
                    disabled={form.loading}
                    className="w-full bg-white text-black hover:bg-white/90 rounded-xl py-3 text-base font-medium"
                  >
                    {form.loading ? "Отправляем..." : "Отправить заявку"}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-white/10 ring-1 ring-white/15 backdrop-blur p-12">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance">Серия OstovPark</h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto text-pretty">
                Парковые светодиодные светильники IP65 для парков, скверов, пешеходных зон и придомовых территорий.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {products.map((product) => (
                <div key={product.name} className="rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur overflow-hidden flex flex-col">
                  <div className="bg-white/15 h-52 overflow-hidden">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-contain p-4"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="text-xs font-medium text-white/60 uppercase tracking-widest mb-2">IP65</div>
                    <h3 className="text-lg font-semibold mb-3">Парковый светодиодный светильник {product.name}</h3>
                    <p className="text-white/85 text-sm leading-relaxed flex-1">{product.desc}</p>
                    <Button
                      onClick={() => openModal(`Парковый светодиодный светильник ${product.name}`)}
                      className="mt-4 w-full bg-white/20 hover:bg-white/30 text-white border-0 rounded-lg text-sm"
                    >
                      Запросить цену
                    </Button>
                  </div>
                </div>
              ))}
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
    </>
  )
})

ProductsSection.displayName = "ProductsSection"

export default ProductsSection