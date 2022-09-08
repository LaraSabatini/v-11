import styled, { css } from "styled-components"
import theme from "theme/index"

export const TableContainer = styled.div<{ minWidth: number }>`
  width: "100%";
  min-width: ${({ minWidth }) => minWidth}px;
  position: relative;
  background: ${theme.colors.white};
`

export const TableWrapper = styled.div`
  width: "100%";
  position: relative;
`

export const TableHeader = styled.div`
  background: ${theme.colors.white};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid ${theme.colors.grey_lighter};
  position: sticky;
  top: 0;
  left: 0;
  z-index: 10;
`

export const HeaderCell = styled.div<{ width: string }>`
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
  p {
    margin: 0;
    text-transform: uppercase;
    font-family: ${theme.fonts.primary};
    font-size: ${theme.fontSizes.xs};
    font-weight: ${theme.fontWeights.regular};
    color: ${theme.colors.black};
    padding-left: 16px;
  }
  &:first-child {
    p {
      padding-left: 0;
    }
  }
`

export const TableDivider = styled.hr`
  border: none;
  margin: 10px 0 0;
  width: 100%;
  height: 2px;
  background: ${theme.colors.grey_light};
`

export const TableBody = styled.div`
  position: relative;
  width: 100%;
  .row-wrapper {
    width: 100%;
    .row-divider {
      border: none;
      margin: 0;
      width: 100%;
      height: 1px;
      background: ${theme.colors.grey_lighter};
    }
    &:nth-last-child(1) {
      .row-divider {
        display: none;
      }
    }
  }
`

export const PaginatorContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export const ProgressRow = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
`

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 60px auto 0;
  .content {
    margin: 36px auto 0;
    font-family: ${theme.fonts.primary};
    font-size: ${theme.fontSizes.xl};
    font-weight: ${theme.fontWeights.semiBold};
    color: #c8c8c8; /* Not in the theme */
  }
`
