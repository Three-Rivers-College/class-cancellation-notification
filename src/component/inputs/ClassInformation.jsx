import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@ellucian/react-design-system/core';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing20 } from '@ellucian/react-design-system/core/styles/tokens';

const styles = () => ({
    root:
    {
        marginTop: spacing20,
        marginBottom: spacing20,
    },
});


const ClassInformation = (props) => {
    const { setFunction, classes } = props;
    const [subject, setSubject] = useState('');
    const [number, setNumber] = useState('');
    const [section, setSection] = useState('');

    useEffect(() => {
        setFunction({
            subject: subject,
            number: number,
            section: section,
        });
    }, [subject, number, section]); 

    return (
        <>
            <div className={classes.root}>
                <TextField
                    label="Subject"
                    margin="normal"
                    placeholder="GOVT"
                    required
                    fullWidth
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />
                <TextField
                    label="Course Number"
                    margin="normal"
                    required
                    placeholder="101"
                    fullWidth
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                />
                <TextField
                    label="Section Number"
                    margin="normal"
                    required
                    placeholder="011V"
                    fullWidth
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                />
            </div>

        </>
    );
};

ClassInformation.propTypes = {
    setFunction: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(ClassInformation);

