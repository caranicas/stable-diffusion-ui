import React, {useEffect} from 'react'
import { useQuery } from '@tanstack/react-query';

import './App.css';

import HeaderDisplay from './components/headerDisplay';
import CreationPanel from './components/creationPanel';
import DisplayPanel from './components/displayPanel';
import FooterDisplay from './components/footerDisplay';

function App() {

  return (
    <div className="App">
      <header className="header-layout">
        <HeaderDisplay></HeaderDisplay>
      </header>
      <nav className="create-layout">
        <CreationPanel></CreationPanel>
      </nav>
      <main className="display-layout">
        <DisplayPanel></DisplayPanel>
      </main>
      <footer className="footer-layout">
        <FooterDisplay></FooterDisplay>
      </footer>
    </div>
  )
}

export default App
