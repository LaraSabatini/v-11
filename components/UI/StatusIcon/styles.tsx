import styled, { css } from "styled-components"

export const StatusIconContainer = styled.div`
  display: flex;
`

export const IconContainer = styled.div<{
  status:
    | "VALIDATED"
    | "REJECTED"
    | "PENDING"
    | "REVIEWING"
    | "IN_PROGRESS"
    | "CANCELLED"
    | "FINISHED"
    | "IN_PROCESS"
  styleHover: boolean
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  width: 60px;
  height: 40px;
  position: relative;

  ${({ status, styleHover }) =>
    status === "REJECTED" &&
    styleHover === true &&
    css`
      &:hover {
        background: #ff63631a;
      }
    `}

  ${({ status, styleHover }) =>
    status === "VALIDATED" &&
    styleHover === true &&
    css`
      &:hover {
        background: #14b91a12;
      }
    `}

    ${({ status, styleHover }) =>
    status === "PENDING" &&
    styleHover === true &&
    css`
      &:hover {
        background: #ffbb001a;
      }
    `}

    ${({ status, styleHover }) =>
    status === "REVIEWING" &&
    styleHover === true &&
    css`
      &:hover {
        background: #b2b9e222;
      }
    `}
`
