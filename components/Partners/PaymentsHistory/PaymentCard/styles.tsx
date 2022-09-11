import styled, { css } from "styled-components"
import theme from "theme/index"

const Card = styled.div`
  box-shadow: 0px 4px 20px 4px rgba(83, 45, 117, 0.1);
  border-radius: 10px;
  width: 420px;
  font-family: ${theme.fonts.primary};
  padding: 15px 25px 15px 20px;
  display: flex;
  flex-direction: column;
`

const Name = styled.p`
  margin: 0;
  font-size: 18px;
`

const Tags = styled.div`
  width: 240px;
  display: flex;
  gap: 5px;
  p {
    margin: 0;
  }
`

const Student = styled.p`
  background-color: #c66948;
  padding: 5px 10px;
  border-radius: 5px;
  color: ${theme.colors.white};
  font-weight: ${theme.fontWeights.light};
`

const FreePass = styled.p`
  background-color: #48aba2;
  padding: 5px 10px;
  border-radius: 5px;
  color: ${theme.colors.white};
  font-weight: ${theme.fontWeights.light};
`

const Day = styled.p`
  background-color: #764e9a;
  padding: 5px 10px;
  border-radius: 5px;
  color: ${theme.colors.white};
  font-weight: ${theme.fontWeights.light};
`

const CardHead = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  cursor: pointer;
`

const FirstData = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
`

const Button = styled.button<{ disabled: boolean }>`
  background: rgba(217, 217, 217, 0.63);
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  width: 20px;
  height: 20px;

  ${props =>
    props.disabled &&
    css`
      opacity: 1;
      cursor: none;
    `};
`

const DaysLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100px;
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  p {
    margin: 0;
  }

  span {
    font-weight: ${theme.fontWeights.light};
  }
`

const Date = styled.span`
  font-weight: ${theme.fontWeights.light};
`

const ButtonContainer = styled.div`
  align-self: flex-end;
  display: flex;
  gap: 10px;
`

export {
  Card,
  Name,
  Tags,
  Student,
  FreePass,
  Day,
  CardHead,
  FirstData,
  Button,
  DaysLeft,
  Section,
  Date,
  ButtonContainer,
}
