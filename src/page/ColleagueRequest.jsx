import React from 'react';
import { withPersonContext } from '../utils/PersonContextProviderWrapper';
import PiiApprovalFormComponent from '../component/Pii-Approval-Form';
import {
    useHistory
} from 'react-router-dom';
import { usePageControl } from '@ellucian/experience-extension-utils';
import { withIntl } from '../utils/ReactIntlProviderWrapper';

function PiiApprovalForm() {
    const { setPageTitle, setPageToolbar } = usePageControl();
    const routeToHome = useHistory();

    setPageTitle('Personally Identifiable Information Approval Form');
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
        <PiiApprovalFormComponent />
    );
}
  
export default withIntl(withPersonContext(PiiApprovalForm));