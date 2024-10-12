import { useState } from 'react';
import './App.css';
import SHA256 from 'crypto-js/sha256'; // Importing the crypto-js SHA256 function

function App() {
  const [nonce, setNonce] = useState(0);
  const [data, setData] = useState('');
  const [hash, setHash] = useState('');

  const handleSubmit = () => {
    let nonce_cal = 0;
    let res = '';
    
    while (true) {
      const input = data.toString() + nonce_cal;
      res = SHA256(input).toString(); // Using SHA256 from crypto-js to generate hash
      if (res.startsWith('0000')) {
        setHash(res);
        setNonce(nonce_cal);
        break; // Exit the loop once the condition is met
      }
      nonce_cal++;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(hash);
    alert("Hash copied to clipboard!");
  };

  return (
    <div>
      <h1>Blockchain Mining Simulator</h1>
      <div className="container">
        <div>
          <label>Nonce</label>
          <input value={nonce} readOnly />
        </div>

        <div>
          <label>Data</label>
          <input value={data} onChange={(e) => setData(e.target.value)} />
        </div>

        <button onClick={handleSubmit}>Mine</button>

        {hash && <div className='hash'>
          <label>Hash</label>
          <div className='hash-address'>
          <div className="hash-display">{hash}</div>
          <button className="copy-button" onClick={handleCopy}>Copy</button>
          </div>
        </div>}

      </div>
    </div>
  );
}

export default App;
