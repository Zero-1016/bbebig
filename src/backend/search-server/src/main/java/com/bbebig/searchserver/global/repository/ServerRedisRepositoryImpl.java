package com.bbebig.searchserver.global.repository;

import com.bbebig.commonmodule.redis.domain.ServerMemberStatus;
import com.bbebig.commonmodule.redis.repository.ServerRedisRepository;
import com.bbebig.commonmodule.redis.util.ServerRedisKeys;
import com.bbebig.searchserver.domain.history.domain.ChannelChatMessage;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Slf4j
@Repository
@RequiredArgsConstructor
public class ServerRedisRepositoryImpl implements ServerRedisRepository {

	// Long (Set) 전용
	private final RedisTemplate<String, Long> redisSetTemplate;
	private SetOperations<String, Long> setOperations;

	// ServerMemberStatus (Hash) 전용
	private final RedisTemplate<String, ServerMemberStatus> redisServerStatusTemplate;
	private HashOperations<String, String, ServerMemberStatus> hashOperations;

	// ChannelChatMessage (List) 전용
	private final RedisTemplate<String, ChannelChatMessage> redisChannelChatMessageTemplate;
	private ListOperations<String, ChannelChatMessage> listOperations;

	private static final int MAX_CACHE_SIZE = 100;

	@PostConstruct
	public void initRedisOps() {
		this.setOperations = redisSetTemplate.opsForSet();
		this.hashOperations = redisServerStatusTemplate.opsForHash();
		this.listOperations = redisChannelChatMessageTemplate.opsForList();
	}

	/**
	 * 서버에 참여하고 있는 멤버 목록을 Set 구조로 저장
	 * ex) server:{serverId}:serverMemberList => Set<MemberId>
	 */
	@Override
	public void saveServerMemberSet(Long serverId, List<Long> memberIdList) {
		String key = ServerRedisKeys.getServerMemberListKey(serverId);
		setOperations.add(key, memberIdList.toArray(new Long[0]));
	}

	@Override
	public void addServerMemberToSet(Long serverId, Long memberId) {
		String key = ServerRedisKeys.getServerMemberListKey(serverId);
		setOperations.add(key, memberId);
	}

	@Override
	public void removeServerMemberFromSet(Long serverId, Long memberId) {
		String key = ServerRedisKeys.getServerMemberListKey(serverId);
		setOperations.remove(key, memberId);
	}

	@Override
	public boolean existsServerMemberList(Long serverId) {
		String key = ServerRedisKeys.getServerMemberListKey(serverId);
		return Boolean.TRUE.equals(redisSetTemplate.hasKey(key));
	}

	@Override
	public Set<Long> getServerMemberList(Long serverId) {
		String key = ServerRedisKeys.getServerMemberListKey(serverId);
		return setOperations.members(key);
	}

	@Override
	public void deleteServerMemberList(Long serverId) {
		String key = ServerRedisKeys.getServerMemberListKey(serverId);
		redisSetTemplate.delete(key);
	}

	/**
	 * 서버별 멤버 상태 정보를 Hash 구조로 저장
	 * (server:{serverId}:serverMemberStatus) => ServerMemberStatus
	 */
	@Override
	public void saveServerMemberPresenceStatus(Long serverId, Long memberId, ServerMemberStatus status) {
		String key = ServerRedisKeys.getServerMemberPresenceStatusKey(serverId);
		hashOperations.put(key, memberId.toString(), status);
	}

	@Override
	public void removeServerMemberPresenceStatus(Long serverId, Long memberId) {
		String key = ServerRedisKeys.getServerMemberPresenceStatusKey(serverId);
		hashOperations.delete(key, memberId.toString());
	}

	@Override
	public boolean existsServerMemberPresenceStatus(Long serverId) {
		String key = ServerRedisKeys.getServerMemberPresenceStatusKey(serverId);
		return Boolean.TRUE.equals(redisServerStatusTemplate.hasKey(key));
	}

	@Override
	public ServerMemberStatus getServerMemberStatus(Long serverId, Long memberId) {
		String key = ServerRedisKeys.getServerMemberPresenceStatusKey(serverId);
		return hashOperations.get(key, memberId.toString());
	}

	@Override
	public List<ServerMemberStatus> getAllServerMemberStatus(Long serverId) {
		String key = ServerRedisKeys.getServerMemberPresenceStatusKey(serverId);
		return hashOperations.values(key);
	}

	@Override
	public void deleteServerMemberStatus(Long serverId) {
		String key = ServerRedisKeys.getServerMemberPresenceStatusKey(serverId);
		redisServerStatusTemplate.delete(key);
	}

	/**
	 * 서버에 참여하고 있는 채널 목록을 Set 구조로 저장
	 * ex) server:{serverId}:channelList => Set<ChannelId>
	 */
	@Override
	public void saveServerChannelSet(Long serverId, List<Long> channelIdList) {
		String key = ServerRedisKeys.getServerChannelListKey(serverId);
		setOperations.add(key, channelIdList.toArray(new Long[0]));
	}

	@Override
	public void addServerChannelToSet(Long serverId, Long channelId) {
		String key = ServerRedisKeys.getServerChannelListKey(serverId);
		setOperations.add(key, channelId);
	}

	@Override
	public void removeServerChannelFromSet(Long serverId, Long channelId) {
		String key = ServerRedisKeys.getServerChannelListKey(serverId);
		setOperations.remove(key, channelId);
	}

	@Override
	public boolean existsServerChannelList(Long serverId) {
		String key = ServerRedisKeys.getServerChannelListKey(serverId);
		return Boolean.TRUE.equals(redisSetTemplate.hasKey(key));
	}

	@Override
	public Set<Long> getServerChannelList(Long serverId) {
		String key = ServerRedisKeys.getServerChannelListKey(serverId);
		return setOperations.members(key);
	}

	@Override
	public void deleteServerChannelList(Long serverId) {
		String key = ServerRedisKeys.getServerChannelListKey(serverId);
		redisSetTemplate.delete(key);
	}

	/**
	 * 채널 메시지를 List 구조로 저장 (최대 100)
	 * ex) channelMessage:{channelId}:messageList => List<ChannelChatMessage>
	 */
	public void saveChannelMessage(Long channelId, ChannelChatMessage message) {
		String key = ServerRedisKeys.getChannelMessageListKey(channelId);
		listOperations.leftPush(key, message);
		Long size = listOperations.size(key);
		if (size != null && size > MAX_CACHE_SIZE) {
			listOperations.trim(key, 0, MAX_CACHE_SIZE - 1);
		}
	}

	public void saveChannelMessages(Long channelId, List<ChannelChatMessage> messages) {
		String key = ServerRedisKeys.getChannelMessageListKey(channelId);
		listOperations.leftPushAll(key, messages);
		Long size = listOperations.size(key);
		if (size != null && size > MAX_CACHE_SIZE) {
			listOperations.trim(key, 0, MAX_CACHE_SIZE - 1);
		}
	}

	public List<ChannelChatMessage> getChannelMessageList(Long channelId) {
		String key = ServerRedisKeys.getChannelMessageListKey(channelId);
		return listOperations.range(key, 0, -1);
	}

	public void deleteChannelMessageList(Long channelId) {
		String key = ServerRedisKeys.getChannelMessageListKey(channelId);
		redisChannelChatMessageTemplate.delete(key);
	}

	public boolean existsChannelMessageList(Long channelId) {
		String key = ServerRedisKeys.getChannelMessageListKey(channelId);
		return Boolean.TRUE.equals(redisChannelChatMessageTemplate.hasKey(key));
	}

	public long getUnreadCount(Long channelId, Long lastReadMessageId) {
		List<ChannelChatMessage> cachedMessageList = getChannelMessageList(channelId);
		return cachedMessageList.stream()
				.filter(msg -> msg.getId() != null && msg.getId() > lastReadMessageId)
				.count();
	}

}
