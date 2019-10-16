import * as React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import Login from './user/login';
import Home from './home';
import Page from './page';
import Profile from './profile/profile';
import EditProfilePicture from './profile/edit-profile-picture';
import EditProfileCallSign from './profile/edit-profile-callsign';

import LocationReportSearch from './search-forms/search-location-reports';
import RegionSummarySearch from './search-forms/search-region-summaries';
import LocationReportSubmit from './submit-forms/submit-location-report';
import RegionSummarySubmit from './submit-forms/submit-region-summary';
import UsersTable from './admin/users-table';
import RegionsTable from './admin/regions-table';
import LocationsTable from './admin/locations-table';
import TodaysCodePage from './todays-code-page';
import LocationForm from './admin/location-form';
import RegionForm from './admin/region-form';
import UserForm from './admin/user-form';
import Error from './error';

import { checkToken } from './utilities/request-helper';

export default class App extends React.Component {
    render() {

        checkToken();

        return (
            <React.Fragment>
                <Router>
                    <Switch>
                        <Route path='/' exact render={() => <Page><Home /></Page>} />
                        <Route path='/login' render={() => <Page><Login /></Page>} />
                        <Route path='/search/location' render={() => <Page><LocationReportSearch /></Page>} />
                        <Route path='/search/region' render={() => <Page><RegionSummarySearch /></Page>} />
                        <Route path='/submit/location' render={() => <Page><LocationReportSubmit /></Page>} />
                        <Route path='/submit/region' render={() => <Page><RegionSummarySubmit /></Page>} />

                        <Route path='/admin/locations' exact render={() => <Page><LocationsTable/></Page>} />
                        <Route path='/admin/regions' exact render={() => <Page><RegionsTable/></Page>} />
                        <Route path='/admin/users' exact render={() => <Page><UsersTable/></Page>} />

                        <Route path='/admin/locations/add' render={() => <Page><LocationForm/></Page>} />
                        <Route path='/admin/regions/add' render={() => <Page><RegionForm/></Page>} />
                        <Route path='/admin/users/add' render={() => <Page><UserForm/></Page>} />

                        <Route path='/admin/locations/edit/:id' render={props => <Page><LocationForm id={props.match.params.id} /></Page>} />
                        <Route path='/admin/regions/edit/:id' render={props => <Page><RegionForm id={props.match.params.id} /></Page>} />
                        <Route path='/admin/users/edit/:id' render={props => <Page><UserForm id={props.match.params.id} /></Page>} />

                        <Route path='/message' render={() => <Page><TodaysCodePage /></Page>} />
                        <Route path='/profile' exact render={() => <Page><Profile /></Page>} />
                        <Route path='/profile/edit/callsign' render={() => <Page><EditProfileCallSign /></Page>} />
                        <Route path='/profile/edit/picture' render={() => <Page><EditProfilePicture /></Page>} />

                        <Route path='/error' render={() => <Page><Error/></Page>}/>
                        <Route render={() => <Page><Error/></Page>}/>
                    </Switch>
                </Router>
            </React.Fragment>
        );
    }
}
