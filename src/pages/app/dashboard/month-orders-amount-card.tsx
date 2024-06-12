import { useQuery } from '@tanstack/react-query'
import { Utensils } from 'lucide-react'

import { getMonthOrdersAmount } from '@/api/get-month-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function MonthOrdersAmountCard() {
  const { data: monthOrdersAmount } = useQuery({
    queryKey: ['metrics', 'month-orders-amount'],
    queryFn: getMonthOrdersAmount,
  })

  const isDiffFromLastMonthPositive =
    (monthOrdersAmount?.diffFromLastMonth ?? 0) > 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (mes)</CardTitle>
        <Utensils className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">
          {monthOrdersAmount?.amount}
        </span>
        <p className="text-xs text-muted-foreground">
          <span
            className={cn('text-rose-500 dark:text-rose-400', {
              'text-emerald-500 dark:text-emerald-400':
                isDiffFromLastMonthPositive,
            })}
          >
            {isDiffFromLastMonthPositive ? '+' : null}
            {monthOrdersAmount?.diffFromLastMonth}%{' '}
          </span>
          em relação ao mês passado
        </p>
      </CardContent>
    </Card>
  )
}
