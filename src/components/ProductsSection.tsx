import { useState, useImperativeHandle, forwardRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { productGroups, useRequestForm, ProductsSectionRef, OSTOVPARK_SEO_KEYWORDS } from "./products/productsData"
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
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({ ostovpark: false, ostovterra: false })
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

  const toggleGroup = (id: string) => {
    setOpenGroups(prev => ({ ...prev, [id]: !prev[id] }))
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
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance text-gray-900">Каталог</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
                Светодиодные светильники для парков, скверов, ландшафтного освещения и архитектурной подсветки.
              </p>
            </div>

            <div className="space-y-6 mb-12">
              {productGroups.map((group) => {
                const isOpen = openGroups[group.id] ?? false
                const isOstovPark = group.id === "ostovpark"
                const PREVIEW_COUNT = 3
                const visibleProducts = isOstovPark && !isOpen
                  ? group.products.slice(0, PREVIEW_COUNT)
                  : group.products
                const hasMore = isOstovPark && group.products.length > PREVIEW_COUNT

                const renderProductCard = (product: Product) => (
                  <div
                    key={product.name}
                    className="rounded-2xl bg-slate-50 ring-1 ring-gray-300 shadow-sm overflow-hidden flex flex-col cursor-pointer hover:bg-white hover:ring-gray-400 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                    onClick={() => openProductCard(product)}
                  >
                    <div className="bg-white h-52 overflow-hidden">
                      <img
                        src={product.img}
                        alt={group.id === "ostovpark" ? `${product.name} — ${OSTOVPARK_SEO_KEYWORDS}` : product.name}
                        className="w-full h-full object-contain p-4"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-2">IP65</div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900">{product.name}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed flex-1">{product.desc}</p>
                      <Button
                        onClick={(e) => { e.stopPropagation(); openModal(product.name) }}
                        className="mt-4 w-full bg-gray-900 hover:bg-gray-800 text-white border-0 rounded-lg text-sm"
                      >
                        Запросить цену
                      </Button>
                    </div>
                  </div>
                )

                if (isOstovPark) {
                  return (
                    <div key={group.id} className="rounded-2xl ring-1 ring-gray-200 overflow-hidden">
                      <div className="p-6 bg-gray-50">
                        <h3 className="text-2xl font-bold text-gray-900">{group.title}</h3>
                        <p className="text-gray-500 text-sm mt-1">{group.description}</p>
                      </div>

                      <div className="p-6 pt-4 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {visibleProducts.map(renderProductCard)}
                        </div>

                        {hasMore && (
                          <div className="flex justify-center mt-6">
                            <Button
                              onClick={() => toggleGroup(group.id)}
                              variant="outline"
                              className="rounded-full px-8 py-2 flex items-center gap-2"
                            >
                              {isOpen ? "Свернуть" : `Показать ещё (${group.products.length - PREVIEW_COUNT})`}
                              {isOpen
                                ? <ChevronUp className="w-4 h-4" />
                                : <ChevronDown className="w-4 h-4" />
                              }
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                }

                return (
                  <div key={group.id} className="rounded-2xl ring-1 ring-gray-200 overflow-hidden">
                    <button
                      onClick={() => toggleGroup(group.id)}
                      className="w-full flex items-center justify-between p-6 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                    >
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{group.title}</h3>
                        <p className="text-gray-500 text-sm mt-1">{group.description}</p>
                      </div>
                      <div className="ml-4 shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-white ring-1 ring-gray-200 shadow-sm">
                        {isOpen
                          ? <ChevronUp className="w-5 h-5 text-gray-600" />
                          : <ChevronDown className="w-5 h-5 text-gray-600" />
                        }
                      </div>
                    </button>

                    {isOpen && (
                      <div className="p-6 pt-4 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {group.products.map(renderProductCard)}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
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