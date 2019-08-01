import React from 'react';
import { Link } from 'react-router-dom';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Button from 'components/CustomButtons/Button.jsx';

import callToActionStyle from 'assets/jss/material-kit-react/views/homePageSections/callToActionStyle.jsx';

class CallToActionSection extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.section}>
                <GridContainer alignItems="center" justify="center">
                    <GridItem xs={12} sm={12} md={7}>
                        <h4 className={classes.title}>
                            GET NOTIFIED FOR THE NEW UPDATES
                        </h4>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={5}>
                        <Button color="success" component={Link} to="/subs">
                            SUBSCRIBE
                        </Button>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default withStyles(callToActionStyle)(CallToActionSection);
