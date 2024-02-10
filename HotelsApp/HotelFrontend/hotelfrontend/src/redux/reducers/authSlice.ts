import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios';
import { CONNECTION_ERROR_MESSAGE } from 'api/apiClient';
import { apiChangePassword, apiGetLoggedUser, apiLogin, apiRegister } from 'api/authApi';
import { User } from 'api/dtos/User';
import { ErrorMessageResponse, Errors, ErrorsResponse, isErrorMessageResponse, isErrorsResponse } from '../../types';
import { RootState } from '../store'

interface AuthState {
    loginWindow: 'Login' | 'Register';
    isLoading: boolean;
    loggedInMode: 'LoggedOut' | 'LoggedIn' | 'GuestIn';
    loggedUser: User | null;
    changePasswordDialog: {
        isOpen: boolean,
        isLoading: boolean,
        dialogData: {
            oldPassword: string,
            newPassword: string
        }
    },
    jwtToken: string | null;
    error: string | Errors | null;
}

const initialState: AuthState = {
    loginWindow: 'Login',
    isLoading: false,
    loggedInMode: 'GuestIn',
    loggedUser: null,
    changePasswordDialog: {
        isOpen: false,
        isLoading: false,
        dialogData: {
            oldPassword: '',
            newPassword: ''
        }
    },
    jwtToken: null,
    error: null
}

export const login = createAsyncThunk(
    'auth/login',
    async (data: { username: string, password: string }, { rejectWithValue }) => {
        try {
            const response = await apiLogin(data);
            return response.data
        } catch (_err) {
            const err = _err as AxiosError;
            if (!err.response) {
                return rejectWithValue(CONNECTION_ERROR_MESSAGE);
            }
            return rejectWithValue(err.response.data)
        }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (data: { username: string, password: string, email: string }, { rejectWithValue }) => {
        try {
            const response = await apiRegister(data);
            return response.data
        } catch (_err) {
            const err = _err as AxiosError;
            if (!err.response) {
                return rejectWithValue(CONNECTION_ERROR_MESSAGE);
            }
            return rejectWithValue(err.response.data)
        }
    }
)

export const changePassword = createAsyncThunk(
    'auth/changePassword',
    async (data: { oldPassword: string, newPassword: string }, { rejectWithValue }) => {
        try {
            const response = await apiChangePassword(data);
            return response.data
        } catch (_err) {
            const err = _err as AxiosError;
            if (!err.response) {
                return rejectWithValue(CONNECTION_ERROR_MESSAGE);
            }
            return rejectWithValue(err.response.data)
        }
    }
);

export const getLoggedUser = createAsyncThunk(
    'auth/getLoggedUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiGetLoggedUser();
            return response.data
        } catch (_err) {
            const err = _err as AxiosError;
            if (!err.response) {
                return rejectWithValue(CONNECTION_ERROR_MESSAGE);
            }
            return rejectWithValue(err.response.data)
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setDialogData: (state, { payload }) => {
            state.changePasswordDialog.dialogData = payload;
        },
        openChangePasswordDialog: (state) => {
            state.changePasswordDialog.isOpen = true;
            state.changePasswordDialog.dialogData = {
                oldPassword: '',
                newPassword: ''
            }
        },
        closeChangePasswordDialog: (state) => {
            state.changePasswordDialog.isOpen = false;
        },
        setLoginWindow: (state, { payload }) => {
            state.loginWindow = payload;
        },
        enterAsGuest: (state) => {
            state.loggedInMode = 'GuestIn';
            state.jwtToken = null;
            state.error = null;
        },
        logout: (state) => {
            state.loginWindow = 'Login';
            state.loggedInMode = 'LoggedOut';
            state.loggedUser = null;
            state.jwtToken = null;
            state.error = null;
        },
        clearErrors: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        // Login
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
            state.jwtToken = null;
            state.error = null;
        })
        builder.addCase(login.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.loggedInMode = 'LoggedIn';
            state.jwtToken = payload;
            state.error = null;
        })
        builder.addCase(login.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.loggedInMode = 'LoggedOut';
            state.jwtToken = null;
            state.error = isErrorMessageResponse(payload)
                ? payload.message
                : isErrorsResponse(payload)
                    ? payload.errors
                    : "Error";
        })

        // Register
        builder.addCase(register.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        builder.addCase(register.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.error = null;
        })
        builder.addCase(register.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = isErrorMessageResponse(payload)
                ? payload.message
                : isErrorsResponse(payload)
                    ? payload.errors
                    : "Error";
        })
        // ChangePasswordDialog
        builder.addCase(changePassword.pending, (state) => {
            state.changePasswordDialog.isLoading = true;
            state.error = null;
        })
        builder.addCase(changePassword.fulfilled, (state, { payload }) => {
            state.changePasswordDialog.isLoading = false;
            state.error = null;
        })
        builder.addCase(changePassword.rejected, (state, { payload }) => {
            state.changePasswordDialog.isLoading = false;
            state.error = isErrorMessageResponse(payload)
                ? payload.message
                : isErrorsResponse(payload)
                    ? payload.errors
                    : "Error";
        })

        // Get logged user
        builder.addCase(getLoggedUser.pending, (state) => {
            state.isLoading = true;
            state.loggedUser = null;
            state.error = null;
        })
        builder.addCase(getLoggedUser.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.loggedUser = payload;
            state.error = null;
        })
        builder.addCase(getLoggedUser.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.loggedUser = null;
            state.error = isErrorMessageResponse(payload) ? payload.message : "Error";
        })
    },
})

export const {
    setDialogData,
    openChangePasswordDialog,
    closeChangePasswordDialog,

    setLoginWindow,
    enterAsGuest,
    clearErrors,
    logout
} = authSlice.actions

export default authSlice.reducer