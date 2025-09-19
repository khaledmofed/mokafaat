import { Global, css } from "@emotion/react";

const GlobalStyles = () => (
  <Global
    styles={css`
      [dir="rtl"] {
        body,
        button,
        input,
        select,
        textarea,
        p,
        span,
        div {
          font-family: "Readex Pro", "sans-serif";
        }

        td.text-sm.capitalize {
          text-align: start;
        }

        [lang="ar"] {
          font-family: "Readex Pro", "sans-serif";
        }
      }
    `}
  />
);

export default GlobalStyles;
