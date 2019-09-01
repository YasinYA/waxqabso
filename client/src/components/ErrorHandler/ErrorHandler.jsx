import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';

import { Icon } from 'components/Common';

import errorStyle from 'assets/jss/material-kit-react/components/errorStyle.jsx';

const ErrorHandler = props => {
    const { classes, title, description } = props;
    return (
        <div className={classes.section}>
            <GridContainer justify="center">
                <GridItem
                    xs={12}
                    sm={12}
                    md={12}
                    className={classes.textCenter}
                >
                    <div className={classes.error}>
                        <Icon iconName="times" iconSize="4x" />
                    </div>
                    <h1 className={classes.title}>{title}</h1>
                    <h4 className={classes.description}>{description}</h4>
                </GridItem>
            </GridContainer>
        </div>
    );
};

export default withStyles(errorStyle)(ErrorHandler);
