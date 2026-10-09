import { watch } from 'vue'

// Simple debounce helper — avoids @vueuse/core dependency
const debounce = <T extends (...args: any[]) => any>(fn: T, delay: number): T => {
  let timer: ReturnType<typeof setTimeout> | null = null
  return ((...args: any[]) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }) as T
}

export interface Unit {
  id: number
  name: string
  code: string
  base_unit?: number | null
}

export interface Category {
  id: number
  code: string
  name: string
  status: string
  parent_id?: number | null
}

export interface ColorItem {
  id: number
  name: string
  code: string
}

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

export type DiscountType = 'percent' | 'fixed'

export interface SaleItem {
  id: number
  product_id?: number
  product_code?: string
  name: string
  price: number
  quantity: number
  discount?: number
  discountType?: DiscountType  // 'percent' (default) or 'fixed' dollar amount
  unit: string
  colorName?: string
  colorCode?: string
  image?: string
  returned_quantity?: number
}

export interface SaleRecord {
  id: number | string
  reference_no?: string
  date: string
  createdAt?: string          // ISO 8601 timestamp (preferred over date string)
  time?: string
  items: SaleItem[]
  total: number
  totalKHR?: number
  subtotal: number
  itemDiscounts: number
  globalDiscount: number
  globalDiscountType?: DiscountType  // 'percent' (default) or 'fixed' dollar amount
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
  cash_tendered_usd?: number
  cash_tendered_khr?: number
  change_usd?: number
  change_khr?: number
  returned_total?: number
}

export interface Adjustment {
  id: number
  reference_no: string
  date: string
  product_id: number
  product_name: string
  product_code: string
  type: 'addition' | 'damage' | 'loss'
  quantity: number
  unit: string
  note?: string
  created_by: string
}

export interface SystemUser {
  id: number
  group_id: number
  name: string
  username: string
  email: string
  phone: string
  status_id: number
}

export interface SystemGroup {
  id: number
  name: string
  description: string
  status: number
}

// Default Seeds - 100% CLEAN (User will add own data)
const defaultUnits: Unit[] = []
const defaultCategories: Category[] = []
const defaultColors: ColorItem[] = []
const defaultProducts: Product[] = []
const defaultSales: SaleRecord[] = []
const defaultAdjustments: Adjustment[] = []
const defaultUsers: SystemUser[] = []
const defaultGroups: SystemGroup[] = []

const getInitialData = <T>(key: string, defaults: T): T => {
  if (import.meta.client) {
    try {
      // Auto-clean previous dummy data from localStorage
      if (localStorage.getItem('bpas_clean_reset_done') !== 'yes') {
        ['units', 'categories', 'colors', 'products', 'sales', 'adjustments', 'users', 'groups'].forEach(k => {
          localStorage.removeItem(`bpas_${k}`)
        })
        localStorage.setItem('bpas_clean_reset_done', 'yes')
        return defaults
      }
      const saved = localStorage.getItem(`bpas_${key}`)
      if (saved) return JSON.parse(saved)
    } catch (e) {
      console.warn(`Failed to parse localStorage for ${key}`, e)
    }
  }
  return defaults
}

export const usePosState = () => {
  const units = useState<Unit[]>('pos_shared_units', () => getInitialData('units', defaultUnits))
  const categories = useState<Category[]>('pos_shared_categories', () => getInitialData('categories', defaultCategories))
  const colors = useState<ColorItem[]>('pos_shared_colors', () => getInitialData('colors', defaultColors))
  const products = useState<Product[]>('pos_shared_products', () => getInitialData('products', defaultProducts))
  const sales = useState<SaleRecord[]>('pos_shared_sales', () => getInitialData('sales', defaultSales))
  const adjustments = useState<Adjustment[]>('pos_shared_adjustments', () => getInitialData('adjustments', defaultAdjustments))
  const users = useState<SystemUser[]>('pos_shared_users', () => getInitialData('users', defaultUsers))
  const groups = useState<SystemGroup[]>('pos_shared_groups', () => getInitialData('groups', defaultGroups))

  // Global Receipt Code Format preference ('barcode' | 'qr' | 'both')
  const receiptCodeFormat = useState<'barcode' | 'qr' | 'both'>('pos_receipt_code_format', () => {
    if (import.meta.client) {
      const saved = localStorage.getItem('bpas_receipt_code_format')
      if (saved && ['barcode', 'qr', 'both'].includes(saved)) {
        return saved as 'barcode' | 'qr' | 'both'
      }
    }
    return 'both'
  })

  // Persistence Sync
  const persist = (key: string, val: any) => {
    if (import.meta.client) {
      try {
        localStorage.setItem(`bpas_${key}`, JSON.stringify(val))
      } catch (e) {
        console.warn(`Failed to save localStorage for ${key}`, e)
      }
    }
  }

  if (import.meta.client) {
    // Debounced watchers — reduces GC pressure on low-end tablets (300ms window)
    watch(units, debounce((v) => persist('units', v), 300), { deep: true })
    watch(categories, debounce((v) => persist('categories', v), 300), { deep: true })
    watch(colors, debounce((v) => persist('colors', v), 300), { deep: true })
    watch(products, debounce((v) => persist('products', v), 300), { deep: true })
    watch(sales, debounce((v) => persist('sales', v), 300), { deep: true })
    watch(adjustments, debounce((v) => persist('adjustments', v), 300), { deep: true })
    watch(users, debounce((v) => persist('users', v), 300), { deep: true })
    watch(groups, debounce((v) => persist('groups', v), 300), { deep: true })
    watch(receiptCodeFormat, (v) => {
      if (import.meta.client) localStorage.setItem('bpas_receipt_code_format', v)
    })
  }

  // Clear all data utility
  const clearAllData = () => {
    units.value = []
    categories.value = []
    colors.value = []
    products.value = []
    sales.value = []
    adjustments.value = []
    users.value = []
    groups.value = []
    if (import.meta.client) {
      ['units', 'categories', 'colors', 'products', 'sales', 'adjustments', 'users', 'groups'].forEach(k => {
        localStorage.removeItem(`bpas_${k}`)
      })
      localStorage.setItem('bpas_clean_reset_done', 'yes')
    }
  }

  // Unit Methods
  const addUnit = (unit: Unit) => {
    units.value.push(unit)
  }

  const updateUnit = (id: number, updated: Partial<Unit>) => {
    const idx = units.value.findIndex(u => u.id === Number(id))
    if (idx !== -1) {
      units.value[idx] = { ...units.value[idx], ...updated }
    }
  }

  const deleteUnit = (unitId: number) => {
    units.value = units.value.filter(u => u.id !== Number(unitId))
  }

  // Category Methods
  const addCategory = (category: Category) => {
    categories.value.push(category)
  }

  const updateCategory = (id: number, updated: Partial<Category>) => {
    const idx = categories.value.findIndex(c => c.id === Number(id))
    if (idx !== -1) {
      categories.value[idx] = { ...categories.value[idx], ...updated }
    }
  }

  const deleteCategory = (categoryId: number) => {
    categories.value = categories.value.filter(c => c.id !== Number(categoryId))
  }

  // Color Methods
  const addColor = (color: ColorItem) => {
    colors.value.push(color)
  }

  const updateColor = (id: number, updated: Partial<ColorItem>) => {
    const idx = colors.value.findIndex(c => c.id === Number(id))
    if (idx !== -1) {
      colors.value[idx] = { ...colors.value[idx], ...updated }
    }
  }

  const deleteColor = (colorId: number) => {
    colors.value = colors.value.filter(c => c.id !== Number(colorId))
  }

  // Product Methods
  const addProduct = (product: Product) => {
    products.value.push(product)
  }

  const updateProduct = (id: number, updated: Partial<Product>) => {
    const idx = products.value.findIndex(p => p.id === Number(id))
    if (idx !== -1) {
      products.value[idx] = { ...products.value[idx], ...updated }
    }
  }

  const deleteProduct = (productId: number) => {
    products.value = products.value.filter(p => p.id !== Number(productId))
  }

  const decrementStock = (cartItems: { id: number; quantity: number }[]) => {
    cartItems.forEach(cartItem => {
      const product = products.value.find(p => p.id === cartItem.id)
      if (product && !product.is_service) {
        product.stock = Math.max(0, Math.round((product.stock - cartItem.quantity) * 100) / 100)
      }
    })
  }

  const restockProducts = (items: { id: number; quantity: number }[]) => {
    items.forEach(item => {
      const product = products.value.find(p => p.id === item.id)
      if (product && !product.is_service) {
        product.stock = Math.round((product.stock + item.quantity) * 100) / 100
      }
    })
  }

  // Sales Methods
  const addSale = (sale: SaleRecord) => {
    sales.value.unshift(sale)
  }

  const updateSale = (id: number | string, updated: Partial<SaleRecord>) => {
    const idx = sales.value.findIndex(s => String(s.id) === String(id))
    if (idx !== -1) {
      sales.value[idx] = { ...sales.value[idx], ...updated }
    }
  }

  const processSaleReturn = (
    saleId: number | string,
    returnedItems: { itemId: number; productId?: number; quantity: number; refundAmount: number }[]
  ) => {
    const sale = sales.value.find(s => String(s.id) === String(saleId))
    if (!sale) return false

    // 1. Restock returned items to product catalog
    returnedItems.forEach(ret => {
      if (ret.productId) {
        const product = products.value.find(p => p.id === ret.productId)
        if (product && !product.is_service) {
          product.stock = Math.round((product.stock + ret.quantity) * 100) / 100
        }
      }

      // Mark item returned in the sale
      const saleItem = sale.items.find(i => i.id === ret.itemId)
      if (saleItem) {
        saleItem.returned_quantity = (saleItem.returned_quantity || 0) + ret.quantity
      }
    })

    // 2. Calculate total refund
    const totalRefund = returnedItems.reduce((sum, r) => sum + r.refundAmount, 0)
    sale.returned_total = (sale.returned_total || 0) + totalRefund

    // FIX: Subtract refund from sale.total & grand_total so dashboards don't over-count revenue
    sale.total = Math.max(0, Math.round((sale.total - totalRefund) * 100) / 100)
    if (sale.grand_total !== undefined) {
      sale.grand_total = Math.max(0, Math.round(((sale.grand_total || 0) - totalRefund) * 100) / 100)
    }

    // 3. Check if all items are fully returned
    const totalOriginalQty = sale.items.reduce((sum, i) => sum + i.quantity, 0)
    const totalReturnedQty = sale.items.reduce((sum, i) => sum + (i.returned_quantity || 0), 0)

    if (totalReturnedQty >= totalOriginalQty) {
      sale.sale_status = 'Returned (Full)'
      sale.payment_status = 'Refunded'
    } else {
      sale.sale_status = 'Returned (Partial)'
      sale.payment_status = 'Partially Refunded'
    }

    return true
  }

  // Stock Adjustments Methods
  const addAdjustment = (adjustment: Adjustment) => {
    adjustments.value.unshift(adjustment)

    // Adjust product stock immediately
    const product = products.value.find(p => p.id === adjustment.product_id)
    if (product && !product.is_service) {
      if (adjustment.type === 'addition') {
        product.stock = Math.round((product.stock + adjustment.quantity) * 100) / 100
      } else {
        // damage or loss
        product.stock = Math.max(0, Math.round((product.stock - adjustment.quantity) * 100) / 100)
      }
    }
  }

  const deleteAdjustment = (id: number) => {
    // FIX: Reverse the stock mutation before deleting the record
    const adj = adjustments.value.find(a => a.id === Number(id))
    if (adj) {
      const product = products.value.find(p => p.id === adj.product_id)
      if (product && !product.is_service) {
        if (adj.type === 'addition') {
          // Reverse addition: subtract back
          product.stock = Math.max(0, Math.round((product.stock - adj.quantity) * 100) / 100)
        } else {
          // Reverse damage/loss: add back
          product.stock = Math.round((product.stock + adj.quantity) * 100) / 100
        }
      }
    }
    adjustments.value = adjustments.value.filter(a => a.id !== Number(id))
  }

  // User Methods
  const addUser = (user: SystemUser) => {
    users.value.push(user)
  }

  const updateUser = (id: number, updated: Partial<SystemUser>) => {
    const idx = users.value.findIndex(u => u.id === Number(id))
    if (idx !== -1) {
      users.value[idx] = { ...users.value[idx], ...updated }
    }
  }

  const deleteUser = (id: number) => {
    users.value = users.value.filter(u => u.id !== Number(id))
  }

  // Group Methods
  const addGroup = (group: SystemGroup) => {
    groups.value.push(group)
  }

  const updateGroup = (id: number, updated: Partial<SystemGroup>) => {
    const idx = groups.value.findIndex(g => g.id === Number(id))
    if (idx !== -1) {
      groups.value[idx] = { ...groups.value[idx], ...updated }
    }
  }

  const deleteGroup = (id: number) => {
    groups.value = groups.value.filter(g => g.id !== Number(id))
  }

  return {
    units,
    categories,
    colors,
    products,
    sales,
    adjustments,
    users,
    groups,
    addUnit,
    updateUnit,
    deleteUnit,
    addCategory,
    updateCategory,
    deleteCategory,
    addColor,
    updateColor,
    deleteColor,
    addProduct,
    updateProduct,
    deleteProduct,
    decrementStock,
    restockProducts,
    addSale,
    updateSale,
    processSaleReturn,
    addAdjustment,
    deleteAdjustment,
    addUser,
    updateUser,
    deleteUser,
    addGroup,
    updateGroup,
    deleteGroup,
    clearAllData,
    receiptCodeFormat
  }
}
