import { useState } from "react"

const SEND_URL = "https://functions.poehali.dev/1dff2903-7852-4d42-8659-930221875f94"
const UPLOAD_URL = "https://functions.poehali.dev/2e76e395-e976-4652-b649-6e22e1dd48c1"

export interface Product {
  name: string
  img: string
  desc: string
  specs?: { label: string; value: string }[]
  gallery?: string[]
}

export interface ProductGroup {
  id: string
  title: string
  description: string
  products: Product[]
}

export interface ProductsSectionRef {
  openModal: (product: string) => void
}

export interface ModalState {
  open: boolean
  product: string
}

export const useRequestForm = () => {
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

export const DEFAULT_SPECS = [
  { label: "Степень защиты", value: "IP65" },
  { label: "Мощность", value: "8–80 Вт" },
  { label: "Цвет корпуса", value: "RAL по запросу" },
  { label: "Температура", value: "−40°C до +50°C" },
  { label: "Срок службы", value: "50 000 ч" },
  { label: "Гарантия", value: "3 года" },
]

export const ostovParkProducts: Product[] = [
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
  {
    name: "Остов Парк Арт 1-8",
    img: "https://cdn.poehali.dev/projects/45694333-96bb-4e30-b37b-6834c2922ce3/bucket/5f0dadf2-4658-443f-a4ec-77302952a2fc.png",
    desc: "Элегантный парковый светильник с круглым плафоном и изящными дугообразными кронштейнами. Тёплый свет для парков, скверов и набережных.",
  },
  {
    name: "Остов парк модерн 4",
    img: "https://cdn.poehali.dev/projects/45694333-96bb-4e30-b37b-6834c2922ce3/bucket/db4c9eaa-27c1-4153-a6c3-feb243044768.png",
    desc: "Опора с четырьмя направленными световыми модулями в современном дизайне. Подходит для парков, скверов и пешеходных зон.",
  },
  {
    name: "Остов Парк Маяк 5",
    img: "https://cdn.poehali.dev/projects/45694333-96bb-4e30-b37b-6834c2922ce3/bucket/92f09da9-78ef-429b-a43a-fa415e6db82b.png",
    desc: "Декоративный bollard-светильник с ажурным узором из органических форм. Создаёт уютную атмосферу вдоль пешеходных дорожек и в парковых зонах.",
  },
]

export const ostovTerraProducts: Product[] = [
  {
    name: "Светильник ландшафтный Остов Терра Спарк",
    img: "https://cdn.poehali.dev/projects/45694333-96bb-4e30-b37b-6834c2922ce3/bucket/59fdd44f-8b17-4f9e-b4e5-999b2fb798e0.png",
    desc: "Ландшафтный светильник на штыре для установки в грунт. Направленный световой поток, поворотная головка. Подходит для подсветки клумб, дорожек и архитектурных элементов.",
  },
  {
    name: "Светильник ландшафтный Остов Терра Брусчатка",
    img: "https://cdn.poehali.dev/projects/45694333-96bb-4e30-b37b-6834c2922ce3/bucket/af8b4581-23fc-4a90-b27e-78f685ae35f4.png",
    desc: "Встраиваемый светильник-брусчатка для мощения дорожек и площадок. Укладывается вровень с покрытием, степень защиты IP67. Создаёт эффектную подсветку пешеходных зон.",
    gallery: [
      "https://cdn.poehali.dev/projects/45694333-96bb-4e30-b37b-6834c2922ce3/bucket/af8b4581-23fc-4a90-b27e-78f685ae35f4.png",
      "https://cdn.poehali.dev/projects/45694333-96bb-4e30-b37b-6834c2922ce3/bucket/a73db75c-ea19-45d3-99d8-983cd7edee0b.jpg",
    ],
  },
]

export const productGroups: ProductGroup[] = [
  {
    id: "ostovpark",
    title: "Серия OstovPark",
    description: "Парковые светодиодные светильники IP65 для парков, скверов, пешеходных зон и придомовых территорий.",
    products: ostovParkProducts,
  },
  {
    id: "ostovterra",
    title: "Серия Ostov Terra",
    description: "Грунтовые и встраиваемые светодиодные светильники IP67 для ландшафтного освещения и архитектурной подсветки.",
    products: ostovTerraProducts,
  },
]