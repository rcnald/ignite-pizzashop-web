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
}

export async function getOrders({ pageIndex }: GetOrdersQuery) {
  const ordersResponse = await api.get<GerOrdersResponse>('/orders', {
    params: { pageIndex },
  })

  return ordersResponse.data
}
