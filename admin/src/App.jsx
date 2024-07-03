import React from 'react'
import { Navbar } from './components/Navbar/Navbar'
import { Admin } from './pages/Admin/Admin'
import { Button } from '../component-shadcn-ui/ui/button'
const App = () => {
  return (
    <div>
      <Navbar/>
      <Admin/>
      <Button>hi</Button>
    </div>
  )
}

export default App