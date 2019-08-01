import React from 'react';
import { Query } from 'react-apollo';
import { Formik } from 'formik';
import * as Yup from 'yup';

import client from '../../../apolloClient/apolloClient.js';

import classNames from 'classnames';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import Danger from 'components/Typography/Danger.jsx';
import { Spinner } from 'components/Common';

import { emailListByName } from '../../../apolloClient/queries/emailListQueries.js';
import { addMember } from '../../../apolloClient/mutations/memberMutations.js';

import formStyle from 'assets/jss/material-kit-react/views/formStyle.jsx';

const subscriptionSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
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
                            Subscription Form
                        </h2>
                        <h4 className={classes.description}>
                            We won't just send you meaningless emails. We will
                            notify you for some great content about technology
                            and update of our hackathons.
                        </h4>

                        <Query
                            query={emailListByName}
                            variables={{ name: 'Member List' }}
                        >
                            {({ loading, error, data }) => {
                                if (loading) {
                                    return (
                                        <div className={classes.container}>
                                            <GridContainer
                                                justify="center"
                                                alignItems="center"
                                            >
                                                <GridItem
                                                    xs={12}
                                                    sm={12}
                                                    md={12}
                                                    className={
                                                        classes.textCenter
                                                    }
                                                >
                                                    <Spinner size="3x" />
                                                </GridItem>
                                            </GridContainer>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <Formik
                                            validationSchema={
                                                subscriptionSchema
                                            }
                                            initialValues={{
                                                name: '',
                                                email: '',
                                                emailListId:
                                                    data.emailListByName.id,
                                            }}
                                            onSubmit={(values, actions) => {
                                                client
                                                    .mutate({
                                                        mutation: addMember,
                                                        variables: {
                                                            name: values.name,
                                                            email: values.email,
                                                            emailListId:
                                                                values.emailListId,
                                                        },
                                                    })
                                                    .then(member => {
                                                        console.log(
                                                            'Subscribed Successfully.',
                                                        );
                                                        this.props.success(
                                                            true,
                                                        );
                                                    })
                                                    .catch(err =>
                                                        console.log(err),
                                                    );
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
                                                                    text="Subscribing..."
                                                                    textClass={
                                                                        classes.title
                                                                    }
                                                                />
                                                            </GridItem>
                                                        </GridContainer>
                                                    );
                                                } else {
                                                    return (
                                                        <form
                                                            onSubmit={
                                                                handleSubmit
                                                            }
                                                        >
                                                            <GridContainer justify="center">
                                                                <GridItem
                                                                    xs={12}
                                                                    sm={12}
                                                                    md={8}
                                                                >
                                                                    <CustomInput
                                                                        labelText="Name"
                                                                        id="name"
                                                                        name="name"
                                                                        type="text"
                                                                        onChange={
                                                                            handleChange
                                                                        }
                                                                        value={
                                                                            values.name
                                                                        }
                                                                        formControlProps={{
                                                                            fullWidth: true,
                                                                        }}
                                                                    />
                                                                    {errors.name &&
                                                                    touched.name ? (
                                                                        <Danger>
                                                                            {
                                                                                errors.name
                                                                            }
                                                                        </Danger>
                                                                    ) : null}
                                                                </GridItem>
                                                                <GridItem
                                                                    xs={12}
                                                                    sm={12}
                                                                    md={8}
                                                                >
                                                                    <CustomInput
                                                                        labelText="Email"
                                                                        id="email"
                                                                        name="email"
                                                                        type="email"
                                                                        onChange={
                                                                            handleChange
                                                                        }
                                                                        value={
                                                                            values.email
                                                                        }
                                                                        formControlProps={{
                                                                            fullWidth: true,
                                                                        }}
                                                                    />
                                                                    {errors.email &&
                                                                    touched.email ? (
                                                                        <Danger>
                                                                            {
                                                                                errors.email
                                                                            }
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
                                                                        Count Me
                                                                        In
                                                                    </Button>
                                                                </GridItem>
                                                            </GridContainer>
                                                        </form>
                                                    );
                                                }
                                            }}
                                        />
                                    );
                                }
                            }}
                        </Query>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default withStyles(formStyle)(Form);
