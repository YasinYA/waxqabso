import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import classNames from 'classnames';

import client from '../../../apolloClient/apolloClient.js';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// @material-ui/icons

// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import { Spinner } from 'components/Common';

import { addMessage } from '../../../apolloClient/mutations/messageMutations.js';

import formStyle from 'assets/jss/material-kit-react/views/contactPageSections/formStyle.jsx';

const contactFormSchema = Yup.object().shape({
    name: Yup.string().required('Please tell us your Name'),
    email: Yup.string()
        .email('The Email you entered is invalid')
        .required('Please tell us your Email'),
    message: Yup.string().required('Please tell us what you want help with'),
});

class FormSection extends React.Component {
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
                            Contact us
                        </h2>
                        <h4 className={classes.description}>
                            We are glad to hear from you, We will get back to
                            you as soon as possible.
                        </h4>
                        <Formik
                            validationSchema={contactFormSchema}
                            initialValues={{
                                name: '',
                                phone: '',
                                email: '',
                                job_title: '',
                                company: '',
                                skills: [],
                            }}
                            onSubmit={(values, actions) => {
                                client
                                    .mutate({
                                        mutation: addMessage,
                                        variables: {
                                            name: values.name,
                                            email: values.email,
                                            message: values.message,
                                        },
                                    })
                                    .then(({ data }) => {
                                        console.log('Sent');
                                        this.props.success(true);
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
                                                        labelText="Your Name"
                                                        id="name"
                                                        name="name"
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={values.name}
                                                        formControlProps={{
                                                            fullWidth: true,
                                                        }}
                                                    />
                                                </GridItem>
                                                <GridItem
                                                    xs={12}
                                                    sm={12}
                                                    md={6}
                                                >
                                                    <CustomInput
                                                        labelText="Your Email"
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        onChange={handleChange}
                                                        value={values.email}
                                                        formControlProps={{
                                                            fullWidth: true,
                                                        }}
                                                    />
                                                </GridItem>
                                                <CustomInput
                                                    labelText="Your Message"
                                                    id="message"
                                                    name="message"
                                                    type="text"
                                                    onChange={handleChange}
                                                    value={values.message}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                        className:
                                                            classes.textArea,
                                                    }}
                                                    inputProps={{
                                                        multiline: true,
                                                        rows: 5,
                                                    }}
                                                />
                                                <Button
                                                    color="primary"
                                                    type="submit"
                                                >
                                                    Send Message
                                                </Button>
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

export default withStyles(formStyle)(FormSection);
