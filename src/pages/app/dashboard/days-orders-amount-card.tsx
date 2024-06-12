import { useQuery } from '@tanstack/react-query'
import { Utensils } from 'lucide-react'

import { getDayOrdersAmount } from '@/api/get-days-orders-amount'
import { MetricCardSkeleton } from '@/components/skeletons/metric-card-skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function DaysOrdersAmountCard() {
  const { data: dayOrdersAmount } = useQuery({
    queryKey: ['metrics', 'day-orders-amount'],
    queryFn: getDayOrdersAmount,
  })

  const isDiffFromYesterdayPositive =
    (dayOrdersAmount?.diffFromYesterday ?? 0) > 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (dia)</CardTitle>
        <Utensils className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {dayOrdersAmount ? (
          <>
            {' '}
            <span className="text-2xl font-bold tracking-tight">
              {dayOrdersAmount?.amount.toLocaleString('pt-BR')}
            </span>
            <p className="text-xs text-muted-foreground">
              <span
                className={cn('text-rose-500 dark:text-rose-400', {
                  'text-emerald-500 dark:text-emerald-400':
                    isDiffFromYesterdayPositive,
                })}
              >
                {isDiffFromYesterdayPositive ? '+' : null}
                {dayOrdersAmount?.diffFromYesterday}%{' '}
              </span>
              em relação a ontem
            </p>
          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  )
}
