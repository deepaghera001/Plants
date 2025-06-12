import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Post } from '../types';

interface CommunityState {
  posts: Post[];
  searchQuery: string;
  activeFilter: string;
  sortBy: string;
}

const initialState: CommunityState = {
  posts: [], // You can initialize with mockPosts if needed
  searchQuery: '',
  activeFilter: 'all',
  sortBy: 'recent',
};

const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setActiveFilter(state, action: PayloadAction<string>) {
      state.activeFilter = action.payload;
    },
    setSortBy(state, action: PayloadAction<string>) {
      state.sortBy = action.payload;
    },
  },
});

export const { setPosts, setSearchQuery, setActiveFilter, setSortBy } = communitySlice.actions;
export default communitySlice.reducer;
