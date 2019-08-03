/*eslint-disable*/
import React from 'react';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// nodejs library that concatenates classes
import classNames from 'classnames';
import { List, ListItem, withStyles } from '@material-ui/core';

// @material-ui/icons
import Favorite from '@material-ui/icons/Favorite';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';

import footerStyle from '../../assets/jss/material-kit-react/components/footerStyle.jsx';

import { SocailMediaIcon } from '../Common/';

function Footer({ ...props }) {
    const { classes, whiteFont } = props;
    const footerClasses = classNames({
        [classes.footer]: true,
        [classes.footerWhiteFont]: whiteFont,
    });
    const aClasses = classNames({
        [classes.a]: true,
        [classes.footerWhiteFont]: whiteFont,
    });
    return (
        <footer className={footerClasses}>
            <div className={classes.container}>
                <GridContainer
                    alignItems="center"
                    className={classes.textCenter}
                >
                    <GridItem xs={12} sm={12} md={6}>
                        <List className={classes.list}>
                            <ListItem className={classes.inlineBlock}>
                                <a
                                    href="https://www.instagram.com/waxqabso/"
                                    className={classes.block}
                                    target="_blank"
                                >
                                    <SocailMediaIcon
                                        iconName="instagram"
                                        iconSize="2x"
                                    />
                                </a>
                            </ListItem>
                            <ListItem className={classes.inlineBlock}>
                                <a
                                    href="https://twitter.com/waxqabso"
                                    className={classes.block}
                                    target="_blank"
                                >
                                    <SocailMediaIcon
                                        iconName="twitter"
                                        iconSize="2x"
                                    />
                                </a>
                            </ListItem>
                        </List>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        &copy; {1900 + new Date().getYear()} WaxQabso, made with{' '}
                        <Favorite className={classes.icon} /> by{' '}
                        <a
                            href="https://teckave.com"
                            className={aClasses}
                            target="_blank"
                        >
                            TecKave
                        </a>
                    </GridItem>
                </GridContainer>
            </div>
        </footer>
    );
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
    whiteFont: PropTypes.bool,
};

export default withStyles(footerStyle)(Footer);
