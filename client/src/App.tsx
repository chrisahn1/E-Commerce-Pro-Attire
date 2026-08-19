// import { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Layout from './components/Layout';
import Userpage from './pages/Userpage';
import TopWear from './pages/TopWear';
import Pants from './pages/Pants';
import Shoes from './pages/Shoes';
import PurchaseList from './pages/PurchaseList';
import Kart from './pages/Kart';
import Settings from './pages/Settings';

import ProtectRoute from './routes/ProtectedRoutes';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';

export default function App() {
  return (
    <>
      <div className="App">
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<Layout />}>
              <Route element={<ProtectRoute />}>
                <Route path="/userpage" element={<Userpage />} />
                <Route path="/topwear" element={<TopWear />} />
                <Route path="/pants" element={<Pants />} />
                <Route path="/shoes" element={<Shoes />} />
                <Route path="/purchaselist" element={<PurchaseList />} />
                <Route path="/kart" element={<Kart />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Route>
          </Routes>
        </HashRouter>
      </div>
    </>
    // <>
    //   <div>
    //     <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank" rel="noreferrer">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>{serverData}</h1>
    // </>
  );
}
