import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Components/Layout'
import IndexPage from './Components/Pages/IndexPage'
import LoginPage from './Components/Pages/LoginPage'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<IndexPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Route>
    </Routes> 
  )
}

export default App
