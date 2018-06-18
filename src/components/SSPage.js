import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import FormPage from './FormPage';
import {addRecord} from '../actions/history';



const SSPage = (props) => (
    <div>
        <h1>This is SS Page</h1>
        <FormPage 
            onSubmit={(form)=>{
                props.dispatch(addRecord({
                    url:form.url,
                    name:form.name,
                    createdAt: moment(),
                    type: 'Screenshot'
                }));
            }}
        />
    </div>

);


export default connect()(SSPage);