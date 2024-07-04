import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './_components/Sidebar'
import Header from './_components/Header'
import { TestsContext } from '../../utils/testContext'
import { Toaster } from "@/components/ui/toaster"

export default function Layout() {
  const [isOpen, setIsOpen] = useState(true)

  const onToggle = () => {
    setIsOpen(isOpen => !isOpen)
  }

  const [test, setTest] = useState<string>("");
  const handleTestChange  = (testname: string) => {
    setTest(testname);
  }
  console.log("test: ", test);

  return (
    <TestsContext.Provider value={{test, handleTestChange}}>
    <div className="w-full ">
      <Header onToggle={onToggle} isOpen={isOpen} />
      <div className="flex h-[calc(100vh-48px)]">
        <Sidebar isOpen={isOpen} />
        <div className="w-full p-10 bg-secondary">
          <Outlet />
          <Toaster />
        </div>
      </div>
    </div>
    </TestsContext.Provider>
  )
}