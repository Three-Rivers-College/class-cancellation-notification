import {
    Typography,
    Button,
    Alert,
    INLINE_VARIANT
} from '@ellucian/react-design-system/core';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing10, spacing40 } from '@ellucian/react-design-system/core/styles/tokens';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { withIntl } from '../utils/ReactIntlProviderWrapper';
import { useIntl } from 'react-intl';
import NotificationType from '../component/inputs/NotificationType-Dropdown';
import ClassInformation from '../component/inputs/ClassInformation';
import CancelDate from '../component/inputs/CancelDate';
import CancelTime from '../component/inputs/CancelTime';
import { useFetchPerson } from '../data/Fetch-Person';
import { PostFormData } from '../data/SubmitToEndPoint';

const styles = () => ({
    card: {
        marginRight: spacing40,
        marginLeft: spacing40,
        paddingTop: spacing10
    },
    button: {
        marginBottom: spacing40
    },
    formControl: {
        marginTop: spacing10,
        marginBottom: spacing40
    },
    text: {
        marginRight: spacing40,
        marginLeft: spacing40
    }
});


const ClassCancellationNotificationCard = (props) => {
    const {
        classes,
        cardControl: {
            setLoadingStatus,
            setErrorMessage
        },
        cardInfo: {
            configuration: {
                notificationUrl,
                responseCode,
                submitText
            }
        }
    } = props;



    const intl = useIntl();
    const [person, setPerson] = useState();
    const [personId, setPersonId] = useState();
    const [personEmail, setPersonEmail] = useState();
    const [preferredName, setPreferredName] = useState();
    const [notificationType, setNotificationType] = useState('Single Class');
    const [cancelledClass, setCancelledClass] = useState();
    const [cancelDate, setCancelDate] = useState();
    const [cancelTime, setCancelTime] = useState();
    const [submitted, setSubmitted] = useState();
    const [warningOpen, setWarningOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);


    const { fetchData } = useFetchPerson(setPerson);

    const handleSubmit = async () => {
        setLoadingStatus(true);
        const data = {
            personId: personId,
            personEmail: personEmail,
            preferredName: preferredName,
            cancelDate: cancelDate,
            cancelTime: cancelTime,
            subject: cancelledClass.subject,
            number: cancelledClass.number,
            section: cancelledClass.section,
            notificationType: notificationType
        };

        let isValid = false;
        if (notificationType == 'Single Class') {
            isValid = Object.values(data).every(value => value !== null && value !== undefined && value !== '');
        } else {
            isValid = cancelDate ? true : false;
        }

        if (isValid) {
            try {
                await PostFormData(data, notificationUrl, responseCode);
                setSubmitted('true');
            } catch (error) {
                // console.error('Error posting data:', error.message);
                setWarningOpen(true);
            }
        } else {
            setAlertOpen(true);
        }
        setLoadingStatus(false);
    };


    const resetForm = () => {
        setNotificationType('Single Class');
        setCancelledClass();
        setCancelDate();
        setCancelTime();
        setSubmitted();
        setAlertOpen(false);
        setWarningOpen(false);
    };

    useEffect(() => {
        (async () => {

            const result = await fetchData();

            if (result instanceof Error) {

                setErrorMessage({
                    headerMessage: intl.formatMessage({ id: 'GraphQLPersonQueryCard-fetchFailed' }),
                    textMessage: intl.formatMessage({ id: 'GraphQLPersonQueryCard-personsFetchFailed' }),
                    iconName: 'error',
                    iconColor: '#D42828'
                });
            }
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {

        const preferredNameObj = person ? person[0]?.names?.find(name => name.preference === 'preferred') : undefined;
        preferredNameObj && setPreferredName(preferredNameObj.fullName);

        const personIdObj = person ? person[0]?.credentials?.find(name => name.type === 'colleaguePersonId') : undefined;
        personIdObj && setPersonId(personIdObj.value);

        const personEmailObj = person ? person[0]?.emails?.find(name => name.type.emailType === 'school') : undefined;
        personEmailObj && setPersonEmail(personEmailObj.emailAddress);

        person ? setLoadingStatus(false) : setLoadingStatus(true);
    }, [person, setLoadingStatus]);


    useEffect(() => {
        if (notificationType !== 'Single Class') {
            setCancelTime('');
            setCancelledClass('');
        }
    }, [notificationType]);


    return (
        <div className={classes.card}>
            {person && !submitted &&
                <>
                    <Alert
                        alertType="warning"
                        open={warningOpen}
                        text='An error occurred. Please submit again.'
                        variant={INLINE_VARIANT}
                        onClose={() => setWarningOpen(false)}
                    />
                    <NotificationType value={notificationType} setFunction={setNotificationType} />

                    {notificationType === 'Single Class' ?
                        <>
                            <ClassInformation setFunction={setCancelledClass} />
                            <CancelTime value={cancelTime} setFunction={setCancelTime} />
                        </>
                        :
                        null
                    }

                    <CancelDate value={cancelDate} setFunction={setCancelDate} />

                    <Alert
                        alertType="error"
                        open={alertOpen}
                        text='All Fields must be filled out.'
                        variant={INLINE_VARIANT}
                        onClose={() => setAlertOpen(false)}
                    />

                    <Button className={classes.button} onClick={handleSubmit}>Submit</Button>
                </>
            }


            {person && submitted &&
                <>
                    <Typography>
                        {submitText ? submitText : 'Thanks for notifying us of your class cancellation. Remember: This is only notifies staff of this cancellation. You will need to notify your students separately'}
                    </Typography>
                    <br />
                    <Button onClick={resetForm}>Go Back</Button>
                </>
            }

            {!person &&
                (
                    <Typography className={classes.text} variant="body1">
                        {intl.formatMessage({ id: 'GraphQLPersonQueryCard-noSelectedPerson' })}
                    </Typography>
                )
            }
        </div >
    );
};

ClassCancellationNotificationCard.propTypes = {
    cardControl: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    cache: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    cardInfo: PropTypes.object.isRequired
};
export default withIntl(withStyles(styles)(ClassCancellationNotificationCard));
