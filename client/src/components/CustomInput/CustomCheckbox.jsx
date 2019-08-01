import React from 'react';
import { Field } from 'formik';

import classNames from 'classnames';

function Checkbox(props) {
    const { classes } = props;
    return (
        <Field name={props.name}>
            {({ field, form }) => (
                <div className={classNames(classes.checkboxAndRadio)}>
                    <label className={classes.label}>
                        <input
                            className={classNames(classes.checked)}
                            type="checkbox"
                            {...props}
                            checked={field.value.includes(props.value)}
                            onChange={() => {
                                if (field.value.includes(props.value)) {
                                    const nextValue = field.value.filter(
                                        value => value !== props.value,
                                    );
                                    form.setFieldValue(props.name, nextValue);
                                } else {
                                    const nextValue = field.value.concat(
                                        props.value,
                                    );
                                    form.setFieldValue(props.name, nextValue);
                                }
                            }}
                        />
                        {props.label}
                    </label>
                </div>
            )}
        </Field>
    );
}

export default Checkbox;
