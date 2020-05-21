import styled from 'styled-components';

const Div = styled.div<{ color?: string; display?: string }>`
  --color: ${(props) => props.color};
  --display: ${(props) => props.display};

  text-align: left;
  display: var(--display) !important;
  * {
    color: var(--color) !important;
  }

  .MuiInputBase-root {
    /* color: var(--color);  */
    width: 10em;
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

  .MuiFormControl-root {
    padding: 0 10px;
  }

  .date_field {
    max-width: 50%;
  }

  .MuiFormControl-marginNormal {
    margin-top: 0px;
    margin-bottom: 0px;
  }
`;
export default Div;
