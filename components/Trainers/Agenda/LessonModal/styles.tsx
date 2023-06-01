import styled from "styled-components"
import theme from "theme"

const Student = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 5px;

  p {
    margin: 0;
  }

  .button-edit {
    border: none;
    outline: none;
    cursor: pointer;
    background-color: transparent;

    svg {
      width: 15px;
      height: 15px;
    }
  }

  .interactions {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`

const EditModal = styled.div`
  .selection {
    display: flex;
    gap: 15px;
    align-items: center;
    padding-top: 20px;

    .validate {
      border: none;
      background-color: ${theme.colors.primary};
      outline: none;
      cursor: pointer;
      color: white;
      padding: 5px 10px;
      border-radius: 5px;
    }
  }
  .buttons {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-top: 20px;
    justify-content: flex-end;
  }
  .error {
    color: red;
    font-family: ${theme.fonts.primary};
    font-size: 14px;
  }
`

export { Student, EditModal }
