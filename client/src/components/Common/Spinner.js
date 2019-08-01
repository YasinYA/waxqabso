import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';

const Spinner = props => (
    <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
            <h3 className={props.textClass}>{props.text}</h3>
            <FontAwesomeIcon icon="spinner" spin size={props.size} />
        </GridItem>
    </GridContainer>
);

export { Spinner };
