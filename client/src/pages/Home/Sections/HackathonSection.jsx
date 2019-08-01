import React from 'react';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';

import hackathonStyle from 'assets/jss/material-kit-react/views/homePageSections/hackathonStyle.jsx';

class HackathonSection extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.section}>
                <h2 className={classes.title}>UPCOMING HACKATHONS</h2>
                <div className={classes.textCenter}>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <h4 className={classes.textDark}>
                                Still planning the next hackathon will update
                                you shortly..
                            </h4>
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
        );
    }
}

export default withStyles(hackathonStyle)(HackathonSection);
