/* Built-in modules */
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

/* Custom modules */
import { router } from '@/router';

/* Components */
import App from './components/main/app';

/* Styles */
import './index.css';

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App router={router} />
    </StrictMode>,
  );
}
