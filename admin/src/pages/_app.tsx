import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './_components/Sidebar'
import Header from './_components/Header'


export default function Layout() {
  const [isOpen, setIsOpen] = useState(true)

  const onToggle = () => {
    setIsOpen(isOpen => !isOpen)
  }


  return (
    <div className="w-full ">
      <Header onToggle={onToggle} isOpen={isOpen} />
      <div className="flex h-[calc(100vh-48px)]">
        <Sidebar isOpen={isOpen} />
        <div className="w-full p-10 bg-secondary">
          <Outlet />
        </div>
      </div>
    </div>
  )
}