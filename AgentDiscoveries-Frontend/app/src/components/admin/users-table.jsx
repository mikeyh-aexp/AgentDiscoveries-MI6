import * as React from 'react';
import Entities from './entities-view';
import {apiGet} from '../utilities/request-helper';
import {errorLogAndRedirect} from '../error';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default class UsersTable extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            entities: []
        };
    }

    componentDidMount() {
        this.loadEntities();
    }

    render() {
        return (
            <div className='col-md-8 col-md-offset-2'>
                <h3>Users</h3>
                <Link to={'/admin/users/add'}>
                    <Button type='button'>
                        Add User
                    </Button>
                </Link>
                <Entities api='users' key='users' entities={this.state.entities}/>
            </div>
        );
    }

    loadEntities() {
        apiGet('users')
            .then(results => this.setState({ entities: results }))
            .catch(errorLogAndRedirect);
    }
}