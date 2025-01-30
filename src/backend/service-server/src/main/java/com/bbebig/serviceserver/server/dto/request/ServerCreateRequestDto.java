package com.bbebig.serviceserver.server.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ServerCreateRequestDto {

    @Schema(description = "서버의 이름", example = "BBeBig의 서버", required = true)
    private final String name;

    @Schema(description = "서버장의 ID", example = "123", required = true)
    private final Long ownerId;

    @Schema(description = "서버의 이미지 URL", example = "https://...", required = true)
    private final String serverImageUrl;
}
