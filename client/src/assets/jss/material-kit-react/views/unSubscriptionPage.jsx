import { container, title } from '../../material-kit-react.jsx';

const unSubscriptionPageStyle = {
    container: {
        zIndex: '12',
        ...container,
    },
    section: {
        padding: '70px 0',
    },
    title: {
        ...title,
        marginTop: '30px',
        minHeight: '32px',
        color: '#FFFFFF',
        textDecoration: 'none',
    },
    textCenter: {
        textAlign: 'center',
    },
    subtitle: {
        fontSize: '1.313rem',
        maxWidth: '500px',
        margin: '10px auto 0',
    },
    main: {
        background: '#FFFFFF',
        position: 'relative',
        zIndex: '3',
    },
    mainRaised: {
        margin: '-60px 30px 0px',
        borderRadius: '6px',
        boxShadow:
            '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
    },
};

export default unSubscriptionPageStyle;
