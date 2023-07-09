import { createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { sendRequest } from "../utils/index";

export const checkAuth = createAsyncThunk("auth/checkAuth", async (thunkAPI) => {
    const response = await sendRequest("http://localhost:8080/auth/check-auth/");

    if (response.error) {
        console.log("checkAuth Error: ", response.error);
        return thunkAPI.rejectWithValue(response.error);
    }

    return {
        user: response.user,
    };
});

export const signIn = createAsyncThunk("auth/signIn", async ({ identifier, password }, thunkAPI) => {
    const response = await sendRequest("http://localhost:8080/auth/signin/", "POST", {
        identifier,
        password,
    });

    if (response.error) {
        console.log("SignIn Error: ", response.error);
        return thunkAPI.rejectWithValue(response.error);
    }

    return {
        user: response.user,
    };
});

export const signUp = createAsyncThunk("auth/signUp", async (user, thunkAPI) => {
    const { displayName, username, email, password, day, month, year } = user;

    const dobDate = new Date(`${year}-${month}-${day}`);
    const dob = dobDate.toISOString().split("T")[0];

    const response = await sendRequest("http://localhost:8080/auth/signup/", "POST", {
        displayName,
        username,
        email,
        password,
        dob,
    });

    if (response.error) {
        console.log("SignUp Error: ", response.error);
        return thunkAPI.rejectWithValue(response.error);
    }

    return {
        user: response.user,
    };
});

export const signOut = createAsyncThunk("auth/signOut", async (thunkAPI) => {
    const response = await sendRequest("http://localhost:8080/auth/logout", "GET");

    if (response.error) {
        console.log("SignOut Error: ", response.error);
        return thunkAPI.rejectWithValue(response.error);
    }
});

export const confirmEmail = createAsyncThunk("auth/confirmEmail", async (email, thunkAPI) => {
    const response = await sendRequest(`http://localhost:8080/auth/confirm-email/${email}`, "GET");

    if (response.error) {
        console.log("confirmEmail Error: ", response.error);
        return thunkAPI.rejectWithValue(response.error);
    }

    return {
        code: response.code,
    };
});

export const checkIdentifier = async (identifier) => {
    const response = await sendRequest(`http://localhost:8080/auth/check-identifier/${identifier}`, "GET");

    if (response) {
        return response.exists;
    }
};

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.user = action.payload.user;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.user = action.payload.user;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.user = action.payload.user;
            })
            .addCase(signOut.fulfilled, (state, action) => {
                state.user = null;
            })
            .addCase(confirmEmail.fulfilled, (state, action) => {
                state.code = action.payload.code;
            });
    },
});

export const { reducer: authReducer } = authSlice;

// // tweets
