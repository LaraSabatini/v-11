import styled from "styled-components"

const Container = styled.div<{ color?: string; colorSecondary?: string }>`
  .toggle-switch input[type="checkbox"]:checked + .switch::before {
    transform: translateX(20px);
    background-color: ${props =>
      props.colorSecondary ? props.colorSecondary : "#6699cc"};
  }
  .toggle-switch input[type="checkbox"]:checked + .switch {
    background-color: ${props => (props.color ? props.color : "#336699")};
  }

  .toggle-switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
  }
  .toggle-switch input[type="checkbox"] {
    display: none;
  }
  .toggle-switch .switch {
    position: absolute;
    cursor: pointer;
    background-color: #ccc;
    border-radius: 20px;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: background-color 0.2s ease;
  }
  .toggle-switch .switch::before {
    position: absolute;
    content: "";
    left: 2px;
    top: 2px;
    width: 16px;
    height: 16px;
    background-color: #aaa;
    border-radius: 50%;
    transition: transform 0.3s ease;
  }
  /* .toggle-switch input[type="checkbox"]:checked + .switch::before {
    transform: translateX(20px);
    background-color: #6699cc;
  }
  .toggle-switch input[type="checkbox"]:checked + .switch {
    background-color: #336699;
  } */
`
export default Container
