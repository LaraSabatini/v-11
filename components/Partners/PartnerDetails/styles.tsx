import styled from "styled-components"
import theme from "theme/index"

const Container = styled.div`
  background-color: white;
  height: 450px;
  width: 450px;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 20px 5px rgba(59, 0, 135, 0.1);
  font-family: ${theme.fonts.primary};
`

const Title = styled.h4`
  margin: 0;
  font-size: 20px;
  display: flex;
  align-items: center;
  width: 400px;
  justify-content: space-between;
  position: relative;

  span {
    display: flex;
    align-items: center;
    font-size: 15px;

    p {
      margin-right: 10px;
    }
  }
`

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${theme.colors.neutral_dark};
`

const PartnerData = styled.div`
  padding-top: 25px;
  p {
    text-decoration: underline;
    margin: 0;
  }
  display: flex;
  justify-content: space-between;
`

const Details = styled.div`
  padding: 0 10px;
`

const HorizontalSection = styled.div`
  display: flex;
  justify-content: space-between;
`

const IconContainer = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  margin-left: 20px;
  position: absolute;
  right: -50px;
`

export {
  Container,
  Title,
  Divider,
  PartnerData,
  Details,
  HorizontalSection,
  IconContainer,
}
