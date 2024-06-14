import { render } from '@testing-library/react'

import { OrderStatusType } from '@/api/get-orders'

import { OrderStatus, orderStatusTypeMap } from './index'

describe('Order Status', () => {
  it.each(
    Object.entries(orderStatusTypeMap).map(
      ([orderStatusKey, orderStatusValue]) => [
        orderStatusValue.content,
        orderStatusValue.color,
        orderStatusKey,
      ],
    ),
  )(
    'should display the right text "%s" and have class "%s" when order status is "%s"',
    (
      expectedOrderStatusContent,
      expectedOrderStatusClassColor,
      orderStatusKey,
    ) => {
      const { getByText, getByTestId } = render(
        <OrderStatus status={orderStatusKey as OrderStatusType} />,
      )

      const statusText = getByText(expectedOrderStatusContent)
      const badgeElement = getByTestId('badge')

      expect(statusText).toBeInTheDocument()
      expect(badgeElement).toHaveClass(expectedOrderStatusClassColor)
    },
  )
})
