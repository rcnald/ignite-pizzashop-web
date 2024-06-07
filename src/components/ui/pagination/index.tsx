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
}

export function Pagination({
  pageIndex,
  totalCount,
  perPage,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage)
  const currentPage = pageIndex + 1

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
          <Button variant="outline" className="size-8 p-0">
            <ChevronsLeft className="size-4" />
            <span className="sr-only">Primeira pagina</span>
          </Button>
          <Button variant="outline" className="size-8 p-0">
            <ChevronLeft className="size-4" />
            <span className="sr-only">Pagina anterior</span>
          </Button>
          <Button variant="outline" className="size-8 p-0">
            <ChevronRight className="size-4" />
            <span className="sr-only">Proxima pagina</span>
          </Button>
          <Button variant="outline" className="size-8 p-0">
            <ChevronsRight className="size-4" />
            <span className="sr-only">Ultima pagina</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
