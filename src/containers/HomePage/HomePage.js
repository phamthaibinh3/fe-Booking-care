import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Specialty from './Section/Specialty';
import './HomePage.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MedicalFacility from './Section/MedicalFacility';
import OutStandingDoctor from './Section/OutStandingDoctor';
import HandBook from './Section/HandBook';
import About from './Section/About';
import HomeFooter from './HomeFooter';
import { after } from 'lodash';
import { getAllSpecialty } from '../../services/userService';

class HomePage extends Component {

    // handleAfterChange = (index,dontAnimate) => {

    // }

    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: [],
            filterKeyword: ''
        }
    }


    async componentDidMount() {
        let res = await getAllSpecialty();
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data
            })
        }
    }

    handleSearch = (keyword) => {
        this.setState({
            filterKeyword: keyword
        }, () => {
            const section = document.getElementById('chuyenkhoa');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        })
    }

    render() {
        let settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            // slickGoTo: this.handleAfterChange,
        };
        return (
            <>
                 <Header 
                    isShowBanner={true}
                    dataSpecialty={this.state.dataSpecialty}
                    onSearch={this.handleSearch}
                />
                <div id="chuyenkhoa">
                    <Specialty 
                        settings={settings}
                        dataSpecialty1={this.state.dataSpecialty}
                        filterKeyword={this.state.filterKeyword}
                    />
                </div>
                <div id="cosoyte">
                    <MedicalFacility settings={settings} />
                </div>
                <div id="bacsinoibat">
                    <OutStandingDoctor settings={settings} />
                </div>
                {/* <HandBook
                    settings={settings}
                /> */}
                <About />
                <HomeFooter />
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
