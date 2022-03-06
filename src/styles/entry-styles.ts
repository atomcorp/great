import {css} from 'lit';

const entryStyles = css`
  h3 {
    margin: 0 0 10px;
    display: flex;
  }
  .date {
    margin: 0 auto 0 0;
  }
  textarea {
    width: 100%;
    padding: 10px;
    height: 100%;
  }
  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .entry {
    white-space: pre-wrap;
  }
`;

export default entryStyles;
