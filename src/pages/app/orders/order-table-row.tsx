import { formatDistanceToNow, formatRelative } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Search, X } from 'lucide-react'

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
  const totalOrderPrice = order.total.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  const date = formatRelative(order.createdAt, new Date(), { locale: ptBR })

  const dateDistanceToNow = formatDistanceToNow(order.createdAt, {
    locale: ptBR,
    addSuffix: true,
  })

  return (
    <TableRow>
      <TableCell>
        <Dialog>
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
          <OrderDetails />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>{dateDistanceToNow}</TooltipTrigger>
            <TooltipContent className="w-fit">{date}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">{totalOrderPrice}</TableCell>
      <TableCell>
        <Button variant="outline" size="xs">
          <ArrowRight className="mr-2 size-3" />
          Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="ghost" size="xs">
          <X className="mr-2 size-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
