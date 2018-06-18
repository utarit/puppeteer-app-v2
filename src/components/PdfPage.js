import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import FormPage from './FormPage';
import {addRecord} from '../actions/history';

const PdfPage = (props) => (
    <div>
        <h1>This is PDF Page</h1>
        <FormPage 
            onSubmit={(form)=>{
                props.dispatch(addRecord({
                    url:form.url,
                    name:form.name,
                    createdAt: moment(),
                    type: 'PDF'
                }));
            }}
        />
    </div>
);


export default connect()(PdfPage);