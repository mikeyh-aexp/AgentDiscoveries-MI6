import * as React from 'react';
import {Button, ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap';
import {apiPost} from '../utilities/request-helper';
import Message from '../message';

export default class DecodeEnemyMessageForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: {},
            enemyMessage: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onEnemyMessageUpdate = this.onEnemyMessageUpdate.bind(this);
    }

    render() {
        return (
            <div className='col-md-8 col-md-offset-2'>
                <Message message={this.state.message} />
                <div className='col-md-12'>
                    <Form onSubmit={this.onSubmit}>
                        <h3>Decode Enemy Message</h3>

                        <FormGroup>
                            <ControlLabel>Enemy message</ControlLabel>
                            <FormControl type='text' required
                                componentClass='textarea'
                                placeholder='Enter enemy message to decode'
                                value={this.state.enemyMessage}
                                onChange={this.onEnemyMessageUpdate}
                                id='enemy-message'/>
                        </FormGroup>
                        <Button type='submit'>Submit</Button>
                    </Form>
                </div>
            </div>
        );
    }

    onEnemyMessageUpdate(event) {
        this.setState({ enemyMessage: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();

        const body = {
            message: this.state.enemyMessage
        };

        const request = apiPost('decodemessage/enemy', body);

        request
            .then(result => this.setState({ message: { message: result.message, type: 'success'} }))
            .catch(error => this.setState({ message: { message: error.message, type: 'danger' } }));
    }

}
