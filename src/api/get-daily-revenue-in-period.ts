import { api } from '@/lib/axios'

export interface GetDailyRevenueInPeriodQuery {
  from?: Date
  to?: Date
}

export type GetDailyRevenueInPeriodResponse = {
  date: string
  receipt: number
}[]

export async function getDailyRevenueInPeriod({
  from,
  to,
}: GetDailyRevenueInPeriodQuery) {
  const getDailyRevenueInPeriodResponse =
    await api.get<GetDailyRevenueInPeriodResponse>(
      'metrics/daily-receipt-in-period',
      { params: { from, to } },
    )

  const getDailyRevenueInPeriodResponseFormatted =
    getDailyRevenueInPeriodResponse.data.map((revenue) => {
      const { date } = revenue

      return { date, receipt: revenue.receipt / 100 }
    })

  return getDailyRevenueInPeriodResponseFormatted
}
