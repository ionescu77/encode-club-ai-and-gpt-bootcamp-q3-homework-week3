import React from 'react';

interface Props {
  messages: string[];
}

export default function ChatWindow({ messages }: Props) {
  return (
    <div className="mt-4 p-4 border rounded">
      {messages.map((message, index) => (
        <div key={index} className="mb-2">
          {message}
        </div>
      ))}
    </div>
  );
}