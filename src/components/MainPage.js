import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {removeRecord} from '../actions/history';
import './main.css'


const MainPage = (props) => (
    <div className='main-div'>
        <div className='sub-div'>
            <Link to='/pdf'><button className='nav-button'> Take a PDF of a Website</button> </Link>
            <Link to='/screenshot'><button className='nav-button'> Take a Screenshot of a Website </button></Link>
            <Link to='/dom'><button className='nav-button'> Take a DOM of a Website </button></Link>
        </div>
        <div className='sub-div'>
            {props.history.map((record)=>(
                <div className='card-div' key={record.id}>
                    <h4>{record.name}</h4>
                    <p>{record.url} - {record.type}</p>
                    <p>{record.createdAt.format('Do MMM YYYY HH:mm')}</p>
                    <button 
                    className='form-button'
                     onClick={() => props.dispatch(removeRecord({id: record.id}))}> Remove Record
                      </button>
                </div>
            ))}
        </div>
    </div>
);



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