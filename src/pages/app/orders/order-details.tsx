import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow, formatRelative } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { getOrdersDetails } from '@/api/get-orders-details'
import { OrderDetailsSkeleton } from '@/components/skeletons/order-details-skeleton'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { OrderStatus } from '@/components/ui/order-status'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { formatCentsToPrice } from '@/lib/utils'

interface OrderDetailsProps {
  orderId: string
  open: boolean
}

export function OrderDetails({ orderId, open }: OrderDetailsProps) {
  const { data: orderDetails } = useQuery({
    queryKey: ['order-details', orderId],
    queryFn: () => getOrdersDetails({ orderId }),
    enabled: open,
  })

  const date = formatRelative(
    orderDetails?.createdAt ?? new Date(),
    new Date(),
    {
      locale: ptBR,
    },
  )

  const dateDistanceToNow = formatDistanceToNow(
    orderDetails?.createdAt ?? new Date(),
    {
      locale: ptBR,
      addSuffix: true,
    },
  )

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Pedido: {orderId}</DialogTitle>
        <DialogDescription>Detalhes do pedido</DialogDescription>
      </DialogHeader>
      {orderDetails ? (
        <div className="space-y-6">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">Status</TableCell>
                <TableCell className="flex justify-end">
                  <OrderStatus status={orderDetails.status} />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">Cliente</TableCell>
                <TableCell className="flex justify-end">
                  {orderDetails.customer.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">
                  Telefone
                </TableCell>
                <TableCell className="flex justify-end">
                  {orderDetails.customer.phone ?? 'Não informado'}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">E-mail</TableCell>
                <TableCell className="flex justify-end">
                  {orderDetails.customer.email}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Realizado há
                </TableCell>
                <TableCell className="flex justify-end">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <time
                          className="cursor-default"
                          dateTime={orderDetails.createdAt}
                        >
                          {dateDistanceToNow}
                        </time>
                      </TooltipTrigger>
                      <TooltipContent className="w-fit">{date}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Table>
            <TableHeader>
              <TableHead>Produto</TableHead>
              <TableHead className="text-right">Qtd.</TableHead>
              <TableHead className="text-right">Preço</TableHead>
              <TableHead className="text-right">Subtotal</TableHead>
            </TableHeader>
            <TableBody>
              {orderDetails.orderItems.map((order) => {
                const orderPrice = formatCentsToPrice(order.priceInCents)
                const orderTotalPrice = formatCentsToPrice(
                  order.quantity * order.priceInCents,
                )

                return (
                  <TableRow key={order.id}>
                    <TableCell>{order.product.name}</TableCell>
                    <TableHead className="text-right">
                      {order.quantity}
                    </TableHead>
                    <TableHead className="text-right">{orderPrice}</TableHead>
                    <TableHead className="text-right">
                      {orderTotalPrice}
                    </TableHead>
                  </TableRow>
                )
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total do pedido</TableCell>
                <TableCell className="text-right font-medium">
                  {formatCentsToPrice(orderDetails.totalInCents ?? 0)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      ) : (
        <OrderDetailsSkeleton />
      )}
    </DialogContent>
  )
}
