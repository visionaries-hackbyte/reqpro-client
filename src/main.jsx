import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Layout from './components/Layout/Layout';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div style={{ height: '100vh', width: '100vw' }}>
      <Layout />
    </div>
  </StrictMode>
);
