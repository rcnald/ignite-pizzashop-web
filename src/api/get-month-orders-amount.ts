import { api } from '@/lib/axios'

export interface GetMonthOrdersAmountResponse {
  amount: number
  diffFromLastMonth: number
}

export async function getMonthOrdersAmount() {
  const getMonthOrdersAmountResponse =
    await api.get<GetMonthOrdersAmountResponse>('metrics/month-orders-amount')

  return getMonthOrdersAmountResponse.data
}
