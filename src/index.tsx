import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './pages/main/Main';
import reportWebVitals from './reportWebVitals';
import { IntlProvider } from 'react-intl';
import messages from './locale';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const lang = 'en';

root.render(
  <React.StrictMode>
    <IntlProvider messages={messages[lang]} locale={lang}>
      <Main />
    </IntlProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
