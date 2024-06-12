import { api } from '@/lib/axios'

export type GetPopularProductsResponse = {
  product: string
  amount: number
}[]

export async function getPopularProducts() {
  const getPopularProductsResponse = await api.get<GetPopularProductsResponse>(
    'metrics/popular-products',
  )

  return getPopularProductsResponse.data
}
