import React from 'react';
import mainimage from '../assets/images/mainimage.jpeg';
import webdev from '../assets/images/web-development.png';
import cleaning from '../assets/images/cleaning.png';
import gradining from '../assets/images/gardening.png';
import plumbing from '../assets/images/plumbing.png';
import video from '../assets/images/video.png';
import interior from '../assets/images/interior.png';
import carpenter from '../assets/images/carpentry.png';
import phone from '../assets/images/phone.png';
import clock from '../assets/images/clock.png';
import email from '../assets/images/email.png';
import graphicdesign from '../assets/images/graphic-design.png';


const LandingServiceCart = (props) => {
    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', color: 'white', width: '270px', height: '220px', backgroundColor: 'black', margin: '10px',marginBottom: '35px', padding: '10px', borderRadius: '5px', boxShadow: '2px 2px 5px gray' }}>
                <div style={{ width: '90px', height: '90px', borderRadius: '50%', backgroundColor: 'white', marginTop: '-50px', marginLeft: '10px', border: '2px solid black' }}>
                    <img src={props.image || graphicdesign} alt="" style={{ width: '60px', marginLeft: '15px', boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)', margin: '15px' }} />
                </div>


                <h1> {props.heading || 'Graphic Design'}</h1>
                <p> {props.text || 'From logos to marketing materials, our graphic designers create visually stunning assets tailored to your brand.'}</p>
            </div>
        </div>
    )
}

export default function Home() {
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
    React.useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <>
            <div style={{
                display: 'flex',
                flexDirection: windowWidth < 768 ? 'column' : 'row-reverse',
                padding:windowWidth < 768 ? '0px':'20px',
                maxWidth: '100%',
                
            }} >
                <img
                    src={mainimage}
                    alt="Main"
                    style={{ width: '100%', maxWidth: '600px', borderRadius: '10px', boxShadow: '1px 1px 5px gray', margin: '20px' }}
                />
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: '20px',
                    width: '100%',
                    maxWidth: '1200px',
                }}>
                    <h1 style={{ fontSize: '4rem', color: 'rgb(21, 107, 0)', marginBottom: '0px', marginTop:windowWidth < 768 ? '5px':''  }}>Task Overloaded?</h1>
                    <p style={{ fontSize: '2rem', marginBottom: '20px' }}>Outsource and Thrive</p>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding:windowWidth < 768 ?'4px': '10px 15px',
                        border: '2px solid black',
                        borderRadius: '4px',
                        marginBottom: '20px',
                    }}>
                        <input
                            type="email"
                            placeholder="Enter Your Email address"
                            style={{
                                fontSize: '18px',
                                border: 'none',
                                padding: '5px 15px',
                                backgroundColor: 'transparent',
                            }}
                        />
                        <button style={{
                            fontSize: '18px',
                            border: 'none',
                            padding: '8px 15px',
                            backgroundColor: 'black',
                            color: 'white',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}>Subscribe</button>
                    </div>
                    <span style={{ fontSize: '22px', marginTop: '14px' }}>
                        Discover Talented Professionals Offering Both Physical and Digital Services on Easy Life
                    </span>
                </div>
            </div>

            <div style={{ margin: '20px 0px', padding: '10px', textAlign: 'center' }}>
                <div style={{ margin: '20px 0px', padding: '10px', borderRadius: '5px' }}>
                    <h1 style={{
                        textAlign: 'center',
                        color: 'rgb(21, 107, 0)',
                        margin: '20px 0px',
                        marginBottom: '70px',
                        fontSize: '3rem', // Adjusted for responsiveness
                        marginTop:windowWidth < 768 ? '0px': '',
                    }}>
                        You can get the following Services <br />On Our Platform
                    </h1>

                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap', // Allow items to wrap
                        justifyContent: 'center',
                        marginTop: '35px',
                    }}>
                        <LandingServiceCart />
                        <LandingServiceCart image={webdev} heading='Web Development' text='Build a professional online presence with custom websites and web applications crafted by our experienced developers.' />
                        <LandingServiceCart image={cleaning} heading='Home Cleaning' text='Enjoy a clean and tidy home with our reliable and thorough cleaning services.' />
                        <LandingServiceCart image={gradining} heading='Gardening' text='Transform your outdoor space into a lush oasis with our landscaping and gardening expertise.' />
                        <LandingServiceCart image={interior} heading='Interior Design' text='Create a stylish and functional living space that reflects your personal taste and lifestyle with our interior design services.' />
                        <LandingServiceCart image={plumbing} heading='Plumbing' text='Keep your plumbing systems in top condition with prompt and efficient plumbing repairs and installations.' />
                        <LandingServiceCart image={video} heading='Video Editing' text='Bring your vision to life with professional video editing services, perfect for social media, marketing campaigns, and more.' />
                        <LandingServiceCart image={carpenter} heading='Carpentry' text='From furniture to custom woodworking projects, our skilled carpenters bring craftsmanship and quality to every job.' />
                    </div>

                    
                </div>

            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'green',
                color: 'white',
                padding: '60px 10px',
                margin: '70px 10px',
                borderRadius: '10px',
                boxShadow: '2px 2px 5px gray',
            }}>
                <h1 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '20px' }}>
                    Let's talk about our services <br />Contact Us
                </h1>
                <div style={{ display: 'flex', flexDirection: 'column', fontSize: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <img src={phone} alt="Phone" style={{ width: '25px', marginRight: '10px' }} />
                        <span>Call on: 0345 3456721</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <img src={clock} alt="Clock" style={{ width: '25px', marginRight: '10px' }} />
                        <span>Time: 9am to 5pm (Sunday close)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={email} alt="Email" style={{ width: '25px', marginRight: '10px' }} />
                        <span>Email: easylife@gmail.com</span>
                    </div>
                </div>
            </div>
        </>
    );
}










