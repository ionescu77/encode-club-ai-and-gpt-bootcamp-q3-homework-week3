"use client";

import React, { useState } from 'react';
import CharacterTable from './components/CharacterTable';
import ChatWindow from './components/ChatWindow';

interface Character {
  id: number;
  name: string;
  description: string;
  personality: string;
}

export default function Chat() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const generateStory = async () => {
    setError(null);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `Generate a story with the following characters: ${characters.map(c => `${c.name} (${c.description}, ${c.personality})`).join(', ')}`
            }
          ]
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate story');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let story = '';

      while (true) {
        const { done, value } = await reader?.read() ?? { done: true, value: undefined };
        if (done) break;
        const chunk = decoder.decode(value);
        story += chunk;
        setChatMessages(prevMessages => [...prevMessages, story]);
      }
    } catch (error) {
      console.error('Error generating story:', error);
      setError('Failed to connect to the backend. Please try again later.');
    }
  };

  return (
    <main className="mx-auto w-full p-24 flex flex-col">
      <div className="p4 m-4">
        <div className="flex flex-col items-center justify-center space-y-8 text-white">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Story Telling App</h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Customize the story by selecting the genre and tone.
            </p>
          </div>

          <CharacterTable
            characters={characters}
            setCharacters={setCharacters}
          />
          
          {characters.length === 0 ? (
            <p className="text-red-500">No characters found. Please add a character.</p>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={generateStory}
            >
              Generate Story
            </button>
          )}

          {error && (
            <p className="text-red-500">{error}</p>
          )}

          <ChatWindow messages={chatMessages} />
        </div>
      </div>
    </main>
  );
}