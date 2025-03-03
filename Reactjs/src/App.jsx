import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Header'
import ProductList from './ProductList'
import Footer from './Footer'
import data from './data'

function App() {
  const [isGrid, setIsGrid] = useState(false)
  return (
    <>
      <Header></Header>
      <button className='toggle' onClick={() => setIsGrid(!isGrid)}>Toggle</button>
      <ProductList data={data} isGrid={isGrid}></ProductList>
      <Footer></Footer>
    </>
  )
}

export default App
