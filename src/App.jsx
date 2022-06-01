import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header, NotFound } from './components';
import { Home, Basket } from './pages';

const App = () => {
  return (
    <div className="wrapper p-40">
      <Header />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="basket" element={<Basket />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
