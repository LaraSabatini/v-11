import styled, { css } from "styled-components"
import theme from "theme/index"

export const TableRow = styled.div<{ status: string }>`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  ${({ status }) =>
    status === "REVIEWING" &&
    css`
      .cell-content {
        color: ${theme.colors.grey_light};
      }
      &:hover {
        .cell {
          background-color: none;
        }
        .cell-divider {
          visibility: visible;
        }
      }
    `}
  ${({ status }) =>
    status !== "REVIEWING" &&
    css`
      .cell-content {
        color: ${theme.colors.grey};
      }
      &:hover {
        .cell {
          background-color: ${theme.colors.grey_lighter};
        }
        .cell-divider {
          visibility: hidden;
        }
      }
    `}
`

export const RowCell = styled.div<{ width: string }>`
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin: 10px 0;
  ${({ width }) =>
    width === "s" &&
    css`
      min-width: 100px;
      width: 100px;
    `};
  ${({ width }) =>
    width === "m" &&
    css`
      min-width: 160px;
      width: 160px;
    `};
  ${({ width }) =>
    width === "l" &&
    css`
      min-width: 160px;
      width: 260px;
    `};
  ${({ width }) =>
    width === "xl" &&
    css`
      min-width: 160px;
      width: 526px;
    `};
  .cell-divider {
    margin-left: 1px;
    width: 1px;
    height: 40px;
    background: ${theme.colors.grey_light};
  }
  &:first-child {
    .cell {
      border-radius: 5px 0 0 5px;
    }
  }
  &:nth-last-child(1) {
    .cell-divider {
      display: none;
    }
    .cell {
      border-radius: 0 5px 5px 0;
    }
  }
`

export const Cell = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  box-sizing: border-box;
  justify-content: flex-start;
  align-items: center;
  .cell-content {
    margin: 0;
    width: 100%;
    line-height: auto;
    font-family: ${theme.fonts.primary};
    font-size: ${theme.fontSizes.s};
    font-weight: ${theme.fontWeights.semiBold};
    padding-left: 16px;
  }
`
