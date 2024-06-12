import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

import { getMonthRevenue } from '@/api/get-month-revenue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn, formatCentsToPrice } from '@/lib/utils'

export function MonthRevenueCard() {
  const { data: monthRevenue } = useQuery({
    queryKey: ['metrics', 'month-revenue'],
    queryFn: getMonthRevenue,
  })

  const isDiffFromLastMonthPositive = (monthRevenue?.diffFromLastMonth ?? 0) > 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">
          Receita total (mes)
        </CardTitle>
        <DollarSign className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">
          {formatCentsToPrice(monthRevenue?.receipt ?? 0)}
        </span>
        <p className="text-xs text-muted-foreground">
          <span
            className={cn('text-rose-500 dark:text-rose-400', {
              'text-emerald-500 dark:text-emerald-400':
                isDiffFromLastMonthPositive,
            })}
          >
            {isDiffFromLastMonthPositive ? '+' : null}
            {monthRevenue?.diffFromLastMonth}%{' '}
          </span>
          em relação ao mês passado
        </p>
      </CardContent>
    </Card>
  )
}
