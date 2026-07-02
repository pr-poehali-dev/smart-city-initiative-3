import { X, CheckCircle, Paperclip } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef } from "react"

interface RequestForm {
  name: string
  setName: (v: string) => void
  phone: string
  setPhone: (v: string) => void
  message: string
  setMessage: (v: string) => void
  file: File | null
  setFile: (f: File | null) => void
  loading: boolean
  success: boolean
  error: string
  submit: (product: string) => void
}

interface RequestModalProps {
  product: string
  form: RequestForm
  onClose: () => void
}

const RequestModal = ({ product, form, onClose }: RequestModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white ring-1 ring-gray-200 rounded-3xl p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {form.success ? (
          <div className="text-center py-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2 text-gray-900">Заявка отправлена!</h3>
            <p className="text-gray-500 mb-6">Менеджер свяжется с вами в течение рабочего дня.</p>
            <Button onClick={onClose} className="bg-gray-900 text-white hover:bg-gray-800 rounded-full px-8">
              Закрыть
            </Button>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-bold mb-1 text-gray-900">Запросить цену</h3>
            <p className="text-gray-400 text-sm mb-6">{product}</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Имя или организация *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => form.setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 ring-1 ring-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  placeholder="Иван Иванов"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Телефон *</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => form.setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 ring-1 ring-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Комментарий</label>
                <textarea
                  value={form.message}
                  onChange={e => form.setMessage(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 ring-1 ring-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
                  placeholder="Количество, объект, сроки..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Прикрепить файл</label>
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
                  className="flex items-center gap-2 w-full px-4 py-3 rounded-xl bg-gray-50 ring-1 ring-gray-200 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors text-sm text-left"
                >
                  <Paperclip className="w-4 h-4 shrink-0" />
                  {form.file ? (
                    <span className="text-gray-800 truncate">{form.file.name}</span>
                  ) : (
                    <span>Техзадание, план, фото объекта...</span>
                  )}
                </button>
              </div>

              {form.error && (
                <p className="text-red-500 text-sm">{form.error}</p>
              )}

              <Button
                onClick={() => form.submit(product)}
                disabled={form.loading}
                className="w-full bg-gray-900 text-white hover:bg-gray-800 rounded-xl py-3 text-base font-medium"
              >
                {form.loading ? "Отправляем..." : "Отправить заявку"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default RequestModal
