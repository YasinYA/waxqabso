import { dangerColor, title } from 'assets/jss/material-kit-react.jsx';

const errorStyle = {
    section: {
        padding: '70px 0',
    },
    error: {
        color: dangerColor,
    },
    title: {
        ...title,
        marginBottom: '50px',
        marginTop: '30px',
        minHeight: '32px',
        textDecoration: 'none',
    },
    description: {
        color: '#999',
        textAlign: 'center',
    },
    textCenter: {
        textAlign: 'center',
    },
};

export default errorStyle;
