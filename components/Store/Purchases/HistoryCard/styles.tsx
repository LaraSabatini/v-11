import styled from "styled-components"
import theme from "theme/index"

const Card = styled.div`
  font-family: ${theme.fonts.primary};
  display: flex;
  box-shadow: 0px 4px 20px 4px rgba(83, 45, 117, 0.1);
  border-radius: 10px;
  gap: 20px;
  padding: 20px;
  height: 150px;
  .zapas {
    width: 90px;
  }

  .monster {
    width: 50px;
  }

  .calendar {
    width: 103px;
    height: 95px;
    margin-top: 25px;
  }
`

const ComponentContainer = styled.div`
  margin-top: 10px;
`

const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  p {
    margin: 0;
  }
  .name {
    font-size: 18px;
  }

  .profits {
    display: flex;
    flex-direction: column;
    gap: 10px;
    span {
      color: ${theme.colors.green};
      font-size: 30px;
      display: flex;
      align-items: center;
      gap: 10px;

      p {
        font-size: 15px;
      }
    }
  }

  .cost {
    display: flex;
    flex-direction: column;
    gap: 5px;
    span {
      color: #686868;
      font-weight: ${theme.fontWeights.medium};
      font-size: 23px;
    }
  }
`

const HorizontalGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

export { Card, ComponentContainer, Description, HorizontalGroup }
