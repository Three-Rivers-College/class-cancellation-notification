import React from 'react';
import { withPersonContext } from '../utils/PersonContextProviderWrapper';
import { withAaPathwayContext } from '../utils/AA-PathwayContextProviderWrapper';
import { withAsProgramContext } from '../utils/AS-ProgramContextProviderWrapper';
import { withAatProgramContext } from '../utils/AAT-ProgramContextProviderWrapper';
import { withAasProgramContext } from '../utils/AAS-ProgramContextProviderWrapper';
import { withCertContext } from '../utils/Cert-ContextProviderWrapper';
import ChangeOfPathwayFormComponent from '../component/ChangeOfProgram-Form';
import {
    useHistory
} from 'react-router-dom';
import { usePageControl } from '@ellucian/experience-extension-utils';
import { withIntl } from '../utils/ReactIntlProviderWrapper';



function ChangeOfPathwayForm() {
    const { setPageTitle, setPageToolbar } = usePageControl();
    const routeToHome = useHistory();

    setPageTitle('Change of Program Form');
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
        <ChangeOfPathwayFormComponent />
    );
}




const ChangeOfProgram = (component, ...hocs) => {
    return hocs.reduce((accComponent, hoc) => hoc(accComponent), component);
};
  
export default ChangeOfProgram(
    ChangeOfPathwayForm,
    withCertContext,
    withAasProgramContext,
    withAatProgramContext,
    withAsProgramContext,
    withAaPathwayContext,
    withPersonContext,
    withIntl
);