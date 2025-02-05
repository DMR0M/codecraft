import { Container } from 'react-bootstrap';

import profile from '../assets/profile.jpg'


const AboutPage = () => {
    return (
        <>
            <Container className='text-center text-white p-5'>
                <img 
                    src={profile}
                    alt="dev-picture"
                    className="profile"
                />
                <h5 className="profile-story">
                    Hi there! I am RR the creator of CodeCraft, <br/> 
                    I am a full-time software developer, and a student
                    at <a href='https://www.upliftcodecamp.com/'> Uplift Code Camp</a>. <br/> 
                    I am motivated in learning more about tech and building appealing and useful websites. <br/> 
                    I hope this site helps you through your software development journey whether you're a student or a professional. <br/> 
                    I am looking forward into putting a lot of features in this. <br/> 
                    Thank you for using this site.
                </h5>
            </Container>
        </>
    );
}

export default AboutPage;
