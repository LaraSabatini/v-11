import styled from "styled-components"

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  position: absolute;
  bottom: 0;
  right: 0;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    box-shadow: 0px 4px 20px 4px rgba(83, 45, 117, 0.1);
  }
`
export default ButtonContainer
