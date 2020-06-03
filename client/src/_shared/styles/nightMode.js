import styled from "styled-components";

const StyledNightmode = styled.div`
  display: block;
  font-weight: 5;
  letter-spacing: 0.1em;
  font-size: 18px;
  color: #fff;
  padding: 8px 3px 3px 20px;
  margin: 0 0 20px 0;
  background-color: rgba(80, 80, 80, 0.1);
  span {
    padding-right: 45px;
    margin-right: 20px;
  }
  /* CSS taken from https://www.w3schools.com/howto/howto_css_switch.asp */
  /* The switch - the box around the slider */
  .switch {
    position: relative;
    display: inline-block;
    width: 30px;
    height: 24px;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: ${props => props.theme.border};
    background-color: #fff;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: #17a2b8;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #353535;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(16px);
    -ms-transform: translateX(16px);
    transform: translateX(16px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 30px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;

export default StyledNightmode;
