import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow, formatRelative } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'

import { cancelOrder } from '@/api/cancel-order'
import { GetOrdersResponse } from '@/api/get-orders'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { OrderStatus } from '@/components/ui/order-status'
import { TableCell, TableRow } from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { formatCentsToPrice } from '@/lib/utils'

import { OrderDetails } from './order-details'

interface OderTableRowProps {
  order: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }
}

export function OrderTableRow({ order }: OderTableRowProps) {
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const queryClient = useQueryClient()

  const { mutateAsync: cancelOrderFn } = useMutation({
    mutationKey: ['cancel-order'],
    mutationFn: cancelOrder,
    async onSuccess(_, { orderId }) {
      const orderListCached = queryClient.getQueriesData<GetOrdersResponse>({
        queryKey: ['orders'],
      })

      orderListCached.forEach(([cachedKey, cachedData]) => {
        if (!cachedData) return

        queryClient.setQueryData<GetOrdersResponse>(cachedKey, {
          ...cachedData,
          orders: cachedData.orders.map((order) => {
            if (order.orderId === orderId) {
              return { ...order, status: 'canceled' }
            }
            return order
          }),
        })
      })
    },
  })

  const orderDateRelative = formatRelative(order.createdAt, new Date(), {
    locale: ptBR,
  })

  const orderDateDistanceToNow = formatDistanceToNow(order.createdAt, {
    locale: ptBR,
    addSuffix: true,
  })

  const orderCannotBeenCanceled = !['pending', 'processing'].includes(
    order.status,
  )

  const handleCancelOrder = (orderId: string) => {
    cancelOrderFn({ orderId })
  }

  return (
    <TableRow>
      <TableCell>
        <Dialog
          open={isDetailsDialogOpen}
          onOpenChange={setIsDetailsDialogOpen}
        >
          <TooltipProvider>
            <Tooltip>
              <DialogTrigger asChild>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="xs">
                    <Search className="size-3" />
                    <span className="sr-only">Detalhes do pedido</span>
                  </Button>
                </TooltipTrigger>
              </DialogTrigger>
              <TooltipContent>
                <p>Detalhes do pedido</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <OrderDetails orderId={order.orderId} open={isDetailsDialogOpen} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <time dateTime={order.createdAt}>{orderDateDistanceToNow}</time>
            </TooltipTrigger>
            <TooltipContent className="w-fit">
              {orderDateRelative}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">
        {formatCentsToPrice(order.total)}
      </TableCell>
      <TableCell>
        <Button variant="outline" size="xs">
          <ArrowRight className="mr-2 size-3" />
          Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <Button
          variant="ghost"
          size="xs"
          disabled={orderCannotBeenCanceled}
          onClick={() => handleCancelOrder(order.orderId)}
        >
          <X className="mr-2 size-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
