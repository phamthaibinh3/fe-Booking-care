import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.scss'
import logo from '../../assets/logo.png'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils'
import { changeLanguageApp } from '../../store/actions/appActions';
import { withRouter } from 'react-router'

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            find: ''
        }
    }
    changeLanguge = (language) => {
        this.props.changeLanguageAppRedux(language)
        //fire redux event: actions
    }

    scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    }

    handleOnchangeFind = (event) => {
        let find = event.target.value
        this.setState({
            find: find
        })
    }

    handleOnclickFind = () => {
        const { find } = this.state;
        this.props.onSearch(find);
    }

    render() {
        let language = this.props.language;
        console.log('check state: ', this.state);

        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <img className='header-logo' src={logo} onClick={() => this.props.history.push('/home')} />
                        </div>
                        <div className='center-content'>
                            <div className='child-content' onClick={() => this.scrollToSection("chuyenkhoa")}>
                                <div><b><FormattedMessage id="home-header.specialty" /></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.searchdoctor" /></div>
                            </div>
                            <div className='child-content' onClick={() => this.scrollToSection("cosoyte")}>
                                <div><b><FormattedMessage id="home-header.medicalFacility" /></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.searchdoctor" /></div>
                            </div>
                            <div className='child-content' onClick={() => this.scrollToSection("bacsinoibat")}>
                                <div><b><FormattedMessage id="home-header.featuredDoctor" /></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.searchdoctor" /></div>
                            </div>
                            {/* <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.specialty" /></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.searchdoctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.specialty" /></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.searchdoctor" /></div>
                            </div> */}
                        </div>
                        <div className='right-content'>
                            <div className='support'><i class="fas fa-question-circle"></i>Hỗ trợ</div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguge(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguge(LANGUAGES.EN)}>EN</span></div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='title1'>
                                <FormattedMessage id="banner.title1" />
                            </div>
                            <div className='title2'>
                                <FormattedMessage id="banner.title2" />
                            </div>
                            <div className='search'>
                                <i className="fas fa-search"></i>
                                <input type='text' placeholder='Tìm chuyên khoa khám bệnh'
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            this.handleOnclickFind();
                                        }
                                    }}
                                    onChange={(event) => this.handleOnchangeFind(event)}
                                />
                            </div>
                        </div>
                        <div className='content-down'>
                            <div className='options'>
                                <div className='options-child'>
                                    <div className='icon-child'><i className='fas fa-hospital'></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.text-child1" /></div>
                                </div>
                                <div className='options-child'>
                                    <div className='icon-child'><i className='fas fa-hospital'></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.text-child2" /></div>
                                </div>
                                <div className='options-child'>
                                    <div className='icon-child'><i className='fas fa-hospital'></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.text-child3" /></div>
                                </div>
                                <div className='options-child'>
                                    <div className='icon-child'><i className='fas fa-hospital'></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.text-child4" /></div>
                                </div>
                                <div className='options-child'>
                                    <div className='icon-child'><i className='fas fa-hospital'></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.text-child5" /></div>
                                </div>
                                <div className='options-child'>
                                    <div className='icon-child'><i className='fas fa-hospital'></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.text-child6" /></div>
                                </div>

                            </div>
                        </div>


                    </div>
                }
            </React.Fragment>
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
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
