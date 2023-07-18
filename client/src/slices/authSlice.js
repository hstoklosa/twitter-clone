import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { sendRequest, formatDate } from "../utils/index";

export const checkAuth = createAsyncThunk("auth/checkAuth", async (_, thunkAPI) => {
    const response = await sendRequest(`${process.env.REACT_APP_API_URL}/auth/check`);

    if (response.error) {
        console.log("checkAuth Error: ", response.error);
        return thunkAPI.rejectWithValue(response.error.message);
    }

    const formattedDate = formatDate(response.user.dob);

    return {
        user: {
            ...response.user,
            dob: formattedDate,
        },
    };
});

export const signIn = createAsyncThunk("auth/signIn", async ({ identifier, password }, thunkAPI) => {
    const response = await sendRequest(`${process.env.REACT_APP_API_URL}/auth/signin/`, {
        method: "POST",
        body: {
            identifier,
            password,
        },
    });

    if (response.error) {
        console.log("SignIn Error: ", response.error);
        return thunkAPI.rejectWithValue(response.error.message);
    }

    return {
        user: response.user,
    };
});

export const signUp = createAsyncThunk("auth/signUp", async (user, thunkAPI) => {
    const { displayName, username, email, password, day, month, year } = user;

    const dobDate = new Date(`${year}-${month}-${day}`);
    const dob = dobDate.toISOString().split("T")[0];

    const response = await sendRequest(`${process.env.REACT_APP_API_URL}/auth/signup/`, {
        method: "POST",
        body: {
            displayName,
            username,
            email,
            password,
            dob,
        },
    });

    if (response.error) {
        console.log("SignUp Error: ", response.error);
        return thunkAPI.rejectWithValue(response.error.message);
    }

    return {
        user: response.user,
    };
});

export const signOut = createAsyncThunk("auth/signOut", async (thunkAPI) => {
    const response = await sendRequest(`${process.env.REACT_APP_API_URL}/auth/logout`);

    if (response.error) {
        console.log("SignOut Error: ", response.error);
        return thunkAPI.rejectWithValue(response.error.message);
    }
});

export const confirmEmail = createAsyncThunk("auth/confirmEmail", async (email, thunkAPI) => {
    const response = await sendRequest(`${process.env.REACT_APP_API_URL}/auth/confirm-email/${email}`);

    if (response.error) {
        console.log("confirmEmail Error: ", response.error);
        return thunkAPI.rejectWithValue(response.error.message);
    }

    return {
        code: response.code,
    };
});

export const checkIdentifier = createAsyncThunk("auth/checkIdentifier", async (identifier, thunkAPI) => {
    const response = await sendRequest(`${process.env.REACT_APP_API_URL}/auth/check-identifier/${identifier}`);

    if (response.error) {
        return thunkAPI.rejectWithValue(response.error.message);
    }

    return {
        exists: response.exists,
    };
});

const authSlice = createSlice({
    name: "auth",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.user = action.payload.user;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.user = null;
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
