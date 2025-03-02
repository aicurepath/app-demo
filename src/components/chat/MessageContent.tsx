import { Message } from '../../types/chat';

interface MessageContentProps {
  message: Message;
}

export default function MessageContent({ message }: MessageContentProps) {
  const content = message.content.startsWith('[')
    ? message.content.replace(/^\[[^\]]+\]/, '').trim()
    : message.content;

  return <p className="whitespace-pre-wrap">{content}</p>;
}