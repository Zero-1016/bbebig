package com.bbebig.chatserver.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ConnectionEventDto {

	private Long memberId;
	private String type;
	private String currentPresenceStatus;
	private String customPresenceStatus;
	private String socketSessionId;
	private String connectedServerIp;
	private List<Long> serverIds;
	private List <Long> channelIds;
	private List <Long> dmChannelIds;
}
