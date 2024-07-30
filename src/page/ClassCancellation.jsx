import React from 'react';
import { withPersonContext } from '../utils/PersonContextProviderWrapper';
import ClassCancellationNotificationFormComponent from '../component/form/ClassCancellationNotification';
import {
    useHistory
} from 'react-router-dom';
import { usePageControl } from '@ellucian/experience-extension-utils';
import { withIntl } from '../utils/ReactIntlProviderWrapper';

function ClassCancellationNotificationForm() {
    const { setPageTitle, setPageToolbar } = usePageControl();
    const routeToHome = useHistory();

    setPageTitle('Class Cancellation Notification Form');
    setPageToolbar({
        primaryCommands: [
            {
                icon: 'arrow-left',
                label: 'Back',
                callback: () => routeToHome.push('/')
            }
        ]
    });

    return (
        <ClassCancellationNotificationFormComponent />
    );
}
  
export default withIntl(withPersonContext(ClassCancellationNotificationForm));