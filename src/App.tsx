import './App.css'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
    <header>
    </header>
    
    <main>
      <Outlet></Outlet>
    </main>

    <footer> 
    </footer>
    </>
  )
}

export default App
