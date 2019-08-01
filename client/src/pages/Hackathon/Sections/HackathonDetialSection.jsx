import React from 'react';
import { Link } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';

// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Button from 'components/CustomButtons/Button.jsx';

import hackathonDetialStyle from 'assets/jss/material-kit-react/views/detialPageSections/hackathonDetialStyle.jsx';

class HackathonDetialSection extends React.Component {
    render() {
        const { classes, hackathon } = this.props;
        const url = `/register/${hackathon.id}`;

        return (
            <div className={classes.section}>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <h2 className={classes.title}>{hackathon.project}</h2>
                        <h3>
                            <small className={classes.smallTitle}>
                                Happenend on Dates: {hackathon.start_date} -
                                {hackathon.end_date}
                                <br />
                                Times: {hackathon.start_time} -
                                {hackathon.end_time}
                                <br />
                                Finished
                            </small>
                        </h3>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                        <p className={classes.description}>
                            {hackathon.description}
                        </p>
                    </GridItem>
                </GridContainer>
                <GridContainer alignItems="center">
                    <GridItem xs={12} sm={12} md={12}>
                        <h3>Some of the images</h3>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <img
                            src={require('../../../assets/img/hkimg1.jpeg')}
                            className={classes.img}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <img
                            src={require('../../../assets/img/hkimg2.jpg')}
                            className={classes.img}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <img
                            src={require('../../../assets/img/hkimg3.jpg')}
                            className={classes.img}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <img
                            src={require('../../../assets/img/hkimg4.jpg')}
                            className={classes.img}
                        />
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default withStyles(hackathonDetialStyle)(HackathonDetialSection);
