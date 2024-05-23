import { ArrowLeft, ArrowRight, Bell } from 'lucide-react'
import clsx from 'clsx'
import LogoIcon from '../../components/LogoIcon'
import UserProfile from './UserProfile'
import Logo from '@/components/Logo'

interface Props {
  onToggle: () => void
  isOpen: boolean
}

export default function Header({ onToggle, isOpen }: Props) {
  return (
    <div className="flex w-full border-b bg-[#4054ac]">
      <div
        className={clsx('flex items-center px-8 text-center text-2xl font-bold', {
          'w-64': isOpen,
          'w-28': !isOpen
        })}
      >
        {isOpen ? <Logo /> : <LogoIcon />}
      </div>
      <div
        className={clsx('relative flex flex-row  items-center justify-between px-7 py-2', {
          'w-[calc(100%-16rem)]': isOpen,
          'w-[calc(100%-4rem)]': !isOpen
        })}
      >
        <button
          onClick={onToggle}
          className="absolute md:-left-4 -left-9 top-2 h-8 w-8 cursor-pointer rounded-full bg-primary p-1 "
        >
          {isOpen ? <ArrowLeft /> : <ArrowRight />}
        </button>
        {/* <Input placeholder="Search..." className="h-9 w-64" /> */}
        <div className='w-full'>
          {/* <div>
            <Bell />
          </div> */}
        <div className="flex  gap-4 float-end">
        <Bell />
          <UserProfile />
        </div>
        </div>
      </div>
    </div>
  )
}