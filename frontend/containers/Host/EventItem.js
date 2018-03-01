import {Component} from "react";
import {hostRemoveEvent, hostSelectEvent} from "../../actions";
import {connect} from 'react-redux';
import React from "react";

class EventItem extends Component {
    handleClick(event) {
        this.props.selectEvent(event);
        this.props.history.push('/host/event');
    }
    handleRemove(event){
        this.props.removeEvent(event);
    }


    render() {
        return (
            <div>
                <div>
                    Name: {this.props.event.name}
                </div>
                <button onClick={() => this.handleClick(this.props.event)}>more info</button>
                <button onClick={() => this.handleRemove(this.props.event)}>Remove</button>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (/* dispatch */) => {
    return {
        selectEvent: hostSelectEvent,
        removeEvent: hostRemoveEvent
    };
};
export default connect(mapStateToProps,mapDispatchToProps())(EventItem);
