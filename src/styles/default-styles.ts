import {css} from 'lit';

const defaultStyles = css`
  button,
  button:focus,
  input,
  input:focus,
  textarea,
  textarea:focus {
    font-size: 18px;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
`;

export default defaultStyles;
