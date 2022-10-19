import styled from "styled-components"
import theme from "theme/index"

const Container = styled.div`
  font-family: ${theme.fonts.primary};
  margin-top: 20px;
  height: 90vh;
`

const FinalProfit = styled.div`
  font-family: ${theme.fonts.primary};
  width: 450px;
  box-shadow: 0px 4px 20px 4px rgba(83, 45, 117, 0.1);
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 25px;
  display: flex;
  background-color: white;
  gap: 100px;

  p {
    margin: 0;
  }

  span {
    text-decoration: underline;
  }
`

const CardsContainer = styled.div`
  display: flex;
  gap: 25px;
  flex-wrap: wrap;
`

const Card = styled.div`
  background-color: white;
  width: 350px;
  padding: 15px 15px;
  border-radius: 10px;
  box-shadow: 0px 4px 20px 4px rgba(83, 45, 117, 0.1);
  height: 162px;

  .shoes {
    background-color: #48aba372;
  }
`

const Title = styled.h4`
  margin: 0;
  background-color: #532d7537;
  padding: 10px;
  border-radius: 5px;
`

const Earnings = styled.div`
  display: flex;
  gap: 50px;
  border-bottom: 1px solid #532d7537;
  padding-left: 10px;

  p {
    margin: 0;
    padding: 15px 0 10px 0;
  }
`

export { Container, FinalProfit, Card, CardsContainer, Title, Earnings }
