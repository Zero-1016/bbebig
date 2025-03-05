package com.smilegate.bbebig.presentation.ui.signup.nickname

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.text.input.rememberTextFieldState
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.smilegate.bbebig.presentation.component.DiscordInputContainer
import com.smilegate.bbebig.presentation.component.DiscordRoundButton
import com.smilegate.bbebig.presentation.component.DiscordTopBar
import com.smilegate.bbebig.presentation.theme.Blue70
import com.smilegate.bbebig.presentation.theme.Gray20
import com.smilegate.bbebig.presentation.theme.Gray90
import com.smilegate.bbebig.presentation.theme.White
import com.smilegate.devcamp.presentation.R

@Composable
fun NicknameScreen(
    onBackClick: () -> Unit,
    onClickConfirm: (String) -> Unit,
) {
    val nicknameState = rememberTextFieldState()

    Column(
        modifier = Modifier.background(Gray20).fillMaxSize().padding(horizontal = 10.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        DiscordTopBar(
            modifier = Modifier.statusBarsPadding().fillMaxWidth(),
            onBackClick = onBackClick,
            backButtonColor = White,
        )
        Text(
            modifier = Modifier.padding(top = 20.dp),
            text = stringResource(R.string.nickname_title),
            fontSize = 24.sp,
            textAlign = TextAlign.Center,
            color = Gray90,
        )
        DiscordInputContainer(
            modifier = Modifier.padding(top = 20.dp),
            textState = nicknameState,
            titleResId = R.string.alias_title,
            textHintResId = R.string.signup_user_info,
        )
        DiscordRoundButton(
            modifier = Modifier
                .fillMaxWidth()
                .padding(top = 15.dp),
            textResId = R.string.next,
            backgroundColor = Blue70,
            onClick = { onClickConfirm(nicknameState.text.toString()) },
            textColor = White,
            radiusDp = 5.dp,
            isEnable = nicknameState.text.isNotEmpty(),
        )
    }
}

@Composable
@Preview
fun PreviewNicknameScreen() {
    NicknameScreen(onBackClick = {}, onClickConfirm = {})
}
