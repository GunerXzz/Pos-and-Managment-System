export interface Product {
  id: number
  name: string
  price: number
  cost: number
  unit: string
  code: string
  colorName: string
  colorCode: string
  image: string
  isPinned: boolean
  stock: number
  alert_quantity: number
  category_id?: number
  is_service?: number
  barcode_type_id?: number
  color_id?: number | null
  purchase_unit?: number
  sale_unit?: number
}

export interface SaleItem {
  id: number
  name: string
  price: number
  quantity: number
  discount?: number
  unit: string
  colorName?: string
  colorCode?: string
  image?: string
}

export interface SaleRecord {
  id: number | string
  reference_no?: string
  date: string
  items: SaleItem[]
  total: number
  totalKHR?: number
  subtotal: number
  itemDiscounts: number
  globalDiscount: number
  sale_status_id?: number
  sale_status?: string
  payment_status_id?: number
  payment_status?: string
  payment_method_id?: number
  payment_method?: string
  customer_name: string
  customer_phone: string
  created_by?: string
  grand_total?: number
}

export const usePosState = () => {
  // Cleaned: Products catalog is initially empty.
  // Add new items via the UI (/inventory/add) or by populating this array.
  const products = useState<Product[]>('pos_shared_products', () => [])

  // Cleaned: Sales transactions history is initially empty.
  // Records are added automatically when completing sales on /pos.
  const sales = useState<SaleRecord[]>('pos_shared_sales', () => [])

  const decrementStock = (cartItems: { id: number; quantity: number }[]) => {
    cartItems.forEach(cartItem => {
      const product = products.value.find(p => p.id === cartItem.id)
      if (product && !product.is_service) {
        product.stock = Math.max(0, Math.round((product.stock - cartItem.quantity) * 100) / 100)
      }
    })
  }

  const addSale = (sale: SaleRecord) => {
    sales.value.unshift(sale)
  }

  const addProduct = (product: Product) => {
    products.value.push(product)
  }

  return {
    products,
    sales,
    decrementStock,
    addSale,
    addProduct
  }
}
