import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; // import tools from toolkit

// ✅ Thunk to fetch search results
export const fetchResults = createAsyncThunk(
  'results/fetchResults',
  async ({ searchedTerm, subreddit }, thunkAPI) => {
    try {
      // Build the correct URL with restrict_sr when subreddit is present
      const url = subreddit 
        ? `https://www.reddit.com/r/${subreddit}/search.json?q=${encodeURIComponent(searchedTerm)}&restrict_sr=1`
        : `https://www.reddit.com/search.json?q=${encodeURIComponent(searchedTerm)}`;

      const res = await fetch(url); // Fetch from Reddit API

      if (!res.ok) {
        return thunkAPI.rejectWithValue(`Fetch failed with status ${res.status}`);
      }

      const data = await res.json();

      return data.data.children.map(child => ({
        subreddit: child.data.subreddit_name_prefixed,
        title: child.data.title,
        ups: child.data.ups,
        num_comments: child.data.num_comments
      }));
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
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
      .addCase(fetchResults.pending, (state) => { // when fetch starts
        state.isLoading = true; // show loading
        state.error = null; // clear old errors
      })
      .addCase(fetchResults.fulfilled, (state, action) => { // when fetch succeeds
        state.isLoading = false; // stop loading
        state.results = action.payload; // save results
      })
      .addCase(fetchResults.rejected, (state, action) => { // when fetch fails
        state.isLoading = false; // stop loading
        state.error = action.payload || 'Unknown error'; // save error message
      });
  }
});

export default resultsSlice.reducer; // export reducer for store
