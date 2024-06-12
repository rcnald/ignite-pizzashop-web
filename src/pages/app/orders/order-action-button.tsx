import { ArrowRight } from 'lucide-react'
import { ComponentProps } from 'react'

import { OrderStatusType } from '@/api/get-orders'
import { Button } from '@/components/ui/button'

export interface OrderActionButtonProps extends ComponentProps<'button'> {
  status: OrderStatusType
}

const orderStatusTypeMap: Record<OrderStatusType, string> = {
  pending: 'Aprovar',
  processing: 'Em entrega',
  delivering: 'Entregue',
  canceled: '',
  delivered: '',
}

export function OrderActionButton({
  status,
  ...props
}: OrderActionButtonProps) {
  return (
    <Button variant="outline" size="xs" {...props}>
      <ArrowRight className="mr-2 size-3" />
      {orderStatusTypeMap[status]}
    </Button>
  )
}
