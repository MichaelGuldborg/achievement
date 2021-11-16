import React from "react";
import createMuiTheme, {Theme} from "@material-ui/core/styles/createMuiTheme";
import createSpacing from "@material-ui/core/styles/createSpacing";

const spacing = createSpacing(8);

export interface CustomTheme extends Theme {
    custom: {
        drawerWidth: number;
        appBarHeight: number;
        boxShadow: React.CSSProperties["boxShadow"];
    }
}


const colors = {
    primary: '#F57058',

    white: '#ffffff',
    black: '#000000',
    grey: '#EFF2F5',
    textGrey: '#8D949F', // '#888888'
    borderGrey: '#DCE2EB',

    purple: '#552CF6',
    blue: '#00A5FF',
    green: '#00B276',
    yellow: '#FFCC00',
    orange: '#F97C1C',
    red: '#FF0000',
}

export const prettyColors = [
    colors.purple,
    colors.blue,
    colors.green,
    colors.yellow,
    colors.orange,
    colors.red,
]


export const createTheme = () => createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            main: "#0A72EF",
            contrastText: '#ffffff',
        },
        secondary: {
            main: "#3758FA",
            contrastText: '#ffffff'
        },
        error: {
            light: "#EA8080",
            main: "#E35555",
            dark: "#DC2B2B",
        },
        warning: {
            light: "#FFDFA0",
            main: "#FFCF71",
            dark: "#FFBF42",
        },
        info: {
            light: "#EFEFF1",
            main: "#D4D4D9",
            dark: "#B9B9C1",
        },
        success: {
            light: "#CCF4EC",
            main: "#66DFC7",
            dark: "#00C9A1",
        },
        text: {
            primary: "#282828",
        }
    },
    typography: {
        fontSize: 13,
    },
    overrides: {
        MuiPaper: {
            root: {
                overflow: 'hidden',
                boxShadow: '0 1px 4px rgba(0,0,0,.09)'
            },
            elevation0: {
                boxShadow: '0 1px 4px rgba(0,0,0,.09)'
            },
            elevation1: {
                boxShadow: '0 1px 4px rgba(0,0,0,.09)'
            },
            elevation2: {
                boxShadow: '0 1px 4px rgba(0,0,0,.09)'
            },
            elevation3: {
                boxShadow: '0 1px 4px rgba(0,0,0,.09)'
            },
            elevation4: {
                boxShadow: '0 1px 4px rgba(0,0,0,.09)'
            },
            elevation8: {
                boxShadow: '0 4px 8px rgba(0,0,0,.2)'
            }

        },
        MuiFilledInput: {
            root: {
                backgroundColor: "#eaecf0",
                borderRadius: 0,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
            },
        },
        MuiTooltip: {
            tooltip: {
                fontSize: 14,
                padding: spacing(1, 2),
                transition: 'opacity 0.5s cubic-bezier(0.12, 1.04, 0.77, 1.01)',
            },
        },
        MuiListItem: {
            root: {
                background: 'white',
                padding: spacing(1)
            }
        },
        MuiTableCell: {
            head: {
                fontWeight: 'bold',
            },
        },
    },
});

export const theme = {
    ...createTheme(),
    colors: colors,
    custom: {
        drawerWidth: 232,
        appBarHeight: 64,
        boxShadow: '0 1px 4px rgba(0,0,0,.09)',
    }
};


export default theme;