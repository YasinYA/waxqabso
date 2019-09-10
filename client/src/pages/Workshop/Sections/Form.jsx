import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import client from '../../../apolloClient/apolloClient.js';

import classNames from 'classnames';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// @material-ui/icons

// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import Danger from 'components/Typography/Danger.jsx';
import { Spinner } from 'components/Common';

import { addAttendee } from '../../../apolloClient/mutations/attendeeMutations.js';

import registrationFormStyle from 'assets/jss/material-kit-react/views/registrationPageSections/registrationFormStyle.jsx';
import styles from 'assets/jss/material-kit-react/customCheckboxRadioSwitch.jsx';

const attendeeSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phone: Yup.number('Phone number can not contain letters')
        .typeError('Phone number can not contain letters')
        .required('Phone is Required'),
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
    occupation: Yup.string().required('Occupation is required'),
});

class Form extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.section}>
                <GridContainer justify="center">
                    <GridItem cs={12} sm={12} md={8}>
                        <h2
                            className={classNames(
                                classes.title,
                                classes.textCenter,
                            )}
                        >
                            Workshop Registration Form
                        </h2>
                        <h4 className={classes.description}>
                            If you are interested in coding, We are welcoming
                            you. Please register.
                        </h4>

                        <Formik
                            validationSchema={attendeeSchema}
                            initialValues={{
                                name: '',
                                phone: '',
                                email: '',
                                occupation: '',
                            }}
                            onSubmit={(values, actions) => {
                                client
                                    .mutate({
                                        mutation: addAttendee,
                                        variables: {
                                            name: values.name,
                                            phone: values.phone,
                                            email: values.email,
                                            occupation: values.occupation,
                                        },
                                    })
                                    .then(({ data }) => {
                                        console.log(data);
                                        this.props.success(data.addAttendee);
                                    });
                            }}
                            render={({
                                values,
                                errors,
                                status,
                                touched,
                                handleBlur,
                                handleChange,
                                handleSubmit,
                                isSubmitting,
                            }) => {
                                if (isSubmitting) {
                                    return (
                                        <GridContainer justify="center">
                                            <GridItem
                                                xs={12}
                                                sm={12}
                                                md={6}
                                                className={classNames(
                                                    classes.textCenter,
                                                    classes.title,
                                                )}
                                            >
                                                <Spinner
                                                    size="3x"
                                                    text="Loading"
                                                    textClass={classes.title}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                    );
                                } else {
                                    return (
                                        <form onSubmit={handleSubmit}>
                                            <GridContainer justify="center">
                                                <GridItem
                                                    xs={12}
                                                    sm={12}
                                                    md={6}
                                                >
                                                    <CustomInput
                                                        labelText="Name"
                                                        id="name"
                                                        name="name"
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={values.name}
                                                        formControlProps={{
                                                            fullWidth: true,
                                                        }}
                                                    />
                                                    {errors.name &&
                                                    touched.name ? (
                                                        <Danger>
                                                            {errors.name}
                                                        </Danger>
                                                    ) : null}
                                                </GridItem>
                                                <GridItem
                                                    xs={12}
                                                    sm={12}
                                                    md={6}
                                                >
                                                    <CustomInput
                                                        labelText="Phone"
                                                        id="phone"
                                                        name="phone"
                                                        type="tel"
                                                        onChange={handleChange}
                                                        value={values.phone}
                                                        formControlProps={{
                                                            fullWidth: true,
                                                        }}
                                                    />
                                                    {errors.phone &&
                                                    touched.phone ? (
                                                        <Danger>
                                                            {errors.phone}
                                                        </Danger>
                                                    ) : null}
                                                </GridItem>
                                                <GridItem
                                                    xs={12}
                                                    sm={12}
                                                    md={6}
                                                >
                                                    <CustomInput
                                                        labelText="Email"
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        onChange={handleChange}
                                                        value={values.email}
                                                        formControlProps={{
                                                            fullWidth: true,
                                                        }}
                                                    />
                                                    {errors.email &&
                                                    touched.email ? (
                                                        <Danger>
                                                            {errors.email}
                                                        </Danger>
                                                    ) : null}
                                                </GridItem>
                                                <GridItem
                                                    xs={12}
                                                    sm={12}
                                                    md={6}
                                                >
                                                    <CustomInput
                                                        labelText="Occupation"
                                                        id="occupation"
                                                        name="occupation"
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={
                                                            values.occupation
                                                        }
                                                        formControlProps={{
                                                            fullWidth: true,
                                                        }}
                                                    />
                                                    {errors.occupation &&
                                                    touched.occupation ? (
                                                        <Danger>
                                                            {errors.occupation}
                                                        </Danger>
                                                    ) : null}
                                                </GridItem>
                                                <GridItem
                                                    xs={12}
                                                    sm={12}
                                                    md={12}
                                                    className={
                                                        classes.textCenter
                                                    }
                                                >
                                                    <Button
                                                        color="primary"
                                                        type="submit"
                                                    >
                                                        Done
                                                    </Button>
                                                </GridItem>
                                            </GridContainer>
                                        </form>
                                    );
                                }
                            }}
                        />
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default withStyles(registrationFormStyle, styles)(Form);
