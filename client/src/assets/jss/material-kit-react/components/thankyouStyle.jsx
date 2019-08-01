import { successColor, title } from 'assets/jss/material-kit-react.jsx';

const thankyouStyle = {
    section: {
        padding: '70px 0',
    },
    success: {
        color: successColor,
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

export default thankyouStyle;
