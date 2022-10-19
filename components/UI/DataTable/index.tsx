/* eslint-disable react/no-array-index-key */
import React, { useState } from "react"
import Pagination from "components/UI/Pagination"
import ScrollView from "components/UI/ScrollView"
import Icon from "components/UI/Assets/Icon"
import {
  TableWrapper,
  TableContainer,
  TableHeader,
  HeaderCell,
  TableBody,
  TableDivider,
  PaginatorContainer,
  NotFoundContainer,
} from "./styles"
import BodyRows from "./BodyRows"

export interface TableInterface {
  columns: {
    id: number
    field: string
    header_name: string
    width: "s" | "m" | "l" | "xl"
  }[]
  rows: {
    success: boolean
    message?: {
      icon: string
      content: string
    }
    rows: any[]
  }
  height: number
  onRowClick?: (arg?: any) => void
  onClickNext?: (arg?: any) => void
  onClickBack?: (arg?: any) => void
  onClickLast?: (arg?: any) => void
  setPage?: number
  reference?: any
  totalPages?: number
  noPaginator?: boolean
}

const DataTableComponent: React.FC<TableInterface> = ({
  columns,
  rows,
  height,
  onRowClick,
  onClickNext,
  onClickBack,
  onClickLast,
  totalPages,
  setPage,
  reference,
  noPaginator,
}) => {
  const [selectedRow, setSelectedRow] = useState<number>(null)
  const handleRowClick = (item: any, e: any) => {
    if (onRowClick !== undefined) {
      setSelectedRow(item.id)
      setTimeout(() => {
        onRowClick({ e, item })
      }, 10)
    }
  }

  const calculateMinWidth = (): number => {
    let count = 0
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < columns?.length; i++) {
      if (columns[i].width === "s") {
        count += 62
      } else {
        count += 160
      }
    }
    return count
  }

  const minWidth = calculateMinWidth()

  return (
    <TableWrapper>
      <ScrollView height={height} horizontal>
        <TableContainer minWidth={minWidth}>
          <TableHeader>
            {columns?.map((column, index) => (
              <HeaderCell key={index} width={column.width}>
                <p>{column.header_name}</p>
              </HeaderCell>
            ))}
          </TableHeader>
          <TableBody ref={reference} data-id={selectedRow}>
            {rows?.success && rows.rows?.length ? (
              rows.rows.map((item, index) => (
                <div className="row-wrapper" key={index}>
                  <BodyRows
                    onRowClick={e => handleRowClick(item, e)}
                    item={item}
                    columns={columns}
                  />
                  <hr className="row-divider" />
                </div>
              ))
            ) : (
              <NotFoundContainer>
                <Icon icon={rows?.message?.icon} />
                <h3 className="content">{rows?.message?.content}</h3>
              </NotFoundContainer>
            )}
          </TableBody>
        </TableContainer>
      </ScrollView>
      {!noPaginator || noPaginator === undefined ? (
        <>
          <TableDivider />
          <PaginatorContainer>
            <Pagination
              setPage={setPage}
              totalPages={totalPages}
              onClickNext={onClickNext}
              onClickBack={onClickBack}
              onClickLastPage={onClickLast}
            />
          </PaginatorContainer>
        </>
      ) : (
        <div />
      )}
    </TableWrapper>
  )
}

export default DataTableComponent
