import React, { Component } from 'react';
import { connect } from 'react-redux';
import {hostAddEvent} from "../../actions";

class HostCreateEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eventName: '',
            code: '',
        };

        this.handleNameInput = this.handleNameInput.bind(this);
        this.handleCodeInput = this.handleCodeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleNameInput(e) {
        this.setState({ eventName: e.target.value });
    }

    handleCodeInput(e) {
        this.setState({ code: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const event = {
            name: this.state.eventName,
            code: this.state.code,
        };
        this.props.addEvent(event);
        this.setState({
            eventName: '',
            code: '',
        });

        this.props.history.push('/host');
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} id="create-form">
                <label>
                    Event Name:
                    <input
                        type="text"
                        name="eventName"
                        value={this.state.eventName}
                        onChange={this.handleNameInput}
                        required
                    />
                </label>
                <label>
                    Code:
                    <input
                        type="text"
                        name="code"
                        value={this.state.code}
                        onChange={this.handleCodeInput}
                        required
                    />
                </label>
                <div className="row">
                    <div className="col">
                        <button type="submit" value="Submit">Submit</button>
                    </div>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (/* dispatch */) => {
    return {
        addEvent: hostAddEvent,
    };
};

export default connect(mapStateToProps,mapDispatchToProps())(HostCreateEvent);

