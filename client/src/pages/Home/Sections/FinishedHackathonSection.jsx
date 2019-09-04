import React from 'react';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

import Hackathons from 'components/Hackathon/Hackathons.jsx';

import hackathonStyle from 'assets/jss/material-kit-react/views/homePageSections/hackathonStyle.jsx';

class FinishedHackathonSection extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.section}>
                <h2 className={classes.title}>FINISHED HACKATHONS</h2>
                <div>
                    <Hackathons
                        buttonText="More Info"
                        path="hackathon"
                        finished={true}
                        {...this.props}
                    />
                </div>
            </div>
        );
    }
}

export default withStyles(hackathonStyle)(FinishedHackathonSection);
