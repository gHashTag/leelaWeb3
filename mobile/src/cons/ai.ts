import { OPEN_AI_KEY } from '@env'
import axios from 'axios'
import { HandleCommentAiParamsT, MessageAIT } from 'types'

import { captureException } from './constants'

export const generateComment = async ({
  message,
  systemMessage,
  planText,
}: MessageAIT): Promise<string> => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4-0314',
        messages: [
          {
            role: 'system',
            content: systemMessage,
          },
          {
            role: 'user',
            content: message,
          },
          {
            role: 'assistant',
            content: planText,
          },
        ],
        max_tokens: 1000,
        temperature: 0.5,
      },
      {
        headers: {
          Authorization: `Bearer ${OPEN_AI_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    )

    return response?.data?.choices[0]?.message?.content ?? ''
  } catch (error) {
    captureException(error, 'generateComment')
    throw error
  }
}

export const handleCommentAi = async ({
  curItem,
  systemMessage,
  message,
  planText = ' ',
}: HandleCommentAiParamsT): Promise<void> => {
  const aiComment: string = await generateComment({
    message,
    systemMessage,
    planText,
  })

  if (curItem && aiComment) {
    // await PostStore.createComment({
    //   text: aiComment,
    //   postId: curItem.id,
    //   postOwner: curItem.ownerId,
    //   ownerId: LEELA_ID,
    // })
  }
}
