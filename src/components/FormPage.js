import React from 'react';




class FormPage extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            url: '',
            name: ''
        };
    }

    onUrlChange = (e) => {
        const url = e.target.value;
        this.setState(() => ({url}))
    }

    onNameChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({name}))
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit({
            url: this.state.url,
            name: this.state.name
        });
    };

    render() {

        return (
            <div>
                <form onSubmit={this.onSubmit} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <input 
                        style={inputStyle} 
                        type='text' 
                        placeholder='URL' 
                        value={this.state.url} 
                        onChange={this.onUrlChange}
                    />
                    <input 
                        style={inputStyle} 
                        type='text' 
                        placeholder='Name'
                        value={this.state.name}
                        onChange={this.onNameChange}
                    />
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

const inputStyle = {
    marginBottom: 10
};

export default FormPage;