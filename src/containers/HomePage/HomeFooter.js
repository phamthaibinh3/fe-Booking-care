import React, { Component } from 'react';
import { connect } from 'react-redux';


class HomeFooter extends Component {

    render() {

        return (
            <div className='home-footer'>
                <p>&copy; 2025 Pham Thai Binh. More information <a target='_blank' href='https://www.facebook.com/profile.php?id=100007282278924'>FB</a></p>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
