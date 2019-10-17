import * as React from 'react';
import {Button, Form, FormControl, FormGroup} from 'react-bootstrap';
import {apiPost} from './utilities/request-helper';
import Timezones from './timezones';
import $ from 'jquery';

export default class TodaysCodePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            result: '',
            showMessage: true,
            hideButton: false
        };

        this.onChange = this.onChange.bind(this);
        this.handleDecode = this.handleDecode.bind(this);
        this.handleEncode = this.handleEncode.bind(this);
        this.handleRequest = this.handleRequest.bind(this);
        this.slideDown = this.slideDown.bind(this);
    }

    componentDidMount() {
        $('#react-root').css('background-color', 'rgba(0, 0, 0, 0.7)');
        $('.opening-top').animate({ width: '0%' }, 800, function() {});
        $('.opening-bottom').animate({ width: '0%' }, 800, function() {});
    }

    render() {

        return (
            <React.Fragment>

                <div className='opening-top'></div>
                <div className='opening-bottom'></div>

                <Timezones />

                <div className='box'></div>
                <div className='col-md-8 col-md-offset-2 text-center'>
                    {this.state.buttonHidden ? null :
                        <Button className="message-btn" id="encode-button-show" onClick={this.slideDown}>Encode Message</Button>}
                    {this.state.showMessage ?
                        <Form className="encode-form">
                            <h3>Encode/decode message with today's secret</h3>
                            <FormGroup>
                                <FormControl type='text' required
                                    id='message-input'
                                    componentClass='textarea' rows={2}
                                    placeholder='Enter message'
                                    value={this.state.message}
                                    onChange={this.onChange}/>
                            </FormGroup>
                            <Button id="encode-button" className='rm-3' type='submit' onClick={this.handleEncode}>Encode</Button>
                            <Button id="decode-button" type='submit' onClick={this.handleDecode}>Decode</Button>
                        </Form> : null}
                    <div id='code-result'>
                        {this.state.result ? <h3>Result: </h3> : ''}
                        <h4>{this.state.result}</h4>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    slideDown(event) {
        this.setState({buttonHidden: true});
        this.setState({showMessage: true});
        $('.encode-form').animate({height: '20vh'}, 'slow');
        $('h3').addClass('typing-animation');
        setTimeout(function(){ $('h3').removeClass('typing-animation'); }, 3500);
    }

    onChange(event) {
        this.setState({ message: event.target.value });
    }

    handleEncode(event) {
        event.preventDefault();
        this.handleRequest('encodemessage');
    }

    handleDecode(event) {
        event.preventDefault();
        this.handleRequest('decodemessage');
    }

    handleRequest(api) {
        const body = { message: this.state.message };

        apiPost(api, body)
            .then(response => this.setState({ result: response.message }))
            .catch(error => this.setState({ result: error.message }));
    }
}
