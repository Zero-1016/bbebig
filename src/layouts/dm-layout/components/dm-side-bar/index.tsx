import { useState } from 'react'

import MenuButton from '@/components/menu-button'
import { toastHelper } from '@/utils/toast-helper'

function DmSideBar() {
  const [selectedMenu, setSelectedMenu] = useState('친구')

  const handleMenuClick = (label: string) => () => {
    if (label === '친구') {
      setSelectedMenu(label)
    } else {
      toastHelper.prepare()
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toastHelper.prepare()
  }

  return (
    <div className='w-60 bg-discord-gray-700 h-screen flex flex-col'>
      <div className='h-12 px-3 flex items-center border-b border-discord-gray-800'>
        <form
          onSubmit={handleSubmit}
          className='w-full'>
          <input
            type='text'
            placeholder='대화 찾기 또는 시작하기'
            className='w-full h-8 bg-discord-gray-800 rounded-md p-2 focus:outline-none text-discord-font-color-normal text-sm'
          />
        </form>
      </div>
      <div className='flex flex-col gap-2 mt-3 mx-2'>
        {['친구', 'Nitro', '상점'].map((label) => (
          <MenuButton
            key={label}
            label={label}
            isActive={selectedMenu === label}
            onClick={handleMenuClick(label)}
          />
        ))}
      </div>
    </div>
  )
}

export default DmSideBar
