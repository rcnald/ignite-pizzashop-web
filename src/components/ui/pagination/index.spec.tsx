import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Pagination } from '.'

const onPageChangeCallback = vi.fn()

describe('Pagination', () => {
  beforeEach(() => {
    onPageChangeCallback.mockClear()
  })

  it('should display the right amount of pages and results', () => {
    const { getByText } = render(
      <Pagination
        pageIndex={0}
        perPage={10}
        totalCount={200}
        onPageChange={() => {}}
      />,
    )

    expect(getByText('Pagina 1 de 20')).toBeInTheDocument()
    expect(getByText('Total de 200 item(s)')).toBeInTheDocument()
  })

  it('should be able to navigate to the next page', async () => {
    const user = userEvent.setup()

    const { getByRole } = render(
      <Pagination
        pageIndex={0}
        perPage={10}
        totalCount={200}
        onPageChange={onPageChangeCallback}
      />,
    )

    const nextPageButton = getByRole('button', { name: 'Proxima pagina' })

    await user.click(nextPageButton)

    expect(onPageChangeCallback).toHaveBeenCalledWith(1)
  })

  it('should be able to navigate to the previous page', async () => {
    const user = userEvent.setup()

    const { getByRole } = render(
      <Pagination
        pageIndex={5}
        perPage={10}
        totalCount={200}
        onPageChange={onPageChangeCallback}
      />,
    )

    const previousPageButton = getByRole('button', { name: 'Pagina anterior' })

    await user.click(previousPageButton)

    expect(onPageChangeCallback).toHaveBeenCalledWith(4)
  })

  it('should be able to navigate to the first page', async () => {
    const user = userEvent.setup()

    const { getByRole } = render(
      <Pagination
        pageIndex={5}
        perPage={10}
        totalCount={200}
        onPageChange={onPageChangeCallback}
      />,
    )

    const firstPageButton = getByRole('button', { name: 'Primeira pagina' })

    await user.click(firstPageButton)

    expect(onPageChangeCallback).toHaveBeenCalledWith(0)
  })

  it('should be able to navigate to the last page', async () => {
    const user = userEvent.setup()

    const { getByRole } = render(
      <Pagination
        pageIndex={5}
        perPage={10}
        totalCount={200}
        onPageChange={onPageChangeCallback}
      />,
    )

    const lastPageButton = getByRole('button', { name: 'Ultima pagina' })

    await user.click(lastPageButton)

    expect(onPageChangeCallback).toHaveBeenCalledWith(19)
  })
})
