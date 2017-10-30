
import React from 'react';
import './styles/loading.css';

class LoadingView extends React.Component {

    constructor (props) {
        super(props);

    }

    render() {
        return <div className="loading-view" style={{"display" : this.props.status == true ? "block" : "none"}}>
                 <div className="loading">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                </div>
              </div>
    }
}

export default LoadingView;