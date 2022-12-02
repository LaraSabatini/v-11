import styled from "styled-components"
import theme from "theme/index"

const Container = styled.div`
  border-radius: 5px;
  padding: 10px;
  box-shadow: 6px 6px 23px -3px rgba(83, 45, 117, 0.19);
  -webkit-box-shadow: 6px 6px 23px -3px rgba(83, 45, 117, 0.19);
  -moz-box-shadow: 6px 6px 23px -3px rgba(83, 45, 117, 0.19);
  cursor: pointer;
  border: 1px solid transparent;

  &:hover {
    border: 1px solid ${theme.colors.focus};
  }

  p {
    margin: 0;
    font-size: 14px;
  }
`

const Name = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Description = styled.p`
  padding-top: 10px;
  font-weight: ${theme.fontWeights.light};
`

export { Container, Name, Description }
