import { X, CheckCircle, Paperclip, Zap, Shield, Thermometer, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useImperativeHandle, forwardRef, useRef } from "react"

const SEND_URL = "https://functions.poehali.dev/1dff2903-7852-4d42-8659-930221875f94"
const UPLOAD_URL = "https://functions.poehali.dev/2e76e395-e976-4652-b649-6e22e1dd48c1"

interface ModalState {
  open: boolean
  product: string
}

interface Product {
  name: string
  img: string
  desc: string
  specs?: { label: string; value: string }[]
  gallery?: string[]
}

export interface ProductsSectionRef {
  openModal: (product: string) => void
}

const useRequestForm = () => {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const reset = () => {
    setName(""); setPhone(""); setMessage(""); setFile(null); setSuccess(false); setError("")
  }

  const submit = async (product: string) => {
    if (!name.trim() || !phone.trim()) {
      setError("Пожалуйста, заполните имя и телефон")
      return
    }
    setLoading(true)
    setError("")
    try {
      let file_url = ""
      if (file) {
        const buf = await file.arrayBuffer()
        const b64 = btoa(String.fromCharCode(...new Uint8Array(buf)))
        const upRes = await fetch(UPLOAD_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ file_data: b64, file_name: file.name, file_type: file.type }),
        })
        if (upRes.ok) {
          const upData = await upRes.json()
          file_url = upData.url || ""
        }
      }

      const res = await fetch(SEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message, product, file_url }),
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

  return { name, setName, phone, setPhone, message, setMessage, file, setFile, loading, success, error, reset, submit }
}

const DEFAULT_SPECS = [
  { label: "Степень защиты", value: "IP65" },
  { label: "Мощность", value: "8–80 Вт" },
  { label: "Цвет корпуса", value: "RAL по запросу" },
  { label: "Температура", value: "−40°C до +50°C" },
  { label: "Срок службы", value: "50 000 ч" },
  { label: "Гарантия", value: "3 года" },
]

const products: Product[] = [
  {
    name: "OstovPark C1-8",
    img: "https://extrl.ru/upload/resize_cache/iblock/313/hcc61bmu12vqibbeccf3jhrokzfbr8wa/1000_540_1/ParkRay%20BL1A%20L1000_300.4373%20(1152%D1%851080).png",
    desc: "Классическая форма для аллей и пешеходных дорожек. Равномерное рассеивание света, защита IP65.",
    gallery: [
      "https://cdn.poehali.dev/projects/45694333-96bb-4e30-b37b-6834c2922ce3/bucket/48c57736-63a3-4fa7-97b2-5bbbc08ee59f.jpeg",
      "https://cdn.poehali.dev/projects/45694333-96bb-4e30-b37b-6834c2922ce3/bucket/c1e8626b-da35-4750-84ef-ead543ea708b.jpeg",
      "https://cdn.poehali.dev/projects/45694333-96bb-4e30-b37b-6834c2922ce3/bucket/a32ceeea-cb0c-4ff9-826d-025f74eab3ac.jpeg",
      "https://cdn.poehali.dev/projects/45694333-96bb-4e30-b37b-6834c2922ce3/bucket/4cdecf6a-3595-4da1-8f40-eadaf6a1c30e.jpeg",
      "https://cdn.poehali.dev/projects/45694333-96bb-4e30-b37b-6834c2922ce3/bucket/8e46ab9d-c14a-49c2-9997-7f009d661037.jpeg",
    ],
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
    img: "https://cdn.poehali.dev/projects/45694333-96bb-4e30-b37b-6834c2922ce3/bucket/d6c6f88c-6885-424e-9f0f-797deb3447c4.png",
    desc: "Тройная конструкция с тремя световыми блоками. Для освещения перекрёстков и площадей.",
  },
  {
    name: "OstovPark Q1-8",
    img: "https://cdn.poehali.dev/projects/45694333-96bb-4e30-b37b-6834c2922ce3/bucket/92a698f7-8544-4f93-92c9-b02a2324f6ef.png",
    desc: "Четырёхсторонняя конструкция для равномерного освещения больших открытых пространств.",
  },
  {
    name: "OstovPark CL1-8",
    img: "https://cdn.poehali.dev/projects/45694333-96bb-4e30-b37b-6834c2922ce3/bucket/4f8a3ec4-47e1-428e-86be-2fd58987682f.png",
    desc: "Компактная модель с одним направленным блоком. Для входных групп и узких дорожек.",
  },
  {
    name: "OstovPark CT1-8",
    img: "https://cdn.poehali.dev/projects/45694333-96bb-4e30-b37b-6834c2922ce3/bucket/59e541c0-e9b3-484c-9abc-df25bef7c465.png",
    desc: "Комбинированная конструкция с верхним и боковым блоком. Универсальное решение для парков.",
  },
  {
    name: "OstovPark CY1-8",
    img: "https://cdn.poehali.dev/projects/45694333-96bb-4e30-b37b-6834c2922ce3/bucket/dd49d57d-ba8f-49c9-a681-d757c505c905.png",
    desc: "Y-образная конструкция с двумя световыми блоками. Стильное решение для аллей и парковых зон.",
  },
  {
    name: "OstovPark CX1-8",
    img: "https://cdn.poehali.dev/projects/45694333-96bb-4e30-b37b-6834c2922ce3/bucket/812ff3f2-0391-4f5f-9432-0fa13f82dc48.png",
    desc: "Изогнутая конструкция с одним световым блоком. Элегантный дизайн для парков и пешеходных зон.",
  },
]

const SPEC_ICONS = [Shield, Zap, Sun, Thermometer, Sun, Shield]

const ProductsSection = forwardRef<ProductsSectionRef>((_, ref) => {
  const [modal, setModal] = useState<ModalState>({ open: false, product: "" })
  const [productCard, setProductCard] = useState<Product | null>(null)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [lightbox, setLightbox] = useState<{ photos: string[]; index: number } | null>(null)
  const form = useRequestForm()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const openModal = (product: string) => {
    form.reset()
    setModal({ open: true, product })
  }

  const closeModal = () => {
    setModal({ open: false, product: "" })
    form.reset()
  }

  const openProductCard = (product: Product) => {
    setProductCard(product)
    setGalleryIndex(0)
  }

  const closeProductCard = () => {
    setProductCard(null)
  }

  const handleRequestFromCard = () => {
    if (!productCard) return
    closeProductCard()
    openModal(`Парковый светодиодный светильник ${productCard.name}`)
  }

  useImperativeHandle(ref, () => ({ openModal }))

  const specs = productCard?.specs ?? DEFAULT_SPECS

  return (
    <>
      {/* Лайтбокс */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X className="w-6 h-6" />
          </button>

          {lightbox.photos.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                onClick={(e) => { e.stopPropagation(); setLightbox(lb => lb ? { ...lb, index: (lb.index - 1 + lb.photos.length) % lb.photos.length } : null) }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                onClick={(e) => { e.stopPropagation(); setLightbox(lb => lb ? { ...lb, index: (lb.index + 1) % lb.photos.length } : null) }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </>
          )}

          <img
            src={lightbox.photos[lightbox.index]}
            alt=""
            className="max-w-full max-h-full object-contain select-none"
            onClick={(e) => e.stopPropagation()}
          />

          {lightbox.photos.length > 1 && (
            <div className="absolute bottom-4 flex gap-2">
              {lightbox.photos.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightbox(lb => lb ? { ...lb, index: i } : null) }}
                  className={`w-2 h-2 rounded-full transition-colors ${i === lightbox.index ? 'bg-white' : 'bg-white/30'}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Карточка товара */}
      {productCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={closeProductCard} />
          <div className="relative w-full max-w-2xl bg-[#1e2a40] ring-1 ring-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
            <button
              onClick={closeProductCard}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Фото + галерея */}
            <div className="md:w-2/5 bg-white/10 flex flex-col min-h-[220px]">
              {(() => {
                const allPhotos = [productCard.img, ...(productCard.gallery ?? [])]
                const current = allPhotos[galleryIndex] ?? productCard.img
                return (
                  <>
                    <div
                      className="flex-1 flex items-center justify-center p-6 cursor-zoom-in"
                      onClick={() => setLightbox({ photos: allPhotos, index: galleryIndex })}
                    >
                      <img
                        src={current}
                        alt={productCard.name}
                        className="w-full max-h-64 object-contain"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                      />
                    </div>
                    {allPhotos.length > 1 && (
                      <div className="flex gap-2 p-3 overflow-x-auto">
                        {allPhotos.map((photo, i) => (
                          <button
                            key={i}
                            onClick={() => setGalleryIndex(i)}
                            className={`shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-colors ${i === galleryIndex ? 'border-white' : 'border-white/20 hover:border-white/50'}`}
                          >
                            <img src={photo} alt="" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )
              })()}
            </div>

            {/* Контент */}
            <div className="md:w-3/5 p-6 md:p-8 flex flex-col overflow-y-auto">
              <div className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">Серия OstovPark</div>
              <h3 className="text-2xl font-bold mb-2">Парковый светодиодный светильник</h3>
              <p className="text-lg font-semibold text-white/70 mb-4">{productCard.name}</p>
              <p className="text-white/75 text-sm leading-relaxed mb-6">{productCard.desc}</p>

              {/* Характеристики */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                {specs.map((spec, i) => {
                  const Icon = SPEC_ICONS[i % SPEC_ICONS.length]
                  return (
                    <div key={spec.label} className="flex items-start gap-2 bg-white/5 rounded-xl p-3">
                      <Icon className="w-4 h-4 text-white/40 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs text-white/40 mb-0.5">{spec.label}</div>
                        <div className="text-sm font-medium text-white">{spec.value}</div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <Button
                onClick={handleRequestFromCard}
                className="w-full bg-white text-black hover:bg-white/90 rounded-xl py-3 text-base font-semibold mt-auto"
              >
                Запросить цену
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Форма заявки */}
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

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">Прикрепить файл</label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.zip"
                      onChange={e => form.setFile(e.target.files?.[0] ?? null)}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 w-full px-4 py-3 rounded-xl bg-white/5 ring-1 ring-white/15 text-white/60 hover:bg-white/10 hover:text-white transition-colors text-sm text-left"
                    >
                      <Paperclip className="w-4 h-4 shrink-0" />
                      {form.file ? (
                        <span className="text-white truncate">{form.file.name}</span>
                      ) : (
                        <span>Техзадание, план, фото объекта...</span>
                      )}
                    </button>
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
                <div
                  key={product.name}
                  className="rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur overflow-hidden flex flex-col cursor-pointer hover:bg-white/15 hover:ring-white/40 hover:scale-[1.02] transition-all duration-200"
                  onClick={() => openProductCard(product)}
                >
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
                      onClick={(e) => { e.stopPropagation(); openModal(`Парковый светодиодный светильник ${product.name}`) }}
                      className="mt-4 w-full bg-white/20 hover:bg-white/30 text-white border-0 rounded-lg text-sm"
                    >
                      Запросить цену
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <a href="https://cloud.mail.ru/public/9Unf/Nw17VWLCi" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-white/90 rounded-full px-12 py-4 text-lg font-semibold"
                >
                  Скачать полный каталог
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
})

ProductsSection.displayName = "ProductsSection"

export default ProductsSection