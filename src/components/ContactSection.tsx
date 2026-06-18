import { CheckCircle } from "lucide-react"
import Icon from "@/components/ui/icon"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const SEND_URL = "https://functions.poehali.dev/1dff2903-7852-4d42-8659-930221875f94"

const ContactForm = () => {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
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
        body: JSON.stringify({ name, phone, message, product: "" }),
      })
      if (res.ok) {
        setSuccess(true)
      } else {
        setError("Ошибка отправки. Позвоните нам напрямую.")
      }
    } catch {
      setError("Ошибка соединения. Позвоните нам напрямую.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl bg-white/95 text-black p-8 shadow-2xl flex flex-col items-center justify-center min-h-64">
        <CheckCircle className="w-14 h-14 text-green-500 mb-4" />
        <h3 className="text-2xl font-bold mb-2">Заявка отправлена!</h3>
        <p className="text-gray-600 text-center">Менеджер свяжется с вами в течение рабочего дня.</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-white/95 text-black p-8 shadow-2xl">
      <h3 className="text-2xl font-bold mb-6">Отправить запрос</h3>
      <form className="space-y-6" onSubmit={submit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">Имя</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ваше имя или название организации"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">Телефон</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+7 (___) ___-__-__"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">Что вас интересует?</label>
          <textarea
            id="message"
            rows={5}
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Расскажите о вашем объекте или задаче — подберём оптимальное решение..."
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white hover:bg-gray-800 rounded-lg py-3 font-normal text-base"
        >
          {loading ? "Отправляем..." : "Отправить запрос"}
        </Button>
      </form>
    </div>
  )
}

const ContactSection = () => {
  return (
    <>
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-white/10 ring-1 ring-white/15 backdrop-blur p-12">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance">Свяжитесь с нами</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <ContactForm />

              <div className="space-y-8">
                <p className="text-xl text-white/90 leading-relaxed text-pretty">
                  Подберём светильники под ваш объект, рассчитаем проект освещения, предоставим коммерческое предложение и полный пакет документов для тендера.
                </p>

                <div className="rounded-2xl bg-white/95 text-black p-6 shadow-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                      <Icon name="Phone" size={28} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">Отдел продаж</h4>
                      <p className="text-gray-600">Остов — производитель</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <a href="tel:88002013733">
                      <Button className="w-full bg-black text-white hover:bg-gray-800 rounded-lg flex items-center justify-center gap-2 py-3">
                        <Icon name="Phone" size={16} />
                        8 (800) 201-37-33
                      </Button>
                    </a>
                    <a href="mailto:ooo.ostov@mail.ru">
                      <Button variant="outline" className="w-full rounded-lg flex items-center justify-center gap-2 py-3">
                        <Icon name="Mail" size={16} />
                        ooo.ostov@mail.ru
                      </Button>
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-2xl bg-white/10 ring-1 ring-white/20 p-6 text-center">
                    <div className="text-3xl font-bold mb-2">10+</div>
                    <p className="text-white/80 text-sm">лет на рынке</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 ring-1 ring-white/20 p-6 text-center">
                    <div className="text-3xl font-bold mb-2">5000+</div>
                    <p className="text-white/80 text-sm">объектов сдано</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 ring-1 ring-white/20 p-6 text-center">
                    <div className="text-3xl font-bold mb-2">5 лет</div>
                    <p className="text-white/80 text-sm">гарантия</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Icon name="Zap" size={18} />
            <span className="font-medium">Остов</span>
          </div>
          <p className="text-white/50 text-sm text-center">
            © 2024 Остов. Производитель светодиодных светильников. Доставка по России и СНГ.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <a href="tel:88002013733" className="text-white/70 hover:text-white transition-colors">
              8 (800) 201-37-33
            </a>
            <a href="mailto:ooo.ostov@mail.ru" className="text-white/70 hover:text-white transition-colors">
              ooo.ostov@mail.ru
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default ContactSection