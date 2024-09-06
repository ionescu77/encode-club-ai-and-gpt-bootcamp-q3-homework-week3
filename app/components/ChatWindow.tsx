import React from 'react';

interface Props {
  messages: string[];
}

export default function ChatWindow({ messages }: Props) {
  return (
    <div className="mt-4 p-4 border rounded bg-gray-100">
      {messages.map((message, index) => (
        <div key={index} className="mb-2 p-3 bg-white rounded shadow text-gray-800">
          {message}
        </div>
      ))}
    </div>
  );
}