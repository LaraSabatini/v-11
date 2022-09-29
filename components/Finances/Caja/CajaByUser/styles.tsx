import styled from "styled-components"
import theme from "theme/index"

const MainContainer = styled.div`
  font-family: ${theme.fonts.primary};
  padding-top: 50px;
`

const CardContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
`

const Card = styled.div`
  background-color: white;
  width: 250px;
  box-shadow: 0px 4px 20px 4px rgba(83, 45, 117, 0.1);
  border-radius: 10px;
  padding: 15px 10px;
`

const User = styled.p`
  margin: 0;
  border-radius: 5px;
  font-size: 17px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-weight: ${theme.fontWeights.bold};
    background-color: ${theme.colors.success_light};
    padding: 5px;
    border-radius: 3px;
    width: 80px;
    text-align: right;
  }
`

export { MainContainer, CardContainer, Card, User }
