import styled from "styled-components"
import theme from "theme/index"

const PartnerData = styled.div`
  padding-top: 30px;
  p {
    text-decoration: underline;
    margin: 0;
  }
  display: flex;
  justify-content: space-between;
`

const Details = styled.div`
  padding: 0 10px;
  position: relative;
`

const RemoveButton = styled.button`
  background: ${theme.colors.danger};
  border: none;
  padding: 10px 15px;
  font-family: ${theme.fonts.primary};
  font-size: 16px;
  border-radius: 5px;
  color: white;
  position: absolute;
  right: 0;
  bottom: -50px;
  cursor: pointer;
`

export { PartnerData, Details, RemoveButton }
