import styled, { css } from "styled-components"
import theme from "theme/index"

const PartnerData = styled.div`
  padding-top: 20px;
  p {
    text-decoration: underline;
    margin: 0;
  }
  display: flex;
  justify-content: space-between;
`

const Details = styled.div`
  padding: 0 10px;
  height: 370px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
`

const RemoveButton = styled.button<{ disabledButton: boolean }>`
  background: ${theme.colors.danger};
  border: none;
  padding: 10px 15px;
  font-family: ${theme.fonts.primary};
  font-size: 16px;
  border-radius: 5px;
  color: white;
  cursor: pointer;

  ${props =>
    props.disabledButton &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `};
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  align-self: flex-end;
`

const DaysLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  p {
    text-decoration: none;
  }

  .remove {
    border: none;
    font-family: ${theme.fonts.primary};
    display: flex;
    align-items: center;
    padding: 5px;
    width: 20px;
    height: 20px;
    border-radius: 3px;
    cursor: pointer;
  }
`

export { PartnerData, Details, RemoveButton, ButtonContainer, DaysLeft }
