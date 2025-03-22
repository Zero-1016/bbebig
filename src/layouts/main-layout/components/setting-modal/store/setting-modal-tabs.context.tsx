import { createContext, useContext, useState } from 'react'

export const SettingModalTabsID = {
  myAccount: 101,
  myProfile: 102,
  voiceSetting: 201,
  alarmSetting: 202
}

export type SettingModalTabsID = (typeof SettingModalTabsID)[keyof typeof SettingModalTabsID]

export const tabs = [
  {
    name: '사용자 설정',
    items: [
      {
        id: SettingModalTabsID.myAccount,
        name: '내 계정'
      },
      {
        id: SettingModalTabsID.myProfile,
        name: '프로필'
      }
    ]
  },
  {
    name: '앱 설정',
    items: [
      {
        id: SettingModalTabsID.voiceSetting,
        name: '음성 및 비디오'
      },
      {
        id: SettingModalTabsID.alarmSetting,
        name: '알림'
      }
    ]
  }
] as const

export const SettingModalTabsContext = createContext<SettingModalTabsContextType>({
  currentItemId: SettingModalTabsID.myAccount,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCurrentItemId: () => {}
})

export const useSettingModalTabsContext = () => {
  const context = useContext(SettingModalTabsContext)
  if (!context) {
    throw new Error('SettingModalTabsContext is not found')
  }
  return context
}

export interface SettingModalTabsContextType {
  currentItemId: SettingModalTabsID
  setCurrentItemId: (itemId: SettingModalTabsID) => void
}

export function SettingModalTabsProvider({ children }: { children: React.ReactNode }) {
  const [currentItemId, setCurrentItemId] = useState<SettingModalTabsContextType['currentItemId']>(
    SettingModalTabsID.myAccount
  )

  const handleSetCurrentItemId = (itemId: SettingModalTabsContextType['currentItemId']) => {
    setCurrentItemId(itemId)
  }

  return (
    <SettingModalTabsContext.Provider
      value={{ currentItemId, setCurrentItemId: handleSetCurrentItemId }}>
      {children}
    </SettingModalTabsContext.Provider>
  )
}
