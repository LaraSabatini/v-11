import styled from "styled-components"
import theme from "theme/index"

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`

const Card = styled.div`
  font-family: ${theme.fonts.primary};
  width: 260px;
  padding: 15px;
  height: 120px;
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  box-shadow: 0px 3px 9px 0px rgba(45, 54, 61, 0.13);
  -webkit-box-shadow: 0px 3px 9px 0px rgba(45, 54, 61, 0.13);
  -moz-box-shadow: 0px 3px 9px 0px rgba(45, 54, 61, 0.13);

  p {
    font-size: 18px;
    margin: 0;
    background-color: #774e9a4a;
    padding: 5px;
    border-radius: 5px;
    margin-bottom: 10px;
  }

  display: flex;
  flex-direction: column;

  span {
    padding: 5px;
  }
`

export { CardContainer, Card }
