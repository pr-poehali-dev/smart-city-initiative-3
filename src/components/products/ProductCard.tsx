import { X, Zap, Shield, Thermometer, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Product, DEFAULT_SPECS, ostovParkProducts, OSTOVPARK_SEO_KEYWORDS } from "./productsData"

const SPEC_ICONS = [Shield, Zap, Sun, Thermometer, Sun, Shield]

interface ProductCardProps {
  product: Product
  galleryIndex: number
  onClose: () => void
  onGalleryChange: (index: number) => void
  onOpenLightbox: (photos: string[], index: number) => void
  onRequestPrice: () => void
}

const ProductCard = ({ product, galleryIndex, onClose, onGalleryChange, onOpenLightbox, onRequestPrice }: ProductCardProps) => {
  const allPhotos = [product.img, ...(product.gallery ?? [])]
  const current = allPhotos[galleryIndex] ?? product.img
  const specs = product.specs ?? DEFAULT_SPECS
  const isOstovPark = ostovParkProducts.some(p => p.name === product.name)
  const imgAlt = isOstovPark ? `${product.name} — ${OSTOVPARK_SEO_KEYWORDS}` : product.name

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white ring-1 ring-gray-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        {/* Фото + галерея */}
        <div className="md:w-2/5 bg-gray-50 flex flex-col min-h-[220px]">
          <div
            className="flex-1 flex items-center justify-center p-6 cursor-zoom-in"
            onClick={() => onOpenLightbox(allPhotos, galleryIndex)}
          >
            <img
              src={current}
              alt={imgAlt}
              className="w-full max-h-64 object-contain"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          </div>
          {allPhotos.length > 1 && (
            <div className="flex gap-2 p-3 overflow-x-auto">
              {allPhotos.map((photo, i) => (
                <button
                  key={i}
                  onClick={() => onGalleryChange(i)}
                  className={`shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-colors ${i === galleryIndex ? 'border-gray-800' : 'border-gray-200 hover:border-gray-400'}`}
                >
                  <img src={photo} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Контент */}
        <div className="md:w-3/5 p-6 md:p-8 flex flex-col overflow-y-auto">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Серия OstovPark</div>
          <h3 className="text-2xl font-bold mb-2 text-gray-900">Парковый светодиодный светильник</h3>
          <p className="text-lg font-semibold text-gray-600 mb-4">{product.name}</p>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">{product.desc}</p>

          <div className="grid grid-cols-2 gap-2 mb-6">
            {specs.map((spec, i) => {
              const Icon = SPEC_ICONS[i % SPEC_ICONS.length]
              return (
                <div key={spec.label} className="flex items-start gap-2 bg-gray-50 ring-1 ring-gray-200 rounded-xl p-3">
                  <Icon className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs text-gray-400 mb-0.5">{spec.label}</div>
                    <div className="text-sm font-medium text-gray-900">{spec.value}</div>
                  </div>
                </div>
              )
            })}
          </div>

          <Button
            onClick={onRequestPrice}
            className="w-full bg-gray-900 text-white hover:bg-gray-800 rounded-xl py-3 text-base font-semibold mt-auto"
          >
            Запросить цену
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard