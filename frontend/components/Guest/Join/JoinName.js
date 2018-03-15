import React, {Component} from 'react';
import {connect} from 'react-redux';
import {guestFindEvent, guestJoinEvent, guestResetJoinFind} from "../../../actions/index";
import {JOIN_FIND} from "../../../helpers/Enums";

class JoinName extends Component {
    constructor(props) {
        super(props);
        this.handleConfirm = this.handleConfirm.bind(this);

        this.state = {
            name: '',
        };
    }

    handleConfirm(e) {
        e.preventDefault();
        this.props.joinEvent(this.props.eventToJoin);
        this.props.history.push('/guest');
    }

    handleInput(e) {
        this.setState({name: e.target.value});
    }

    render() {
        return (
            <form>
                <h3>Please confirm RSVP for {this.props.eventToJoin.name}</h3>
                Name:
                <input
                    name="name"
                    type="text"
                    value={this.state.name}
                    onChange={this.handleInput}/>
                <input type="submit" value="submit">confirm</input>
            </form>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        eventToJoin: state.guest.eventToJoin,
    };
};

const mapDispatchToProps = (/* dispatch */) => {
    return {
        joinEvent: guestJoinEvent,
        resetJoin: guestResetJoinFind
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(JoinName);


