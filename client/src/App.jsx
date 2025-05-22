import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [roast, setRoast] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setRoast('');

    try {
      const res = await axios.post('http://localhost:9898/roast', { name });
      setRoast(res.data.roast);
    } catch (error) {
      setRoast('Oops! Roast failed. 😓');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className='heading'>🔥 Roast by POOJAN</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Roasting...' : 'Roast Me!'}
        </button>
      </form>
      {roast && <div className="roast-box">{roast}</div>}
    </div>
  );
}

export default App;
