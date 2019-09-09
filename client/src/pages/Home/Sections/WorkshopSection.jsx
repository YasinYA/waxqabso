import React from 'react';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';

import Workshops from 'components/Workshop/Workshops.jsx';

import workshopStyle from 'assets/jss/material-kit-react/views/homePageSections/workshopStyle.jsx';

class WorkshopSection extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.section}>
                <h2 className={classes.title}>Workshops</h2>
                <div className={classes.textCenter}>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <Workshops
                                buttonText="Register"
                                path="workshop"
                                finished={false}
                                {...this.props}
                            />
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
        );
    }
}

export default withStyles(workshopStyle)(WorkshopSection);
