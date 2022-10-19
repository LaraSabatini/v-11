/* eslint-disable react/no-array-index-key */
import React from "react"
import { TableRow, RowCell, Cell } from "./styles"
import StatusIcon from "../../StatusIcon"

export interface RowInterface {
  columns: {
    id: number
    field: string
    header_name: string
    width: "s" | "m" | "l" | "xl"
  }[]
  item: any
  onRowClick?: (arg?: any) => void
}

// eslint-disable-next-line react/function-component-definition
const BodyRows: React.FC<RowInterface> = ({ item, columns, onRowClick }) => {
  if (item.status && item.status.status && item.status.status === "REVIEWING") {
    return (
      <TableRow
        status={item.status.status}
        onClick={onRowClick}
        data-id={item.id}
      >
        {columns.map((columnItem, index) => {
          return (
            <RowCell key={index} width={columnItem.width}>
              <Cell className="cell">
                {columnItem.field === "status" ? (
                  <StatusIcon
                    status={item[`${columnItem.field}`].status}
                    hasTooltip
                    tooltipText={item[`${columnItem.field}`].tooltip_text}
                  />
                ) : (
                  <p className="cell-content">{item[`${columnItem.field}`]}</p>
                )}
              </Cell>
              <div className="cell-divider" />
            </RowCell>
          )
        })}
      </TableRow>
    )
  }

  return (
    <TableRow
      onClick={onRowClick}
      status={item.status && item.status.status}
      data-id={item.id}
    >
      {columns.map((columnItem, index) => {
        return (
          <RowCell key={index} width={columnItem.width}>
            <Cell className="cell">
              {columnItem.field === "status" ? (
                <StatusIcon
                  status={item[`${columnItem.field}`].status}
                  hasTooltip
                  tooltipText={item[`${columnItem.field}`].tooltip_text}
                />
              ) : (
                <p className="cell-content">{item[`${columnItem.field}`]}</p>
              )}
            </Cell>
            <div className="cell-divider" />
          </RowCell>
        )
      })}
    </TableRow>
  )
}

export default BodyRows
