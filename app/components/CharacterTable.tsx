import React, { useState } from 'react';

interface Character {
  id: number;
  name: string;
  description: string;
  personality: string;
}

interface Props {
  characters: Character[];
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
}

export default function CharacterTable({ characters, setCharacters }: Props) {
  const [newCharacter, setNewCharacter] = useState<Omit<Character, 'id'>>({ name: '', description: '', personality: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  const addCharacter = () => {
    if (newCharacter.name && newCharacter.description && newCharacter.personality) {
      setCharacters(prev => [...prev, { ...newCharacter, id: Date.now() }]);
      setNewCharacter({ name: '', description: '', personality: '' });
    }
  };

  const deleteCharacter = (id: number) => {
    setCharacters(prev => prev.filter(char => char.id !== id));
  };

  const startEditing = (character: Character) => {
    setEditingId(character.id);
    setNewCharacter({ name: character.name, description: character.description, personality: character.personality });
  };

  const saveEdit = () => {
    setCharacters(prev => prev.map(char => 
      char.id === editingId ? { ...newCharacter, id: char.id } : char
    ));
    setEditingId(null);
    setNewCharacter({ name: '', description: '', personality: '' });
  };

  return (
    <div className="w-full max-w-4xl">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-black">Name</th>
            <th className="px-4 py-2 border-b text-black">Description</th>
            <th className="px-4 py-2 border-b text-black">Personality</th>
            <th className="px-4 py-2 border-b text-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          {characters.map(character => (
            <tr key={character.id}>
              <td className="px-4 py-2 border-b text-black">{editingId === character.id ? 
                <input className="text-black" value={newCharacter.name} onChange={e => setNewCharacter({...newCharacter, name: e.target.value})} /> : 
                character.name}
              </td>
              <td className="px-4 py-2 border-b text-black">{editingId === character.id ? 
                <input className="text-black" value={newCharacter.description} onChange={e => setNewCharacter({...newCharacter, description: e.target.value})} /> : 
                character.description}
              </td>
              <td className="px-4 py-2 border-b text-black">{editingId === character.id ? 
                <input className="text-black" value={newCharacter.personality} onChange={e => setNewCharacter({...newCharacter, personality: e.target.value})} /> : 
                character.personality}
              </td>
              <td className="px-4 py-2 border-b">
                {editingId === character.id ? (
                  <button onClick={saveEdit} className="bg-green-500 text-white px-2 py-1 rounded mr-2">Save</button>
                ) : (
                  <button onClick={() => startEditing(character)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                )}
                <button onClick={() => deleteCharacter(character.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
          <tr>
            <td className="px-4 py-2 border-b"><input className="text-black" value={newCharacter.name} onChange={e => setNewCharacter({...newCharacter, name: e.target.value})} placeholder="Name" /></td>
            <td className="px-4 py-2 border-b"><input className="text-black" value={newCharacter.description} onChange={e => setNewCharacter({...newCharacter, description: e.target.value})} placeholder="Description" /></td>
            <td className="px-4 py-2 border-b"><input className="text-black" value={newCharacter.personality} onChange={e => setNewCharacter({...newCharacter, personality: e.target.value})} placeholder="Personality" /></td>
            <td className="px-4 py-2 border-b">
              <button onClick={addCharacter} className="bg-green-500 text-white px-2 py-1 rounded">Add Character</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}