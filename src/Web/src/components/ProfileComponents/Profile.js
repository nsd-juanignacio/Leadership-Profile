import React, { useState, useRef } from 'react';
import { Nav, NavItem, NavLink} from 'reactstrap';

import ProfileInfo from './ProfileInfo';
import CollapsibleTable from './CollapsibleTable';
import CollapsibleLeaderOfSelf from './CollapsibleLeaderOfSelf';
import LeaderOfOrgChart from './LeaderOfOrgChart';
import ProfessionalDevelopmentTable from './../ProfessionalDevelopmentComponents/ProfessionalDevelopmentTable'
import CertificationsTable from './../CertificationsComponents/CertificationsTable'
import PositionHistoryTable from '../PositionHistoryComponent/PositionHistoryTable';
import UseProfile from './UseProfile';
import ProfileBreadcrumbMenu from './ProfileBreadcrumbMenu';

const Profile = () => {
    const [activeComponent, setActiveComponent] = useState("general");
    const id = window.location.href.slice(window.location.href.lastIndexOf('/')+1);
    const { data, losMapping } = UseProfile(id);
    var losMappingResult = null;

    if (data.performanceMeasures != undefined) {
        losMappingResult = losMapping(data.performanceMeasures); 
    }
 
    return (
        <div>
            <ProfileBreadcrumbMenu data={data} />
            <ProfileInfo data={data}/>
            <Nav className="profile-nav">
                <NavItem className={activeComponent === "general" ? "current-profile-page nav-option" : "nav-option"}>
                    <NavLink onClick={() => setActiveComponent("general")}>General Info</NavLink>
                </NavItem>
                <NavItem className={activeComponent === "leader" ? "current-profile-page nav-option" : "nav-option"}>
                    <NavLink onClick={() => setActiveComponent("leader")}>Performance</NavLink>
                </NavItem>
            </Nav>

            {activeComponent === "general" && data !== {} ? (
                <div>
                    <PositionHistoryTable title='Position History' data={data.positionHistory} />
                    <CertificationsTable title='Certifications' data={data.certificates} />
                    <ProfessionalDevelopmentTable title='Professional Development and Learning Experiences' data={data.professionalDevelopment}/>
                </div>
                ) : activeComponent === "leader" && losMappingResult !== null && losMappingResult !== 0 ? (
                    <div>
                        { (losMappingResult).map((obj, i) => {
                            return (<CollapsibleLeaderOfSelf title={obj.categoryTitle} data={obj}/>)
                            })
                        }
                    </div>
                ) : '' }
        </div >
    );
}

export default Profile;