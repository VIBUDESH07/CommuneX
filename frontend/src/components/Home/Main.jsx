import React from 'react';
import logo1 from './globalization.svg';
import logo2 from './OBJECTIVES/download.svg';
import img1 from './OBJECTIVES/images_1.svg';
import img2 from './OBJECTIVES/images-_1_.svg';
import img3 from './OBJECTIVES/images-_2_.svg';
import img4 from './OBJECTIVES/images-_3_.svg';
import img5 from './OBJECTIVES/images-_4_.svg';
import img6 from './OBJECTIVES/images.svg';


const Main = () => {
  
    const Images = [
        logo2,
        img1,
        img2,
        img3,
        img4,
        img5,
        img6
    ];

    return (
        <div className='main'>
            <div className="greetings">
                <h2>Welcome to the Smart Community Engagement and Resource Sharing Platform! 🌟</h2>
                <img src={logo1} className='image' alt="Globalization Logo" />
            </div>
            <div className='objectives'>
                <div>
                <h3>Objectives</h3>
                </div>  
                <div className="image-obj">
                {
                        Images.map((image, index) => (
                            <div key={index}>
                                <img src={image} alt={`Objective ${index + 1}`} />
                            </div>
                        ))
                    }
                    </div>
            </div>
        </div>
    );
};

export default Main;
