import styled from "styled-components"

const CardsContainer = styled.div`
  display: flex;
  padding-top: 30px;
  width: 70%;
  margin: 0 auto;
  justify-content: space-between;
`

const Card = styled.div`
  display: flex;
  width: 400px;
  height: 520px;
  background-color: #f6f6f6;
  border-radius: 10px;
  padding: 20px;
`

const CardTitle = styled.h5`
  margin: 0;
  font-size: 18px;
`

export { CardsContainer, Card, CardTitle }
