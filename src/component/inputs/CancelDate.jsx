import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing40 } from '@ellucian/react-design-system/core/styles/tokens';
import {
    DatePicker,
} from '@ellucian/react-design-system/core';

const styles = () => ({
    root:
    {
        marginTop: spacing40,
        marginBottom: spacing40,
    }
});

const CancelDate = (props) => {
    const { value, setFunction, classes } = props;



    return (
        <div className={classes.root}>
            <DatePicker
                label="Date"
                placeholder="Select a date"
                id={'ccnDatepicker'}
                value={value}
                onDateChange={(day) => setFunction(day)}
                fullWidth

            />
        </div>
    );
};

CancelDate.propTypes = {
    setFunction: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CancelDate);