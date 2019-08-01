import { title } from '../../../material-kit-react.jsx';

const registrationFormStyle = {
    section: {
        padding: '70px 0',
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
    textArea: {
        marginRight: '15px',
        marginLeft: '15px',
    },

    // checkbox
    checkboxAndRadio: {
        position: 'relative',
        display: 'inline',
        marginTop: '20px',
        marginBottom: '20px',
        marginLeft: '15px',
    },

    label: {
        cursor: 'pointer',
        paddingLeft: '0',
        color: 'rgba(0, 0, 0, 0.26)',
        fontSize: '14px',
        lineHeight: '1.428571429',
        fontWeight: '400',
        display: 'inline-flex',
        transition: '0.3s ease all',
    },
    skillLabel: {
        color: 'rgba(0, 0, 0, 0.26)',
    },
};

export default registrationFormStyle;
