import styled, { css } from "styled-components"
import theme from "theme/index"

// eslint-disable-next-line import/prefer-default-export
export const DisabledMessage = styled.div<{
  view: boolean
  position: "left" | "right"
}>`
  ${props =>
    props.view === true
      ? css`
          background-color: ${theme.colors.white};
          border: 1px solid ${theme.colors.focus};
          border-radius: 10px;
          width: 180px;
          min-height: 62px;
          height: fit-content;
          padding: 19px 24px 26px 24px;
          margin-bottom: 15px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-content: center;
          font-family: ${theme.fonts.primary};
          box-shadow: 0px 18px 18px #00000029;
          position: absolute;
          z-index: 20;
          bottom: 35px;

          h3 {
            font-size: ${theme.fontSizes.m};
            font-weight: ${theme.fontWeights.semiBold};
            color: ${theme.colors.black};
            margin: 0;
          }

          p {
            font-size: ${theme.fontSizes.s};
            font-weight: ${theme.fontWeights.medium};
            color: ${theme.colors.grey};
            margin: 4px 0 0;
          }
        `
      : css`
          display: none;
        `}

  ${props =>
    props.position === "right"
      ? css`
          right: 0px;
        `
      : css`
          left: 0px;
        `}
`
