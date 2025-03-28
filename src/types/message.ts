interface ChannelMessage {
  id?: number // RESPONSE에만 있음
  chatType?: 'CHANNEL' | 'DM' // 과거메세지 받을 땐 없음
  serverId: number
  channelId: number
  sequence?: number // RESPONSE랑 과거 메세지 조회에만 있음
  sendMemberId: number
  content: string
  createdAt?: string
}

interface SearchMessage {
  id: number
  serverId: number
  sequence: number
  channelId: number
  sendMemberId: number
  content: string
  createdAt: string
}

export { type ChannelMessage, type SearchMessage }
