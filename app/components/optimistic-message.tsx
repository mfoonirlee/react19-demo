import { useOptimistic, useState, useRef } from "react";

export async function deliverMessage(message: string) {
  await new Promise((res) => setTimeout(res, 1000));
  return message;
}

type Message = {
  text: string;
  sending?: boolean;
  key?: number;
};
interface FeedsProps {
  messages: Message[];
  sendMessage: (formData: HTMLFormElement) => Promise<void>;
}

function Feeds({ messages, sendMessage }: FeedsProps) {
  const formRef = useRef<HTMLFormElement | null>(null);
  async function formAction(formData: HTMLFormElement) {
    addOptimisticMessage(formData?.get("message"));
    formRef.current?.reset();
    await sendMessage(formData);
  }
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state: Message[], newMessage: string) => [
      ...state,
      {
        text: newMessage,
        sending: true,
      },
    ]
  );

  return (
    <div className="h-80 inset-0 flex items-start justify-end flex-col">
      {optimisticMessages.map((message: Message, index: number) => (
        <div key={index}>
          {message.text}
          {!!message.sending && <small> (Sending...)</small>}
        </div>
      ))}
      <form action={formAction} ref={formRef}>
        <input type="text" name="message" placeholder="Hello!" />
        <button className="ml-2" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

export default function OptimisticMessage() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hey there!", sending: false, key: 1 },
  ]);
  async function sendMessage(formData: HTMLFormElement) {
    const sentMessage = await deliverMessage(formData.get("message"));
    setMessages((messages) => [...messages, { text: sentMessage }]);
  }
  return <Feeds messages={messages} sendMessage={sendMessage} />;
}
