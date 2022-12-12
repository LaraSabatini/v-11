import styled from "styled-components"
import theme from "theme/index"

const Container = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`

const Form = styled.div`
  height: 600px;
  width: 450px;
  font-family: ${theme.fonts.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
  background: #fffffe;
  box-shadow: 0px 8px 24px rgba(83, 45, 117, 0.1);
  border-radius: 10px;
`

const Title = styled.p`
  padding-left: 5px;
  font-size: 15px;
`

const Head = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  position: relative;
  border-bottom: 1px solid ${theme.colors.neutral_dark};

  .item {
    margin-left: 24px;
    width: 120px;
  }

  .cash {
    width: 125px;
  }
`

const Items = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  overflow: scroll;
  overflow-x: hidden;
  height: 100%;
`

const Item = styled.div`
  display: flex;
  border-bottom: 1px solid ${theme.colors.neutral_dark};
  cursor: pointer;
  font-weight: ${theme.fontWeights.light};

  p {
    width: 135px;
  }

  .name {
    margin-left: 24px;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  width: 445px;
  justify-content: flex-end;
  padding-top: 15px;

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
  Items,
  Item,
  ButtonContainer,
  InputContainer,
}
