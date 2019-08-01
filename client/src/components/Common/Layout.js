import React, { Component } from 'react';

import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import HeaderLinks from '../Header/HeaderLinks.jsx';

class Layout extends Component {
    render() {
        return (
            <div>
                <Header
                    color="transparent"
                    brand={require('../../assets/img/logo.png')}
                    rightLinks={<HeaderLinks />}
                    fixed
                    changeColorOnScroll={{
                        height: 400,
                        color: 'white',
                    }}
                />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}

export { Layout };
