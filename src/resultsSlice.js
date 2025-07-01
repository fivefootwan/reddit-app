import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; // import tools from toolkit

// ✅ Thunk to fetch search results
export const fetchResults = createAsyncThunk(  
  'results/fetchResults', // set action type prefix  
  async ({ searchedTerm, subreddit }, thunkAPI) => { // thunk payload contains searchedTerm + subreddit  
    try {  
      const url = subreddit // build URL based on whether subreddit is provided  
        ? `https://www.reddit.com/r/${subreddit}/search.json?q=${encodeURIComponent(searchedTerm)}&restrict_sr=1` // search in subreddit  
        : `https://www.reddit.com/search.json?q=${encodeURIComponent(searchedTerm)}`; // search globally  

      const res = await fetch(url); // perform fetch to Reddit API  

      if (!res.ok) {  
        return thunkAPI.rejectWithValue(`Fetch failed with status ${res.status}`); // handle HTTP error  
      }  

      const data = await res.json(); // parse JSON response  

      return data.data.children.map(child => ({ // map API data to simplified objects  
        id: child.data.id, // ✅ ADD THIS so we can link to it
        subreddit: child.data.subreddit_name_prefixed, // e.g. r/javascript  
        title: child.data.title, // post title  
        ups: child.data.ups, // upvote count  
        num_comments: child.data.num_comments // comment count  
      }));  
    } catch (err) {  
      return thunkAPI.rejectWithValue(err.message); // handle network or parsing error  
    }  
  }  
);  

// ✅ Slice for results state
const resultsSlice = createSlice({
  name: 'results', // slice name
  initialState: { // initial state structure
    results: [], // array of result objects
    isLoading: false, // is fetch active
    error: null, // error message or null
  },
  reducers: {
    // (no sync reducers for now)
  },
  extraReducers: (builder) => { // handle thunk lifecycle
    builder
    .addCase(fetchResults.pending, (state) => {
        state.isLoading = true; // fetching starts
        state.error = null;     // clear old error
        state.results = [];     // ✅ clear old results at start of fetch
    })
    .addCase(fetchResults.fulfilled, (state, action) => {
        state.isLoading = false; 
        state.results = action.payload; // store new results
    })
    .addCase(fetchResults.rejected, (state, action) => {
        state.isLoading = false; 
        state.error = action.payload || 'Unknown error'; 
        state.results = []; // ✅ clear results if fetch fails (optional but cleaner)
    });
  }
});

export default resultsSlice.reducer; // export reducer for store
