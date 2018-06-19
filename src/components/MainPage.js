import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {removeRecord} from '../actions/history';



const MainPage = (props) => (
    <div style={divStyle}>
        <div style={subDiv}>
            <Link to='/pdf'> Take a PDF of a Web Site </Link>
            <Link to='/screenshot'> Take a Screenshot of a Web Site </Link>
            <Link to='/dom'> Take a DOM of a Web Site </Link>
        </div>
        <div style={subDiv}>
            {props.history.map((record)=>(
                <div key={record.id}>
                    <h4>{record.name}</h4>
                    <p>{record.url} - {record.type}</p>
                    <p>{record.createdAt.format('Do MMM YYYY HH:mm')}</p>
                    <button onClick={() => props.dispatch(removeRecord({id: record.id}))}> Remove Record </button>
                </div>
            ))}
        </div>
    </div>
);

const divStyle = {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 25
};

const subDiv = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
}

const stateToProps = (state) => {

    return {
        history: state.history.sort((a,b) => {
            if(a.createdAt.isBefore(b.createdAt)) {
                return 1;
            } else {
                return -1;
            }
        })
    };
};

export default connect(stateToProps)(MainPage);