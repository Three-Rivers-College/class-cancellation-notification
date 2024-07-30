import React from 'react';
import PropTypes from 'prop-types';
import { TimePicker } from '@ellucian/react-design-system/core';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing20 } from '@ellucian/react-design-system/core/styles/tokens';

const styles = () => ({
    root:
    {
        paddingTop: spacing20,
        marginBottom: spacing20,
    }
});

const CancelTime = (props) => {

    const { value, setFunction, classes } = props;

    return (
        <div className={classes.root}>
            <TimePicker
                onChange={(time) => setFunction(time)}k
                value={value}
                label="Time" 
            />
        </div>
    );
};

CancelTime.propTypes = {
    setFunction: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CancelTime);