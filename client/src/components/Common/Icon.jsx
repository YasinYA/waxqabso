import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = props => (
    <FontAwesomeIcon icon={props.iconName} size={props.iconSize} />
);

export { Icon };
