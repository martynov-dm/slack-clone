import { Avatar, Box, Heading, Text } from '@chakra-ui/react'
import { css } from '@emotion/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserLogin } from '../../../redux/auth/auth.selectors'

interface Iprops {
  avatar: string
  username: string
  time: Date | string
  text: string
}

const MessageItem = (props: Iprops) => {
  const { avatar, username, time, text } = props
  const convertedDate = new Date(time).toLocaleString()
  const currentUserLogin = useSelector(selectUserLogin)

  return (
    <Box
      boxShadow="base"
      borderWidth="1px"
      borderRadius="lg"
      maxWidth={{ md: '22rem', lg: '35rem' }}
      my="0.7rem"
      css={css`
        padding: 0.8rem 0.3rem;
        display: flex;
        width: 100%;
        height: auto;

        /* min-height: 4.5rem; */
        align-self: ${currentUserLogin === username
          ? 'flex-end'
          : 'flex-start'};
        align-items: center;

        .text {
          margin-left: 1rem;
          display: flex;
          flex-direction: column;

          .message {
            line-height: 1.4rem;
            white-space: pre-wrap;
            font-size: 1.1rem;
            display: inline-block;
            word-break: break-word;
          }

          .name-date {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin-bottom: 0.3rem;

            .date {
              margin-left: 0.7rem;
              font-size: 0.8rem;
            }
          }
        }
      `}
    >
      <Box ml="1rem">
        <Avatar
          width="3rem"
          borderRadius="50%"
          src={avatar}
          name="user image"
        />
      </Box>
      <div className="text">
        <div className="name-date">
          <Heading isTruncated maxWidth="8rem" as="h5" size="sm">
            {username}
          </Heading>

          <Text className="date">{convertedDate}</Text>
        </div>

        <Text className="message">{text}</Text>
      </div>
    </Box>
  )
}

export default React.memo(MessageItem)
