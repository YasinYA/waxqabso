import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
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
import Checkbox from 'components/CustomInput/CustomCheckbox.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import Danger from 'components/Typography/Danger.jsx';
import { Spinner } from 'components/Common';

import { addHacker } from '../../../apolloClient/mutations/hackerMutations.js';
import { addHackathonHacker } from '../../../apolloClient/mutations/hackathonHackerMutations.js';
import { addHackerSkill } from '../../../apolloClient/mutations/hackerSkillMutation.js';
import { skills } from '../../../apolloClient/queries/skillsQueries.js';

import registrationFormStyle from 'assets/jss/material-kit-react/views/registrationPageSections/registrationFormStyle.jsx';
import styles from 'assets/jss/material-kit-react/customCheckboxRadioSwitch.jsx';

const registrationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phone: Yup.number('Phone number can not contain letters')
        .typeError('Phone number can not contain letters')
        .required('Phone is Required'),
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
    job_title: Yup.string().required('Job Title is required'),
    company: Yup.string().required('Company is required'),
});

class FormSection extends React.Component {
    render() {
        const { classes, id } = this.props;
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
                            Hackathon Registration Form
                        </h2>
                        <h4 className={classes.description}>
                            If you are developer, designer or QA professional.
                            We welcoming you Please register. If you are not
                            above mentioned professionals please contact us{' '}
                            <Link to="/contact">here</Link>
                        </h4>

                        <Formik
                            validationSchema={registrationSchema}
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
                                        mutation: addHacker,
                                        variables: {
                                            name: values.name,
                                            phone: values.phone,
                                            email: values.email,
                                            job_title: values.job_title,
                                            company: values.company,
                                        },
                                    })
                                    .then(({ data }) => {
                                        client
                                            .mutate({
                                                mutation: addHackathonHacker,
                                                variables: {
                                                    hackathonId: id,
                                                    hackerId: data.addHacker.id,
                                                },
                                            })
                                            .then(result => {
                                                values.skills.forEach(skill => {
                                                    client
                                                        .mutate({
                                                            mutation: addHackerSkill,
                                                            variables: {
                                                                hackerId:
                                                                    data
                                                                        .addHacker
                                                                        .id,
                                                                skillId: skill,
                                                            },
                                                        })
                                                        .then(hackerSkill => {
                                                            console.log(
                                                                'added',
                                                            );
                                                        });
                                                    this.props.success(true);
                                                });
                                            });
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
                                                        labelText="Job Title"
                                                        id="job_title"
                                                        name="job_title"
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={values.job_title}
                                                        formControlProps={{
                                                            fullWidth: true,
                                                        }}
                                                    />
                                                    {errors.job_title &&
                                                    touched.job_title ? (
                                                        <Danger>
                                                            {errors.job_title}
                                                        </Danger>
                                                    ) : null}
                                                </GridItem>
                                                <GridItem
                                                    xs={12}
                                                    sm={12}
                                                    md={12}
                                                >
                                                    <p
                                                        className={
                                                            classes.skillLabel
                                                        }
                                                    >
                                                        Choose your skills
                                                    </p>
                                                    <br />
                                                    <Query query={skills}>
                                                        {({
                                                            loading,
                                                            error,
                                                            data,
                                                        }) => {
                                                            if (loading) {
                                                                return (
                                                                    <div
                                                                        className={
                                                                            classes.container
                                                                        }
                                                                    >
                                                                        <GridContainer justify="center">
                                                                            <GridItem
                                                                                xs={
                                                                                    12
                                                                                }
                                                                                sm={
                                                                                    12
                                                                                }
                                                                                md={
                                                                                    6
                                                                                }
                                                                            >
                                                                                <Spinner size="3x" />
                                                                            </GridItem>
                                                                        </GridContainer>
                                                                    </div>
                                                                );
                                                            } else {
                                                                return data.skills.map(
                                                                    skill => (
                                                                        <Checkbox
                                                                            key={
                                                                                skill.id
                                                                            }
                                                                            classes={
                                                                                classes
                                                                            }
                                                                            name="skills"
                                                                            label={
                                                                                skill.name
                                                                            }
                                                                            value={
                                                                                skill.id
                                                                            }
                                                                        />
                                                                    ),
                                                                );
                                                            }
                                                        }}
                                                    </Query>
                                                </GridItem>
                                                <GridItem
                                                    xs={12}
                                                    sm={12}
                                                    md={6}
                                                >
                                                    <CustomInput
                                                        labelText="Company"
                                                        id="company"
                                                        name="company"
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={values.company}
                                                        formControlProps={{
                                                            fullWidth: true,
                                                        }}
                                                    />
                                                    {errors.company &&
                                                    touched.company ? (
                                                        <Danger>
                                                            {errors.company}
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

export default withStyles(registrationFormStyle, styles)(FormSection);
