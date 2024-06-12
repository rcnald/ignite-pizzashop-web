import { OrderStatusType } from '@/api/get-orders'
import { cn } from '@/lib/utils'

export interface OrderStatusProps {
  status: OrderStatusType
}

const orderStatusTypeMap: Record<OrderStatusType, string> = {
  pending: 'Pendente',
  canceled: 'Cancelado',
  delivered: 'Entregue',
  delivering: 'Em entrega',
  processing: 'Em preparo',
}

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn('h-2 w-2 rounded-full', {
          'bg-slate-400': status === 'pending',
          'bg-rose-500': status === 'canceled',
          'bg-emerald-500': status === 'delivered',
          'bg-amber-500': status === 'processing' || status === 'delivering',
        })}
      />
      <span className="font-medium text-muted-foreground">
        {orderStatusTypeMap[status]}
      </span>
    </div>
  )
}
