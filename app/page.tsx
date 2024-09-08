"use client";

import React, { useState } from 'react';
import { useChat } from "ai/react";
import CharacterTable from './components/CharacterTable';
import ChatWindow from './components/ChatWindow';
import Design from './components/design';

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
    <main className="mx-auto w-full flex flex-col">
      <div className="p4 m-4">
        <div className="flex flex-col justify-center space-y-8 text-white">

          <Design characters={characters}
            setCharacters={setCharacters}></Design>
          
        </div>
      </div>
    </main>
  );
}