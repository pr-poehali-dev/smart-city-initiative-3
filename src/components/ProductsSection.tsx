import { useState, useImperativeHandle, forwardRef } from "react"
import { Button } from "@/components/ui/button"
import { products, useRequestForm, ProductsSectionRef } from "./products/productsData"
import ProductLightbox from "./products/ProductLightbox"
import ProductCard from "./products/ProductCard"
import RequestModal from "./products/RequestModal"
import type { Product, ModalState } from "./products/productsData"

export type { ProductsSectionRef }

const ProductsSection = forwardRef<ProductsSectionRef>((_, ref) => {
  const [modal, setModal] = useState<ModalState>({ open: false, product: "" })
  const [productCard, setProductCard] = useState<Product | null>(null)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [lightbox, setLightbox] = useState<{ photos: string[]; index: number } | null>(null)
  const form = useRequestForm()

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

  return (
    <>
      {lightbox && (
        <ProductLightbox
          photos={lightbox.photos}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onChangeIndex={(i) => setLightbox(lb => lb ? { ...lb, index: i } : null)}
        />
      )}

      {productCard && (
        <ProductCard
          product={productCard}
          galleryIndex={galleryIndex}
          onClose={closeProductCard}
          onGalleryChange={setGalleryIndex}
          onOpenLightbox={(photos, index) => setLightbox({ photos, index })}
          onRequestPrice={handleRequestFromCard}
        />
      )}

      {modal.open && (
        <RequestModal
          product={modal.product}
          form={form}
          onClose={closeModal}
        />
      )}

      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-white ring-1 ring-gray-300 shadow-lg p-12">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance text-gray-900">Серия OstovPark</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
                Парковые светодиодные светильники IP65 для парков, скверов, пешеходных зон и придомовых территорий.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {products.map((product) => (
                <div
                  key={product.name}
                  className="rounded-2xl bg-slate-50 ring-1 ring-gray-300 shadow-sm overflow-hidden flex flex-col cursor-pointer hover:bg-white hover:ring-gray-400 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                  onClick={() => openProductCard(product)}
                >
                  <div className="bg-white h-52 overflow-hidden">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-contain p-4"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-2">IP65</div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">Парковый светодиодный светильник {product.name}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed flex-1">{product.desc}</p>
                    <Button
                      onClick={(e) => { e.stopPropagation(); openModal(`Парковый светодиодный светильник ${product.name}`) }}
                      className="mt-4 w-full bg-gray-900 hover:bg-gray-800 text-white border-0 rounded-lg text-sm"
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
                  className="bg-gray-900 text-white hover:bg-gray-800 rounded-full px-12 py-4 text-lg font-semibold"
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
