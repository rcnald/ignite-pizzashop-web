import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

import { getCanceledMonthOrdersAmount } from '@/api/get-month-canceled-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function MonthCanceledOrdersAmountCard() {
  const { data: canceledMonthOrdersAmount } = useQuery({
    queryKey: ['metrics', 'canceled-month-orders-amount'],
    queryFn: getCanceledMonthOrdersAmount,
  })

  const isDiffFromLastMonthPositive =
    (canceledMonthOrdersAmount?.diffFromLastMonth ?? 0) > 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">
          Cancelamentos (mes)
        </CardTitle>
        <DollarSign className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">
          {canceledMonthOrdersAmount?.amount}
        </span>
        <p className="text-xs text-muted-foreground">
          <span
            className={cn('text-emerald-500 dark:text-emerald-400', {
              'text-rose-500 dark:text-rose-400': isDiffFromLastMonthPositive,
            })}
          >
            {isDiffFromLastMonthPositive ? '-' : null}
            {canceledMonthOrdersAmount?.diffFromLastMonth}%{' '}
          </span>
          em relação ao mês passado
        </p>
      </CardContent>
    </Card>
  )
}
