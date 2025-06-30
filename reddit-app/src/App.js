import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Reddit App</h1>
        <form className='Search-Bar'>
          <input placeholder="Enter Keyword" className='Search-Input'/>
          <input placeholder='Find a subreddit' className='Subreddit-Input'/>
          <button type="submit" className="Search-Button">Search</button>
        </form>
      </header>

      <div className='Content-Body'>
        <div className="Result-Header">
          <h2>Results</h2>
          <select className='Search-Dropdown'> 
              <option value="hot">🔥 Hot</option>
              <option value="new">📰 New</option>
              <option value="top">🏆 Top</option>
              <option value="controversial">🗣 Controversial</option>
              <option value="rising">⬆️ Rising</option>
            </select>
        </div>

        <div className='Result-Card'>
          <p className='Result-Subreddit'>Subreddit</p>
          <h3>Title</h3>
          <div className='Result-Details'>
            <p>0 Upvotes</p>
            <p>0 Comments</p>
          </div>
        </div>

        <div className='Result-Card'>
          <p className='Result-Subreddit'>Subreddit</p>
          <h3>Title</h3>
          <div className='Result-Details'>
            <p>0 Upvotes</p>
            <p>0 Comments</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
