import logo from './logo.svg';
import './App.css';
import {useState} from 'react'

function App() {
  //resultsSlice
  const [results, setResults] = useState([]); //array of objects of post results
  const [isResultLoading,setIsResultLoading] = useState(false); // loading state when results are being fetch
  const [fetchResultError, setFetchResultError] = useState(null); // in case error and result fetch is unsuccessful
  const [searchedTerm, setSearchedTerm] = useState(""); // array of the keyword terms inputted by users 
  const [subreddit, setSubreddit] = useState("");
  const [sort, setSort] = useState("hot"); //default is hot sort

  //commentsSlice
  const [comments, setComments] = useState([]) // arr of obj of comments within selected post
  const [isCommentLoading, setIsCommentLoading] = useState(false); // loading state when comments are being fetch
  const [fetchCommentError, setFetchCommentError] = useState(null); // in case error and comment fetch is unsuccessful


  return (
    <div className="App">
      <header className="App-header">
        <h1>Reddit App</h1>
        <form className='Search-Bar'>
          <input placeholder="Enter Keyword" className='Search-Input' value={searchedTerm} onChange={(e) => setSearchedTerm(e.target.value)}/>
          <input placeholder='(Optional) Search a SubReddit' className='Subreddit-Input' value={subreddit} /> {/* fetch subreddit as onchange e.target.value?*/}
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
          <p className='Result-Subreddit'>r/Subreddit</p>
          <h3>Title</h3>
          <div className='Result-Details'>
            <p>0 Upvotes</p>
            <p>||</p>
            <p>0 Comments</p>
          </div>
        </div>

        <div className='Result-Card'>
          <p className='Result-Subreddit'>r/Subreddit</p>
          <h3>Title</h3>
          <div className='Result-Details'>
            <p>0 Upvotes</p>
            <p>||</p>
            <p>0 Comments</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
