
import React from 'react';
import './styles/header.css';


class Header extends React.Component {

    render() {
        return <div className="top">
           {this.props.title}
        </div>
    }

}

export default Header;

