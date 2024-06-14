import { OrderStatusType } from '@/api/get-orders';
import { cn } from '@/lib/utils';

export interface OrderStatusProps {
  status: OrderStatusType
}

export const orderStatusTypeMap: Record<
  OrderStatusType,
  { content: string; color: string }
> = {
  pending: { content: 'Pendente', color: 'bg-slate-400' },
  canceled: { content: 'Cancelado', color: 'bg-rose-500' },
  delivered: { content: 'Entregue', color: 'bg-emerald-500' },
  delivering: { content: 'Em entrega', color: 'bg-amber-500' },
  processing: { content: 'Em preparo', color: 'bg-amber-500' },
}

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        data-testid="badge"
        className={cn('h-2 w-2 rounded-full', orderStatusTypeMap[status].color)}
      />
      <span className="font-medium text-muted-foreground">
        {orderStatusTypeMap[status].content}
      </span>
    </div>
  )
}
