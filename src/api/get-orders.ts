import { api } from '@/lib/axios'

interface GerOrdersResponse {
  orders: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

interface GetOrdersQuery {
  pageIndex: number
  orderId?: string | null
  customerName?: string | null
  status?: string | null
}

export async function getOrders({
  pageIndex,
  customerName,
  orderId,
  status,
}: GetOrdersQuery) {
  const ordersResponse = await api.get<GerOrdersResponse>('/orders', {
    params: { pageIndex, customerName, orderId, status },
  })

  return ordersResponse.data
}
