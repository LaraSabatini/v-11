import styled, { css } from "styled-components"
import theme from "theme/index"

const Card = styled.div<{ stock: boolean }>`
  ${props =>
    props.stock &&
    css`
      opacity: 0.5;
    `}

  font-family: ${theme.fonts.primary};
  width: 237px;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  background: #fffffe;
  box-shadow: 0px 8px 24px rgba(83, 45, 117, 0.1);
  border-radius: 10px;

  .zapas {
    width: 90px;
  }

  .monster {
    width: 65px;
  }

  .calendar {
    width: 90px;
    height: 82px;
    margin-top: 25px;
  }

  .coca {
    width: 80px;
  }

  .sprite {
    width: 80px;
  }

  .powerade {
    width: 70px;
  }
`

const Amount = styled.p`
  font-size: 25px;
`

const ComponentContainer = styled.div`
  margin-top: 10px;
`

const ComponentContainerZapas = styled.div`
  margin-top: 30px;

  svg {
    width: 104px;
    height: 83px;
  }
`

const ProductName = styled.p`
  font-weight: ${theme.fontWeights.light};
  width: 130px;
`

const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 150px;
  margin-left: 10px;
  width: 150px;
`

const ProductPrice = styled.p`
  font-size: 25px;
  margin: 0;
`

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${theme.colors.grey_lighter};
  height: 30px;
  margin-top: 25px;
  border-radius: 5px;
  padding: 5px;
  button {
    cursor: pointer;
    border: none;
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export {
  Card,
  ComponentContainer,
  ComponentContainerZapas,
  Description,
  ProductName,
  ProductPrice,
  IconContainer,
  Amount,
}
