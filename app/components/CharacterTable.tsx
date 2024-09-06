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
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Omit<Character, 'id'>>({ name: '', description: '', personality: '' });

  const addCharacter = () => {
    if (editForm.name && editForm.description && editForm.personality) {
      setCharacters(prev => [...prev, { ...editForm, id: Date.now() }]);
      setEditForm({ name: '', description: '', personality: '' });
    }
  };

  const deleteCharacter = (id: number) => {
    setCharacters(prev => prev.filter(char => char.id !== id));
  };

  const startEditing = (character: Character) => {
    setEditingId(character.id);
    setEditForm({ name: character.name, description: character.description, personality: character.personality });
  };

  const saveEdit = () => {
    setCharacters(prev => prev.map(char => 
      char.id === editingId ? { ...editForm, id: char.id } : char
    ));
    setEditingId(null);
    setEditForm({ name: '', description: '', personality: '' });
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
              <td className="px-4 py-2 border-b text-black">
                {editingId === character.id ? 
                  <input 
                    className="w-full text-black border rounded px-2 py-1" 
                    value={editForm.name} 
                    onChange={e => setEditForm({...editForm, name: e.target.value})} 
                  /> : 
                  character.name
                }
              </td>
              <td className="px-4 py-2 border-b text-black">
                {editingId === character.id ? 
                  <input 
                    className="w-full text-black border rounded px-2 py-1" 
                    value={editForm.description} 
                    onChange={e => setEditForm({...editForm, description: e.target.value})} 
                  /> : 
                  character.description
                }
              </td>
              <td className="px-4 py-2 border-b text-black">
                {editingId === character.id ? 
                  <input 
                    className="w-full text-black border rounded px-2 py-1" 
                    value={editForm.personality} 
                    onChange={e => setEditForm({...editForm, personality: e.target.value})} 
                  /> : 
                  character.personality
                }
              </td>
              <td className="px-4 py-2 border-b">
                {editingId === character.id ? (
                  <button onClick={saveEdit} className="bg-green-500 text-white px-2 py-1 rounded mr-2">Save</button>
                ) : (
                  <>
                    <button onClick={() => startEditing(character)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                    <button onClick={() => deleteCharacter(character.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingId === null && (
        <div className="mt-4 flex space-x-2">
          <input 
            className="flex-1 text-black border rounded px-2 py-1" 
            value={editForm.name} 
            onChange={e => setEditForm({...editForm, name: e.target.value})} 
            placeholder="Name" 
          />
          <input 
            className="flex-1 text-black border rounded px-2 py-1" 
            value={editForm.description} 
            onChange={e => setEditForm({...editForm, description: e.target.value})} 
            placeholder="Description" 
          />
          <input 
            className="flex-1 text-black border rounded px-2 py-1" 
            value={editForm.personality} 
            onChange={e => setEditForm({...editForm, personality: e.target.value})} 
            placeholder="Personality" 
          />
          <button onClick={addCharacter} className="bg-green-500 text-white px-4 py-2 rounded">Add Character</button>
        </div>
      )}
    </div>
  );
}