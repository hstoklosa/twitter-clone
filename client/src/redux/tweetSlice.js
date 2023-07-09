import { createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../utils/index";

const setTweets = createAction("SET_TWEETS");
const addTweet = createAction("ADD_TWEET");
const updateTweet = createAction("UPDATE_TWEET");
const deleteTweet = createAction("DELETE_TWEET");

const tweetSlice = createSlice({
    name: "tweet",
    initialState: {
        tweets: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(setTweets, (state, action) => {
                state.tweets = action.payload.tweets;
            })
            .addCase(addTweet, (state, action) => {
                state.tweets.push(action.payload.tweet);
            })
            .addCase(updateTweet, (state, action) => {
                state.tweets.find();
            })
            .addCase(deleteTweet, (state, action) => {
                state.tweets.filter((tweet) => tweet._id !== action.payload._id);
            });
    },
});

// builder
//     .addCase(setTweets, (state, action) => {
//         state.tweets = action.payload.tweets;
//     })
//     .addCase(addTweet, (state, action) => {
//         state.tweets.push(action.payload.tweet);
//     })
//     .addCase(updateTweet, (state, action) => {
//         state.tweets.find();
//     })
//     .addCase(deleteTweet, (state, action) => {
//         state.tweets.filter((tweet) => tweet._id !== action.payload._id);
//     });

export const { reducer: tweetReducer } = tweetSlice;
