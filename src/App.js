import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [commands, setCommands] = useState([]);
  const [undoneCommands, setUndoneCommands] = useState([]);
  const [fontSize, setFontSize] = useState(16);
  const [textColor, setTextColor] = useState('black');

  function saveCommand(e) {
    const newCommands = [
      ...commands,
      {
        action: { type: 'add', key: e.key, index: e.target.selectionStart },
        inverse: { type: 'remove', index: e.target.selectionStart },
      },
    ];
    setCommands(newCommands);
    setUndoneCommands([]);
  }

  function undo() {
    let value = inputValue.split('');
    const lastCommand = commands.pop();

    if (!lastCommand) return;

    switch (lastCommand.inverse.type) {
      case 'remove':
        value.splice(lastCommand.inverse.index, 1);
        break;
      default:
        break;
    }

    setInputValue(value.join(''));
    setUndoneCommands([...undoneCommands, lastCommand]);
    setCommands([...commands]);
  }

  function redo() {
    const lastUndoneCommand = undoneCommands.pop();

    if (!lastUndoneCommand) return;

    let value = inputValue.split('');
    switch (lastUndoneCommand.action.type) {
      case 'add':
        value.splice(lastUndoneCommand.action.index, 0, lastUndoneCommand.action.key);
        setInputValue(value.join(''));
        break;


      default:
        break;
    }

    setCommands([...commands, lastUndoneCommand]);
    setUndoneCommands([...undoneCommands]);
  }

  function increaseFontSize() {
    setFontSize((prevSize) => prevSize + 2);
  }

  function decreaseFontSize() {
    setFontSize((prevSize) => Math.max(prevSize - 2, 10)); // Ensure minimum font size
  }

  function changeTextColor(color) {
    setTextColor(color);
  }

  function handleTextColorChange(e) {
    setTextColor(e.target.value);
  }

  return (
    <div className="container mx-auto my-8 p-8 bg-gray-100 rounded-lg shadow-md flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Text Editor</h1>
        <input
          className="border rounded p-2 text-lg h-12 focus:outline-none focus:border-blue-500"
          style={{ fontSize: `${fontSize}px`, color: textColor }}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => saveCommand(e)}
          value={inputValue}
        />
      </div>

      <div className="mb-4">
        <button className="btn" onClick={undo}>
          Undo
        </button>
        <button className="btn" onClick={redo}>
          Redo
        </button>
      </div>

      <div className="mb-4">
        <button className="btn" onClick={increaseFontSize}>
          Increase Font Size
        </button>
        <button className="btn" onClick={decreaseFontSize}>
          Decrease Font Size
        </button>
      </div>

      <div className="flex items-center mb-4">
        <label className="mr-2">Text Color:</label>
        <div
          className="border rounded p-2 bg-white mr-2"
          style={{ backgroundColor: textColor, width: '20px', height: '20px' }}
        ></div>
        <input
          type="color"
          value={textColor}
          onChange={handleTextColorChange}
          className="border rounded p-2"
        />
      </div>
    </div>
  );
}

export default App;
