import { lazy, useEffect } from 'react'

import CloseButton from '@/components/close-button'
import Modal from '@/components/modal'
import { cn } from '@/libs/cn'

import {
  SettingModalTabsID,
  SettingModalTabsProvider,
  tabs,
  useSettingModalTabsContext
} from './store/setting-modal-tabs.context'

interface Props {
  itemId: number
  isOpen: boolean
  onClose: () => void
}

const ComponentMap = {
  [SettingModalTabsID.myAccount]: lazy(() => import('./my-account')),
  [SettingModalTabsID.myProfile]: lazy(() => import('./my-profile')),
  [SettingModalTabsID.voiceSetting]: lazy(() => import('./voice-setting')),
  [SettingModalTabsID.alarmSetting]: lazy(() => import('./alarm-setting'))
}

function Inner({ itemId, isOpen, onClose }: Props) {
  const { currentItemId, setCurrentItemId } = useSettingModalTabsContext()

  useEffect(
    function initialCurrentItemId() {
      handleClickItem(itemId)()
    },
    // 컴포넌트가 마운트될 때만 실행
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [itemId]
  )

  const handleClickItem = (itemId: SettingModalTabsID) => () => {
    setCurrentItemId(itemId)
  }

  const SettingModalCurrentComponent = ComponentMap[currentItemId]

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}>
      <section className='w-dvw h-dvh bg-brand-10 motion-opacity-in-20 motion-scale-in-90 animate-in fade-in-0 slide-in-from-bottom-10 duration-400 ease-in-out'>
        <div className='flex h-full'>
          <div className='flex justify-end flex-[1_0_auto] bg-gray-20 pr-2'>
            <nav className='py-[60px] px-[6px] mt-[56px] flex flex-col gap-4'>
              {tabs.map((tab) => (
                <div key={tab.name}>
                  <h3
                    className={cn(
                      'text-[12px] leading-4 font-bold h-7 w-[192px] py-[6px] px-[10px] text-white-20'
                    )}>
                    {tab.name}
                  </h3>
                  <ul>
                    {tab.items.map((item) => (
                      <li
                        key={item.id}
                        className={cn(
                          'text-gray-90 flex items-center font-medium h-8 w-[192px] py-[6px] px-[10px] mt-[2px] rounded-md',
                          currentItemId === item.id && 'text-white-100 bg-gray-80'
                        )}>
                        <button
                          type='button'
                          onClick={handleClickItem(item.id)}
                          className='w-full text-left leading-[20px] text-[16px]'>
                          {item.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
          <div className='flex flex-[1_1_800px] bg-brand-10'>
            <div className='max-w-[740px] w-full relative'>
              <div className='overflow-y-auto h-full'>
                <SettingModalCurrentComponent />
              </div>
              <div className='absolute right-[-40px] top-[60px] text-white'>
                <CloseButton onClick={onClose} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Modal>
  )
}

const SettingModal = (props: Props) => {
  return (
    <SettingModalTabsProvider>
      <Inner {...props} />
    </SettingModalTabsProvider>
  )
}

export default SettingModal
