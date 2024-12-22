import { createRoot } from 'react-dom/client';
import { App } from './pages/home';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Details } from './pages/details';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'Tenada';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2210-2@1.0/Tenada.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}
`;
createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename={'/official-escape-time'}>
    <GlobalStyle />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/details/:id" element={<Details />} />
    </Routes>
  </BrowserRouter>
);
