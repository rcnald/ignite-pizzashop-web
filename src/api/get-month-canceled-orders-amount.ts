import { api } from '@/lib/axios'

export interface GetCanceledMonthOrdersAmountResponse {
  amount: number
  diffFromLastMonth: number
}

export async function getCanceledMonthOrdersAmount() {
  const getCanceledMonthOrdersAmountResponse =
    await api.get<GetCanceledMonthOrdersAmountResponse>(
      'metrics/month-canceled-orders-amount',
    )

  return getCanceledMonthOrdersAmountResponse.data
}
