import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';

class Workshop extends Component {
    workshopUrl(path, arg) {
        return `/${path}/${arg}`;
    }

    render() {
        const { classes, workshop, path, buttonText } = this.props;
        return (
            <div>
                <GridContainer>
                    <GridItem key={workshop.id} xs={12} sm={12} md={6}>
                        <Card plain>
                            <GridItem
                                xs={12}
                                sm={12}
                                md={6}
                                className={classes.itemGrid}
                            >
                                <h2 className={classes.title}>
                                    {workshop.project}
                                </h2>
                            </GridItem>
                            <h4 className={classes.cardTitle}>
                                <small className={classes.smallTitle}>
                                    Happenend on Dates: {workshop.start_date} -
                                    {workshop.end_date}
                                    <br />
                                    Times: {workshop.start_time} -
                                    {workshop.end_time}
                                    <br />
                                    Finished
                                </small>
                            </h4>
                            <CardBody>
                                <p className={classes.description}>
                                    {workshop.description}
                                </p>
                                <Button
                                    color="primary"
                                    className={classes.margin5}
                                    component={Link}
                                    to={this.workshopUrl(path, workshop.id)}
                                >
                                    {buttonText}
                                </Button>
                            </CardBody>
                            <CardFooter />
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default Workshop;
