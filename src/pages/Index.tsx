import { useRef } from "react"
import Icon from "@/components/ui/icon"
import HeroSection from "@/components/HeroSection"
import ProductsSection, { ProductsSectionRef } from "@/components/ProductsSection"
import FaqSection from "@/components/FaqSection"
import ContactSection from "@/components/ContactSection"

const Index = () => {
  const productsSectionRef = useRef<ProductsSectionRef>(null)

  const handleOpenModal = (product: string) => {
    productsSectionRef.current?.openModal(product)
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <HeroSection onOpenModal={handleOpenModal} />

      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            <div className="rounded-2xl bg-white ring-1 ring-gray-200 shadow-sm p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 ring-1 ring-gray-200 mb-6">
                <Icon name="Zap" size={24} className="text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Энергоэффективность</h3>
              <p className="text-gray-600 leading-relaxed">До 70% экономии электроэнергии по сравнению с традиционными лампами.</p>
            </div>
            <div className="rounded-2xl bg-white ring-1 ring-gray-200 shadow-sm p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 ring-1 ring-gray-200 mb-6">
                <Icon name="ShieldCheck" size={24} className="text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Защита IP65</h3>
              <p className="text-gray-600 leading-relaxed">Полная защита от пыли и воды. Работает в любых климатических условиях.</p>
            </div>
            <div className="rounded-2xl bg-white ring-1 ring-gray-200 shadow-sm p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 ring-1 ring-gray-200 mb-6">
                <Icon name="Clock" size={24} className="text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Срок службы 10+ лет</h3>
              <p className="text-gray-600 leading-relaxed">До 100 000 часов работы без замены источника света и обслуживания.</p>
            </div>
            <div className="rounded-2xl bg-white ring-1 ring-gray-200 shadow-sm p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 ring-1 ring-gray-200 mb-6">
                <Icon name="Leaf" size={24} className="text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Экология</h3>
              <p className="text-gray-600 leading-relaxed">Не содержит ртути и вредных веществ. Безопасны для людей и окружающей среды.</p>
            </div>
          </div>
        </div>
      </section>

      <ProductsSection ref={productsSectionRef} />
      <FaqSection />
      <ContactSection />
    </div>
  )
}

export default Index
