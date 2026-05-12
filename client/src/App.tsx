// import { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Userpage from './pages/Userpage';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';

export default function App() {
  // const [serverData, setServerData] = useState('');

  // useEffect(() => {
  //   async function readServerData() {
  //     const resp = await fetch('/api/hello');
  //     const data = await resp.json();

  //     console.log('Data from server:', data);

  //     setServerData(data.message);
  //   }

  //   readServerData();
  // }, []);

  return (
    <>
      <div className="App">
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/userpage" element={<Userpage />} />
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
