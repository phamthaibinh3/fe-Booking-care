import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from "react-slick";

class HandBook extends Component {

    render() {

        return (
            <div className='section-share section-handbook'>
                <div className='section-container'>
                    <div className='speacialty-header'>
                        <span className='title-section'>Cẩm nang</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='customize-border'>
                                <div className='section-custommize'>
                                    <div className='bg-image section-handbook' />
                                    <div>Cơ xường khớp 1</div>
                                </div>
                            </div>
                            <div className='section-custommize'>
                                <div className='bg-image section-handbook' />
                                <div>Cơ xường khớp 2</div>
                            </div>
                            <div className='section-custommize'>
                                <div className='bg-image section-handbook' />
                                <div>Cơ xường khớp 3</div>
                            </div>
                            <div className='section-custommize'>
                                <div className='bg-image section-handbook' />
                                <div>Cơ xường khớp 4</div>
                            </div>
                            <div className='section-custommize'>
                                <div className='bg-image section-handbook' />
                                <div>Cơ xường khớp 5</div>
                            </div>
                            <div className='section-custommize'>
                                <div className='bg-image section-handbook' />
                                <div>Cơ xường khớp 6</div>
                            </div>
                        </Slider>
                    </div>



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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
