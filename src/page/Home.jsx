import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing20 } from '@ellucian/react-design-system/core/styles/tokens';
import { Typography, TextLink, Grid, Divider } from '@ellucian/react-design-system/core';
import PropTypes from 'prop-types';
import React from 'react';
import {
    Link
} from 'react-router-dom';
import {
    useUserInfo,
    usePageControl
} from '@ellucian/experience-extension-utils';

const styles = () => ({
    card: {
        margin: `0 ${spacing20}`
    }
});

const HomePage = (props) => {
    const { classes } = props;
    const { setPageTitle, setPageToolbar } = usePageControl();

    setPageTitle('Special Forms');
    setPageToolbar({});


    const userInfo = useUserInfo();
    const hasStudentRole = userInfo.roles.includes('student');
    const hasEmployeeRole = userInfo.roles.includes('employee');

    return (
        <div className={classes.card}>
            {hasStudentRole &&
                    <Grid container spacing='5'>
                        <Grid item xs={12}>
                            <Typography variant={'h2'}>
                                For Students
                            </Typography>
                            <TextLink>
                                <Link to="/changeofprogram">
                                    Change of Program Form
                                </Link>
                            </TextLink>
                            <Divider />
                        </Grid>
                    </Grid>
            }
            {
                hasEmployeeRole &&
                        <Grid container spacing='5'>
                            <Grid item xs={12}>
                                <Typography variant={'h2'}>
                                    For Employees
                                </Typography>
                                <TextLink>
                                    <Link to="/piiapproval">
                                    Personally Identifiable Information Approval Form
                                    </Link>
                                </TextLink>
                                <TextLink>
                                    <Link to="/classcancellation">
                                    Class Cancellation Notification Form
                                    </Link>
                                </TextLink>
                            </Grid>
                            <Divider />
                        </Grid>
            }

        </div >
    );
};

HomePage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomePage);