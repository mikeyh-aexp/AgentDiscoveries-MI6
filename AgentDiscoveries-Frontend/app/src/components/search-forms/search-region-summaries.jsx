import * as React from 'react';
import {Button, ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap';
import Message from '../message';
import SearchResult from './search-result';
import moment from 'moment/moment';
import QueryString from 'query-string';
import {apiGet} from '../utilities/request-helper';
import {errorLogAndRedirect} from '../error';

export default class RegionSummariesSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            regionId: '',
            agentId: '',
            fromTime: '',
            toTime: '',
            regions: [],
            agents: [],
            results: [],
            message: {}
        };

        this.onRegionChange = this.onRegionChange.bind(this);
        this.onAgentChange = this.onAgentChange.bind(this);
        this.onFromChange = this.onFromChange.bind(this);
        this.onToChange = this.onToChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.loadRegions();
        this.loadAgents();
    }

    render() {
        const regionOptions = this.state.regions.map(region => <option key={region.regionId} value={region.regionId}>{`${region.regionId} - ${region.name}`}</option>);
        const agentOptions = this.state.agents.map(agent => <option key={agent.agentId} value={agent.agentId}>{`${agent.agentId} - ${agent.firstName} ${agent.lastName}`}</option>);
        regionOptions.unshift(<option key={'default'} value={''}>{'All Regions'}</option>);
        agentOptions.unshift(<option key={'default'} value={''}>{'All Agents'}</option>);
        return (
            <div className='col-md-8 col-md-offset-2'>
                <Form onSubmit={this.onSubmit}>
                    <h3>Search Region Summaries</h3>
                    <Message message={this.state.message} />
                    <FormGroup>
                        <ControlLabel>Region</ControlLabel>
                        <FormControl componentClass="select"
                            onChange={this.onRegionChange}>
                            {regionOptions}
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Agent</ControlLabel>
                        <FormControl componentClass="select"
                            onChange={this.onAgentChange}>
                            {agentOptions}
                        </FormControl>
                    </FormGroup>
                    <FormGroup className='form-inline'>
                        <ControlLabel className='rm-3'>From</ControlLabel>
                        <FormControl className='rm-3' type='date'
                            value={this.state.fromTime}
                            onChange={this.onFromChange}/>
                        <ControlLabel className='rm-3'>To</ControlLabel>
                        <FormControl className='rm-3' type='date'
                            value={this.state.toTime}
                            onChange={this.onToChange}/>
                    </FormGroup>
                    <Button type='submit'>Search</Button>
                </Form>
                <SearchResult api='regions' results={this.state.results} />
            </div>
        );
    }

    onRegionChange(event) {
        this.setState({ regionId: event.target.value });
    }

    onAgentChange(event) {
        this.setState({ agentId: event.target.value });
    }

    onFromChange(event) {
        this.setState({ fromTime: event.target.value });
    }

    onToChange(event) {
        this.setState({ toTime: event.target.value });
    }

    loadRegions() {
        apiGet('regions')
            .then(results => this.setState({ regions: results }))
            .catch(errorLogAndRedirect);
    }

    loadAgents() {
        apiGet('agents')
            .then(results => this.setState({ agents: results }))
            .catch(errorLogAndRedirect);
    }

    onSubmit(event) {
        event.preventDefault();
        const params = {
            regionId: this.state.regionId,
            agentId: this.state.agentId,
            fromTime: this.state.fromTime && moment.utc(this.state.fromTime).startOf('day').toISOString(),
            toTime: this.state.toTime && moment.utc(this.state.toTime).endOf('day').toISOString()
        };

        const url = 'reports/regionsummaries?' + QueryString.stringify(params);

        apiGet(url)
            .then(results => this.setState({ results: results, message: {} }))
            .catch(error => this.setState({ message: { message: error.message, type: 'danger' } }));
    }
}
