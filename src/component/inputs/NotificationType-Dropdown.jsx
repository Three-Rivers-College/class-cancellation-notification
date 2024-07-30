import React from 'react';
import PropTypes from 'prop-types';
import {
    Dropdown,
    DropdownItem
} from '@ellucian/react-design-system/core';

const NotificationType = (props) => {   
    const { value, setFunction } = props;

    const handleChange = (selectedValue) => {
        // Call the setAaProgram function to update aaProgram in the parent component
        setFunction(selectedValue.target.value);
        // console.log(selectedValue.target.value);
    };

    const options = ['Single Class', 'All Classes'];

    return (
        <>
            <Dropdown
                label="Notification Type"
                onChange={handleChange}
                value={value}
            >
                {options.map(option => (
                    <DropdownItem
                        key={option}
                        label={option}
                        value={option}
                    />
                ))}
            </Dropdown>
        </>
    );
};


NotificationType.propTypes = {
    setFunction: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};

export default NotificationType;
