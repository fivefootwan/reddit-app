import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'

function App() {
  //resultsSlice
  const [results, setResults] = useState([]); //array of objects of post results
  const [isResultLoading,setIsResultLoading] = useState(false); // loading state when results are being fetch
  const [fetchResultError, setFetchResultError] = useState(null); // in case error and result fetch is unsuccessful
  const [searchedTerm, setSearchedTerm] = useState(""); // array of the keyword terms inputted by users 
  const [subreddit, setSubreddit] = useState("");
  const [subredditSuggestions, setSubredditSuggestions] = useState([]);
  const [isSubredditLoading, setIsSubredditLoading] = useState(false);
  const [subredditError, setSubredditError] = useState(null);
  const [isTyping, setIsTyping] = useState(false); //subreddit is typing
  const [sort, setSort] = useState("hot"); //default is hot sort

  //commentsSlice
  const [comments, setComments] = useState([]) // arr of obj of comments within selected post
  const [isCommentLoading, setIsCommentLoading] = useState(false); // loading state when comments are being fetch
  const [fetchCommentError, setFetchCommentError] = useState(null); // in case error and comment fetch is unsuccessful

  useEffect(() => { // 👉 run this effect whenever subreddit or isTyping changes
  if (!subreddit || !isTyping) { // 👉 if input is empty or user selected a suggestion, skip fetch
    setSubredditSuggestions([]); // 👉 clear any existing suggestions
    setSubredditError(null); // 👉 reset any previous error
    return; // 👉 exit early — no fetch needed
  }

  const debounceTimer = setTimeout(() => { // 👉 set up debounce timer (300ms delay)
    setIsSubredditLoading(true); // 👉 show loading state
    setSubredditError(null); // 👉 clear any old error

    fetch(`https://www.reddit.com/subreddits/search.json?q=${subreddit}`) // 👉 call Reddit API with current input
      .then((res) => {
        if (!res.ok) throw new Error(`API error: ${res.status}`); // 👉 if API responds with error code, throw
        return res.json(); // 👉 parse JSON if response is ok
      })
      .then((data) => {
        const suggestions = data.data.children.map( // 👉 extract subreddit names from API response
          (child) => child.data.display_name_prefixed // 👉 get subreddit name with r/ prefix
        );
        setSubredditSuggestions(suggestions); // 👉 save suggestions to state
        setIsSubredditLoading(false); // 👉 stop loading indicator
      })
      .catch(() => {
        setSubredditError("Could not fetch subreddits"); // 👉 save error message on failure
        setIsSubredditLoading(false); // 👉 stop loading indicator
      });
  }, 300); // 👉 300ms debounce delay

  return () => clearTimeout(debounceTimer); // 👉 cleanup: clear timer if input changes before timer fires
}, [subreddit, isTyping]); // 👉 run effect when subreddit or isTyping changes


  const handleSuggestionClick = (name) => { // 👉 Handler for clicking a suggestion
    setSubreddit(name); // 👉 Set subreddit input to clicked suggestion
    setSubredditSuggestions([]); // 👉 Clear suggestions (optional: could hide instead)
    setIsTyping(false);  // User clicked a suggestion — disable fetch
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    //fetch logic
    // fetch results
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Reddit App</h1>
        <form className='Search-Bar' onSubmit={handleSearchSubmit}>
          <input className='Search-Input' placeholder="Enter Keyword" value={searchedTerm} onChange={(e) => setSearchedTerm(e.target.value)}/>
          <div className='Subreddit'>
            <input 
              placeholder='Search in SubReddit' 
              className='Subreddit-Input' 
              value={subreddit} 
              onChange={(e) => {
                  setSubreddit(e.target.value);
                  setIsTyping(true);  // User is typing — enable fetch
                }} /> {/* User is typing — enable fetch*/}

            {(isSubredditLoading || subredditError || subredditSuggestions.length > 0) && (
              <div className="Subreddit-Suggestions">
                {isSubredditLoading && <p>Loading suggestions...</p>}
                {subredditError && <p className="Error">{subredditError}</p>}
                {subredditSuggestions.map((name) => (
                  <p 
                    key={name}
                    onClick={() => handleSuggestionClick(name)}
                    style={{ cursor: "pointer" }}
                  >
                    {name}
                  </p>
                ))}
              </div>
            )}
          </div>
          <button type="submit" className="Search-Button">Search</button>
        </form>

      </header>

      <div className='Content-Body'>
        <div className="Result-Header">
          <h2>Results</h2>
          <select className='Sort-Dropdown'> 
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
