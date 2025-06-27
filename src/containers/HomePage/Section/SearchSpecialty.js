import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss'
import Slider from "react-slick";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
import specialtyImg from '../../../assets/images/specialty/ong-nghiem.jpg'
import { getAllSpecialty } from '../../../services/userService';
import { withRouter } from 'react-router';

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: []
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialty();
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res && res.data ? res.data : []
            })
        }
    }

    handleViewDetailSpecialty = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`)
        }
    }

    render() {
        // console.log('log props specialty: ',this.state.dataSpecialty);
        
        let { dataSpecialty } = this.state

        // const responsive = {
        //     superLargeDesktop: {
        //         // the naming can be any, depends on you.
        //         breakpoint: { max: 4000, min: 3000 },
        //         items: 5
        //     },
        //     desktop: {
        //         breakpoint: { max: 3000, min: 1024 },
        //         items: 3
        //     },
        //     tablet: {
        //         breakpoint: { max: 1024, min: 464 },
        //         items: 2
        //     },
        //     mobile: {
        //         breakpoint: { max: 464, min: 0 },
        //         items: 1
        //     }
        // };
        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='speacialty-header'>
                        <span className='title-section'>Chuyên khoa phổ biến</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataSpecialty && dataSpecialty.length > 0 &&
                                dataSpecialty.map((item, index) => {
                                    return (
                                        <div
                                            className='section-custommize specialty-child'
                                            key={index}
                                            onClick={() => this.handleViewDetailSpecialty(item)}
                                        >
                                            <div
                                                className='bg-image section-specialty'
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            />
                                            <div className='specialty-name'>{item.name}</div>
                                        </div>
                                    )
                                })
                            }

                        </Slider>
                    </div>


                    {/* <Carousel responsive={responsive}>
                        <div>Item 1</div>
                        <div>Item 2</div>
                        <div>Item 3</div>
                        <div>Item 4</div>
                    </Carousel>; */}
                </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
