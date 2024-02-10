import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from "react-router-dom";
import { store } from './redux/store';
import { themeOptions } from './theme';
import ErrorNotFoundPage from './views/ErrorNotFoundPage';
import HotelsPage from './views/HotelsPage/HotelsPage';
import LoginPage from './views/LoginPage/LoginPage';
import MainPage from './views/MainPage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
    },
    {
        path: "/login/",
        element: <LoginPage />,
    },
    {
        path: "/home/",
        element: <HotelsPage />,
    },
    {
        path: "*",
        element: <ErrorNotFoundPage />
    }
]);

const theme = createTheme(themeOptions);

function App() {
    return (
        <ReduxProvider store={store}>
            <ThemeProvider theme={theme}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </ReduxProvider>
    );
}

export default App;
