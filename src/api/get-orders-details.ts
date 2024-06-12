import { api } from '@/lib/axios'

import { OrderStatusType } from './get-orders'

export interface GetOrdersDetailsParams {
  orderId: string
}

export interface GetOrdersDetailsResponse {
  status: OrderStatusType
  id: string
  createdAt: string
  totalInCents: number
  customer: {
    name: string
    email: string
    phone: string | null
  }
  orderItems: {
    id: string
    priceInCents: number
    quantity: number
    product: {
      name: string
    }
  }[]
}

export async function getOrdersDetails({ orderId }: GetOrdersDetailsParams) {
  const orderDetailsResponse = await api.get<GetOrdersDetailsResponse>(
    `/orders/${orderId}`,
  )

  return orderDetailsResponse.data
}
