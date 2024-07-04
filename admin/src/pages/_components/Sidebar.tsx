import clsx from 'clsx'
import { Home, LayoutDashboard, Tag } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const SIDE_BAR = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <LayoutDashboard />
  },
  {
    title: 'Test',
    path: '/test',
    icon: <Home />
  },
  {
    title: 'Users',
    path: '/users',
    icon: <Tag />
  }
]

interface Props {
  isOpen: boolean
}

export default function Sidebar({ isOpen }: Props) {
  const currentPath = useLocation().pathname
  console.log("currunpath",currentPath)
  return (
    <ul
      className={clsx('md:relative absolute z-50 top-13 left-0 bg-[#fff] h-full  space-y-2 border-r p-4', {
        'md:w-64 w-96': isOpen,
        'md:w-28 md:block hidden': !isOpen
      })}
    >
      {SIDE_BAR.map(item => (
        <Link to={`${item.path}`} key={item.title}>
          <li
            className={clsx('flex cursor-pointer gap-4 rounded-sm px-6 py-2', {
              'bg-[#4054ac]': currentPath === `${item.path}`,
              'text-white': currentPath === `${item.path}`
            })}
          >
            <div className='md:text-2xl w-6'>{item.icon}</div>
            {isOpen && <span>{item.title}</span>}
          </li>
        </Link>
      ))}
    </ul>
  )
}