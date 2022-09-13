import styled from "styled-components"
import theme from "theme/index"

const Container = styled.div`
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
`

const Form = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 20px 4px rgba(83, 45, 117, 0.1);
  border-radius: 10px;
  height: 100%;
  width: 450px;
  font-family: ${theme.fonts.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
`

const Title = styled.p`
  width: 135px;
  padding-left: 5px;
`

const Head = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  position: relative;
  border-bottom: 1px solid ${theme.colors.neutral_dark};
`

const DividerOne = styled.div`
  position: absolute;
  width: 1px;
  background-color: ${theme.colors.neutral_dark};
  height: 327px;
  left: 130px;
  top: 15px;
`
const DividerTwo = styled.div`
  position: absolute;
  width: 1px;
  background-color: ${theme.colors.neutral_dark};
  height: 327px;
  left: 265px;
  top: 15px;
`

const Items = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
`

const Item = styled.div`
  display: flex;
  border-bottom: 1px solid ${theme.colors.neutral_dark};
  cursor: pointer;

  p {
    width: 135px;
    margin-left: 10px;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin-top: 50px;

  .edit {
    border: none;
    border-radius: 50%;
    background-color: ${theme.colors.primary};
    display: flex;
    align-items: center;
    padding: 10px;
    outline: none;
    cursor: pointer;
  }
`

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  margin-left: -15px;

  input {
    width: 70px;
    padding: 5px;
    height: 20px;
    border: 1px solid ${theme.colors.grey_light};
    border-radius: 5px;
  }
`

export {
  Container,
  Form,
  Title,
  Head,
  DividerOne,
  DividerTwo,
  Items,
  Item,
  ButtonContainer,
  InputContainer,
}
