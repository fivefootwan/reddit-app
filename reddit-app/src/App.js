import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Reddit App</h1>
        <form className='Search-Bar'>
          <input placeholder="Input a term" className='Search-Input'/>
          <select className='Search-Dropdown'> 
            <option value="default">Default</option>
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
          </select>
          <button type="submit" className="Search-Button">Search</button>
        </form>
      </header>

      <div className='Content-Body'>
        <h2>Results</h2>
        <div className='Result-Card'>
          <p>this is</p>

        </div>

      </div>


    </div>
  );
}

export default App;
