import styled, { css } from "styled-components"
import theme from "theme/index"

const Container = styled.div`
  background-color: white;
  /* height: 410px; */
  width: 400px;
  /* border-radius: 10px; */
  padding: 20px;
  /* box-shadow: 0px 0px 20px 5px rgba(59, 0, 135, 0.1); */
  font-family: ${theme.fonts.primary};
  /* border: 1px solid red; */

  background: #fffffe;
  box-shadow: 0px 8px 24px rgba(83, 45, 117, 0.1);
  border-radius: 10px;
  /* border: 1px solid green; */
  height: fit-content;
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
