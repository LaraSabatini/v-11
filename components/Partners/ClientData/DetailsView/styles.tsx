import styled, { css } from "styled-components"
import theme from "theme/index"

const Container = styled.div`
  background-color: white;
  width: 400px;
  padding: 20px;
  font-family: ${theme.fonts.primary};

  background: #fffffe;
  box-shadow: 0px 8px 24px rgba(83, 45, 117, 0.1);
  border-radius: 10px;
  height: fit-content;

  @media (max-width: 440px) {
    width: 330px;
  }
`

const Title = styled.h4`
  margin: 0;
  padding-bottom: 15px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  font-weight: ${theme.fontWeights.regular};
`

const IconContainer = styled.button<{ disabledButton?: boolean }>`
  border: none;
  background-color: transparent;
  cursor: pointer;
  margin-left: 20px;
  position: absolute;
  right: 0px;

  ${props =>
    props.disabledButton &&
    css`
      opacity: 0.4;
      cursor: not-allowed;
      margin-top: -5px;
    `};
`

export { Container, Title, IconContainer }
