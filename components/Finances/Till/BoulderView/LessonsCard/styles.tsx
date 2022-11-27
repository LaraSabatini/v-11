import styled from "styled-components"

const Card = styled.div`
  background-color: white;
  width: 380px;
  padding: 15px 15px;
  border-radius: 10px;
  box-shadow: 0px 4px 20px 4px rgba(83, 45, 117, 0.1);
  height: fit-content;

  .shoes {
    background-color: #48aba372;
  }

  .pass {
    background-color: #532d7537;
  }

  .month {
    background-color: #c66a485b;
  }

  .combo {
    background-color: #70777c57;
  }

  .lessons {
    background-color: #b2b9e29c;
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
  padding: 0 10px;
  justify-content: space-between;

  p {
    margin: 0;
    padding: 15px 0 10px 0;
  }

  .asistencies {
    width: 200px;
  }
`

export { Card, Title, Earnings }
