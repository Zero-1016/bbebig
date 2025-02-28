import { z } from 'zod'

import { ChannelType, ChannelUser } from '@/types/server'
import { CustomPresenceStatus } from '@/types/user'

import {
  createCategoryRequestSchema,
  createCategoryResponseSchema,
  createChannelRequestSchema,
  createChannelResponseSchema,
  inviteUserRequestSchema,
  inviteUserResponseSchema
} from '../service'

export interface DeleteServerRequestSchema {
  serverId: number
}

export interface DeleteServerResponseSchema {
  serverId: number
}

export interface WithdrawServerRequestSchema {
  serverId: number
}

export interface WithdrawServerResponseSchema {
  serverId: number
}

export interface GetServerListRequestSchema {
  serverId: string
}

export interface GetServerListResponseSchema {
  serverId: number
  serverName: string
  ownerId: number
  serverImageUrl: string | null
  categoryInfoList: {
    categoryId: number
    categoryName: string
    position: number
  }[]
  channelInfoList: {
    channelId: number
    categoryId: number
    position: number
    channelName: string
    channelType: ChannelType
    privateStatus: boolean
    channelMemberIdList: number[]
  }[]
}

export interface GetServersResponseSchema {
  servers: {
    serverId: number
    serverName: string
    serverImageUrl: string | null
  }[]
}

export interface GetServerMemebersRequestSchema {
  serverId: number
}

export interface GetServerMemebersResponseSchema {
  serverId: number
  serverMemberInfoList: {
    memberId: number
    nickName: string
    avatarUrl: string | null
    bannerUrl: string | null
    globalStatus: CustomPresenceStatus
  }[]
}

export interface GetMemberIdListInServerRequestSchema {
  serverId: number
}

export interface GetMemberIdListInServerResponseSchema {
  serverId: number
  ownerId: number
  memberIdList: number[]
}

export interface GetChannelIdListInServerRequestSchema {
  serverId: number
}

export interface GetChannelIdListInServerResponseSchema {
  serverId: number
  channelIdList: number[]
}

export interface GetMemberInfoLastVisitChannelRequestSchema {
  serverId: number
  memberId: number
}

export interface GetMemberInfoLastVisitChannelResponseSchema {
  serverId: number
  channelInfoList: {
    channelId: number
    lastReadMessageId: number
    lastAccessAt: string | Date
  }[]
}

export interface GetServerIdListWithMemberIdRequestSchema {
  memberId: number
}

export interface GetServerIdListWithMemberIdResponseSchema {
  memberId: number
  serverIdList: number[]
}

export interface CreateServerRequestSchema {
  serverName: string
  serverImageUrl: string | null
}

export interface CreateServerResponseSchema {
  serverId: number
}

export interface ParticipateServerRequestSchema {
  serverId: number
  memberNickname: string
  memberProfileImageUrl: string | null
}

export interface ParticipateServerResponseSchema {
  serverId: number
}

export interface UpdateServerRequestSchema {
  serverId: number
  serverName: string
  serverImageUrl: string | null
}

export interface UpdateServerResponseSchema {
  serverId: number
  serverName: string
  serverImageUrl: string | null
}

export interface DeleteChannelRequestSchema {
  channelId: number
}

export interface DeleteChannelResponseSchema {
  channelId: number
}

export interface GetChannelListRequestSchema {
  channelId: number
}

export interface GetChannelListResponseSchema {
  channelId: number
  channelName: string
  channelPosition: number
  channelType: ChannelType
  privateStatus: boolean
}

export interface GetChannelLastVisitInfoWithMemberIdRequestSchema {
  channelId: number
  memberId: number
}

export interface GetChannelLastVisitInfoWithMemberIdResponseSchema {
  channelId: number
  lastReadMessageId: number
  lastAccessAt: string | Date
}

export interface CreateChannelRequestSchema {
  serverId: number
  categoryId: number | null
  channelType: ChannelType
  channelName: string
  privateStatus: boolean
  memberIds: number[]
}

export interface CreateChannelResponseSchema {
  channelId: number
}

export interface UpdateChannelRequestSchema {
  channelId: number
  channelName: string
  privateStatus: boolean
  memberIds: number[]
}

export interface UpdateChannelResponseSchema {
  channelId: number
  channelName: string
  privateStatus: boolean
}

export interface DeleteChannelRequestSchema {
  channelId: number
}

export interface DeleteChannelResponseSchema {
  channelId: number
}

export interface GetChannelListRequestSchema {
  channelId: number
}

export interface GetChannelListResponseSchema {
  channelId: number
  channelName: string
  channelPosition: number
  channelType: ChannelType
  privateStatus: boolean
}

export interface GetChannelLastVisitInfoWithMemberIdRequestSchema {
  channelId: number
  memberId: number
}

export interface GetChannelLastVisitInfoWithMemberIdResponseSchema {
  channelId: number
  lastReadMessageId: number
  lastAccessAt: string | Date
}

export interface CreateChannelRequestSchema {
  serverId: number
  categoryId: number | null
  channelType: ChannelType
  channelName: string
  privateStatus: boolean
  memberIds: number[]
}

export interface CreateChannelResponseSchema {
  channelId: number
}

export interface UpdateChannelRequestSchema {
  channelId: number
  channelName: string
  privateStatus: boolean
  memberIds: number[]
}

export interface UpdateChannelResponseSchema {
  channelId: number
  channelName: string
  privateStatus: boolean
}

export interface DeleteCategoryRequestSchema {
  categoryId: number
}

export interface DeleteCategoryResponseSchema {
  categoryId: number
}

export interface GetCategoriesRequestSchema {
  categoryId: number
}

export interface GetCategoriesResponseSchema {
  categoryId: number
  serverId: number
  categoryName: string
  categoryPosition: number
}

export interface CreateCategoryRequestSchema {
  serverId: number
  categoryName: string
}

export interface CreateCategoryResponseSchema {
  categoryId: number
}

export interface UpdateCategoryRequestSchema {
  categoryId: number
  categoryName: string
}

export interface UpdateCategoryResponseSchema {
  categoryId: number
  categoryName: string
}

export interface GetChannelUserListRequestSchema {
  channelId: number
}

export interface GetChannelUserListResponseSchema {
  channelUserList: ChannelUser[]
}

export interface GetChannelListInServerRequestSchema {
  serverId: number
}

export interface GetChannelListInServerResponseSchema {
  serverId: number
  channelIdList: number[]
}

export type ZCreateChannelRequestSchema = z.infer<typeof createChannelRequestSchema>
export type ZCreateChannelResponseSchema = z.infer<typeof createChannelResponseSchema>
export type ZCreateCategoryRequestSchema = z.infer<typeof createCategoryRequestSchema>
export type ZCreateCategoryResponseSchema = z.infer<typeof createCategoryResponseSchema>
export type ZInviteUserRequestSchema = z.infer<typeof inviteUserRequestSchema>
export type ZInviteUserResponseSchema = z.infer<typeof inviteUserResponseSchema>
