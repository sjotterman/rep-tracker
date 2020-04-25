import "semantic-ui-css/semantic.min.css";
// Not entirely sure why I need this
// eslint-disable-next-line no-unused-vars
import { AppProps } from "next/app";

// This default export is required in a new `pages/_app.js` file.
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
