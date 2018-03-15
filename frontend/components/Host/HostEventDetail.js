import React, {Component} from 'react';
import {connect} from 'react-redux';
import HostEventGuestItem from "./HostEventGuestItem";
import {getAttends, getRSVPs} from "../../actions/index";
import {LOAD} from "../../helpers/Enums";

class HostEventDetail extends Component {

    constructor(props) {
        super(props);
        this.handleEditClick = this.handleEditClick.bind(this);

        props.getRSVPs(this.props.event);
        props.getAttends(this.props.event);
    }

    handleEditClick() {
        this.props.history.push('/host/edit');
    }

    getRSVPsOutput() {
        switch (this.props.rsvps) {
            case LOAD.LOADING:
                return <h3>LOADING</h3>;
            case LOAD.NOTHING:
                return;
            default:
                return this.props.rsvps.map((guest, i) => (
                    <HostEventGuestItem history={this.props.history} key={i} guest={guest}/>
                ));
        }
    }

    getAttendsOutput() {
        switch (this.props.attends) {
            case LOAD.LOADING:
                return <h3>LOADING</h3>;
            case LOAD.NOTHING:
                return;
            default:
                return this.props.attends.map((guest, i) => (
                    <HostEventGuestItem history={this.props.history} key={i} guest={guest}/>
                ));
        }
    }

    render() {
        return (
            <div>
                <br/>
                <div>
                    Name: {this.props.event.name}
                </div>
                <br/>
                <div>
                    Code: {this.props.event.code}
                </div>
                <br/>
                <div>
                    Info: {this.props.event.info}
                </div>
                <br/>
                <div>
                    RSVP Start: {new Date(this.props.event.dates.rsvpStart).toString()}
                </div>
                <div>
                    RSVP End: {new Date(this.props.event.dates.rsvpEnd).toString()}
                </div>
                <div>
                    Checkin Start: {new Date(this.props.event.dates.checkinStart).toString()}
                </div>
                <div>
                    Checkin End: {new Date(this.props.event.dates.checkinEnd).toString()}
                </div>
                <br/>
                <br/>
                <button onClick={this.handleEditClick}>Edit Event</button>
                <br/>
                <br/>
                <div>
                    <br/>
                    RSVPs:
                    <hr/>
                    {this.getRSVPsOutput()}
                    <br/>
                </div>
                <div>
                    Attendees:
                    <hr/>
                    {this.getAttendsOutput()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        event: state.event.selected,
        rsvps: state.event.selectedRSVPs,
        attends: state.event.selectedAttends
    };
};

const mapDispatchToProps = (/* dispatch */) => {
    return {
        getRSVPs: getRSVPs,
        getAttends: getAttends
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(HostEventDetail);
