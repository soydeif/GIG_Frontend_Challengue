import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@/App';
import { Toaster } from 'react-hot-toast';
import '@/styles/reset.css'

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <div>
    <Toaster position="top-right" reverseOrder={false} />
    <App />
  </div>
);

