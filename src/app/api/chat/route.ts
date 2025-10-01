import { OpenAI } from 'openai';
import { GENERAL_CONSULTANT_PROMPT, AUDIO_CONSULTANT_PROMPT, WEBDEV_CONSULTANT_PROMPT } from '@/utils/prompts';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages, consultantType } = await req.json();

    // 상담사 타입에 따른 시스템 프롬프트 선택
    let systemPrompt = GENERAL_CONSULTANT_PROMPT;

    switch (consultantType) {
      case 'audio':
        systemPrompt = AUDIO_CONSULTANT_PROMPT;
        break;
      case 'webdev':
        systemPrompt = WEBDEV_CONSULTANT_PROMPT;
        break;
      case 'general':
      default:
        systemPrompt = GENERAL_CONSULTANT_PROMPT;
        break;
    }

    // 시스템 메시지와 사용자 메시지 결합
    const chatMessages = [
      {
        role: 'system',
        content: systemPrompt,
      },
      ...messages,
    ];

    // OpenAI GPT-4 호출
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: chatMessages,
      temperature: 0.7,
      max_tokens: 1000,
      stream: true,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    });

    // 수동 스트리밍 응답 생성
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        console.log(`[${consultantType}] Chat started`);

        try {
          for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              const data = `data: ${JSON.stringify(chunk)}\n\n`;
              controller.enqueue(encoder.encode(data));
            }
          }
        } catch (error) {
          console.error('Streaming error:', error);
          controller.error(error);
        } finally {
          controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(
      JSON.stringify({
        error: 'AI 상담 서비스에 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}