import styled from "styled-components";

const Div = styled.div`
  --color: ${(props) => props.color};
  text-align: left;

  .MuiFormControl-root {
    margin: 2px 8px;
  }

  .MuiInputBase-root {
    color: var(--color);
  }

  .MuiSvgIcon-root {
    fill: var(--color);
  }

  .MuiInput-underline::before {
    border-bottom: 1px solid var(--color);
  }

  .makeStyles-selectEmpty-275 {
    margin-top: 0;
  }

  .makeStyles-formControl-274 {
    margin: 0;
  }

  .MuiInput-underline::after {
    border-bottom: 1px solid var(--color);
  }

  .MuiInput-underline:hover:not(.Mui-disabled)::before {
    border-bottom: 2px solid var(--color);
    border-bottom-color: var(--color);
  }

  .Mui-selected:hover {
    background-color: var(--color);
  }

  .makeStyles-formControl-274 {
    margin: 2px 5px;
  }
`;
export default Div