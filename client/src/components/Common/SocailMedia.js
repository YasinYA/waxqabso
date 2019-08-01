import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SocailMediaIcon = props => (
    <FontAwesomeIcon icon={['fab', props.iconName]} size={props.iconSize} />
);

export { SocailMediaIcon };
