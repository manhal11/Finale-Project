import { ThemeOptions } from "@mui/material";

export const themeOptions: ThemeOptions = {
    palette: {
        primary: {
            main: '#003580',
            light: '#009fe3',
        },
        secondary: {
            main: '#feba02',
        },
        background: {
            default: '#f2f6fa',
            paper: '#ffffff',
        },
    },
    shape: {
        borderRadius: 10,
    },
    components: {
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
            }
        },
        MuiButton: {
            defaultProps: {
                size: 'small',
            }
        },
        MuiButtonGroup: {
            defaultProps: {
                size: 'small',
            }
        },
        MuiCheckbox: {
            defaultProps: {
                size: 'small',
            }
        },
        MuiFab: {
            defaultProps: {
                size: 'small',
            }
        },
        MuiFormControl: {
            defaultProps: {
                margin: 'dense',
                size: 'small',
            }

        },
        MuiFormHelperText: {
            defaultProps: {
                margin: 'dense',
            }
        },
        MuiIconButton: {
            defaultProps: {
                size: 'small',
            }
        },
        MuiInputBase: {
            defaultProps: {
                margin: 'dense',
            }
        },
        MuiInputLabel: {
            defaultProps: {
                margin: 'dense',
            }
        },
        MuiRadio: {
            defaultProps: {
                size: 'small',
            }
        },
        MuiSwitch: {
            defaultProps: {
                size: 'small',
            }
        },
        MuiTextField: {
            defaultProps: {
                margin: 'dense',
                size: 'small',
            }

        },
    },
};