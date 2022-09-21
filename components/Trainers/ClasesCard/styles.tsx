import styled from "styled-components"
import theme from "theme/index"

const Card = styled.div`
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 4px 20px 4px rgba(83, 45, 117, 0.1);
  border-radius: 10px;
  padding: 10px 10px 20px 10px;
  font-family: ${theme.fonts.primary};
`

const Title = styled.p`
  margin: 0;
  background-color: ${theme.colors.grey_lighter};
  padding: 5px 20px;
  border-radius: 5px;
`

const Days = styled.div`
  display: flex;
  gap: 10px;

  p {
    margin: 0;
    text-decoration: underline;
  }

  ul {
    font-weight: ${theme.fontWeights.light};
    margin: 0;
  }

  .remove {
    cursor: pointer;
  }
`

const Data = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: center;
  gap: 150px;
  margin-left: 15px;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  align-self: flex-end;
`

export { Card, Title, Days, Data, ButtonContainer }
