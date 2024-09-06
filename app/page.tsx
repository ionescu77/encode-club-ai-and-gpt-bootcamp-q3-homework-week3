"use client";

import React, { useState } from 'react';
import { useChat } from "ai/react";
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
  const { messages, append, isLoading } = useChat();



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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            onClick={() =>
              append({
                role: "user",
                content: `Generate a short story (max 500 characters) with: ${characters.map(c => `${c.name} (${c.description}, ${c.personality})`).join(', ')}`
              })
            }
          >
            Generate Story
          </button>
          )}

          {error && (
            <p className="text-red-500">{error}</p>
          )}

          <div
              hidden={
                  messages.length === 0 ||
              messages[messages.length - 1]?.content.startsWith("Generate")
          }
          className="bg-opacity-50 bg-gray-700 rounded-lg p-4"
          >
          {messages[messages.length - 1]?.content}
          </div>
        </div>
      </div>
    </main>
  );
}