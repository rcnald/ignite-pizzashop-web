import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { Button } from '../button'

interface PaginationProps {
  pageIndex: number
  totalCount: number
  perPage: number
  onPageChange: (pageIndex: number) => Promise<void> | void
}

export function Pagination({
  pageIndex,
  totalCount,
  perPage,
  onPageChange,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage)
  const currentPage = pageIndex + 1

  const isFirstPage = pageIndex === 0
  const isLastPage = pageIndex === pages - 1

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total de {totalCount} item(s)
      </span>
      <div className="flex items-center gap-4 lg:gap-6">
        <div className="text-sm font-medium">
          Pagina {currentPage} de {pages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => onPageChange(0)}
            disabled={isFirstPage}
          >
            <ChevronsLeft className="size-4" />
            <span className="sr-only">Primeira pagina</span>
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={isFirstPage}
          >
            <ChevronLeft className="size-4" />
            <span className="sr-only">Pagina anterior</span>
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={isLastPage}
          >
            <ChevronRight className="size-4" />
            <span className="sr-only">Proxima pagina</span>
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => onPageChange(pages - 1)}
            disabled={isLastPage}
          >
            <ChevronsRight className="size-4" />
            <span className="sr-only">Ultima pagina</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
