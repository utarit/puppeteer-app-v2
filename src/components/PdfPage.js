import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import Spinner from 'react-spinner';
import FormPage from './FormPage';
import {addRecord} from '../actions/history';
import './react-spinner.css';
  
 class PdfPage extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            showLink: false,
            name: '',
            loading: false
        };
    }

    onDownloadClick = () => {
        window.open(`http://localhost:5000/pdfs/${this.state.name}`);
    }

    render(){

        return (
            <div>
                <h1>This is PDF Page</h1>
            <FormPage 
            onSubmit={(form)=>{
                this.setState({showLink: false, loading: true});
                const data = {
                    url:form.url,
                    name:form.name,
                    type: 'PDF'
                };
                    if(!form.url.match(/^https?:\/\/[a-z]*\.[a-z]*$/)){
                        this.setState({errorUrl: 'Please enter a valid url'});
                        return;
                    } else {
                        this.setState({errorUrl: ''});
                    }

                    fetch('http://localhost:5000/api/puppet', {
                    method: 'POST',
                    mode:'no-cors',
                    redirect: 'follow',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                      },
                    body: JSON.stringify(data)
                        }).then((response)=>{
                        this.setState({showLink: true, name: data.name, loading: false})
                        this.props.dispatch(addRecord({...data, createdAt: moment()}));
                        }).catch((err) => {console.log('ERR: ', err)});
                
                        }}
                />
                <p>{this.state.errorUrl}</p>
                {this.state.loading ? <div style={style}><Spinner /></div> : ""}
                {this.state.showLink ? <button onClick={this.onDownloadClick}>Download</button>: ''}
            </div>
        );
    }
 } 

 const style = {
    height: 50,
    width: 50,
    margin: 'auto',
    backgroundColor: 'grey',
};


export default connect()(PdfPage);