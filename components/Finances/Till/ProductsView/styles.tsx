import styled from "styled-components"
import theme from "theme/index"

const Container = styled.div`
  margin-top: 20px;
`

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`

const TillTotal = styled.div`
  font-family: ${theme.fonts.primary};

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  width: 400px;
  box-shadow: 0px 4px 20px 4px rgba(83, 45, 117, 0.1);
  border-radius: 5px;
  margin-bottom: 10px;

  .title {
    background-color: ${theme.colors.success_light};
    text-decoration: none;
    padding: 3px;
  }

  span {
    text-decoration: underline;
  }

  p {
    margin: 0;
  }
`

const ProfitsContainer = styled.div`
  display: flex;
  gap: 10px;
`

export { Container, CardsContainer, TillTotal, ProfitsContainer }
