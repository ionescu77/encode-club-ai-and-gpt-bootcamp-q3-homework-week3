"use client";

import React, { useState, useEffect } from 'react';
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

          {/* Table of characters CRUD code */}
          <CharacterTable
            characters={characters}
            setCharacters={setCharacters}
          />
          
          {/* Generate Story button */}
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

          {/* Chat messages */}
          <ChatWindow messages={chatMessages} />

          {/* button code:
            - if no characters in the table, display a message "No characters found. Please add a character."
            - if characters are found, display a button "Generate Story"
            - onClick, call the /chat API endpoint with the characters as the message history
          */}
        </div>
      </div>
    </main>
  );
}

async function generateStory() {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ characters }),
    });
    const data = await response.json();
    setChatMessages(prevMessages => [...prevMessages, data.message]);
  } catch (error) {
    console.error('Error generating story:', error);
  }
}