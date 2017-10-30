
import React from 'react';
import './styles/tip.css';

class Tip extends React.Component {

    constructor (props) {
        super(props);

    }

    render() {
        return <div className="tip-view" style={{"display" : this.props.status == true ? "block" : "none"}}>
                 <div className="tip-box">
                     {this.props.message}
                 </div>
              </div>
    }
}

export default Tip;