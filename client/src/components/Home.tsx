import '../styles/Home.scss';
import HeroSection from './HeroSection';
import ExperiencesSection from './ExperiencesSection';
import Navbar from './Navbar';
import AboutMe from './AboutMe';
import Carousel from './Carousel';
import ContactUs from './ContactUs';
import ParticleBoardSection from './ParticleBoardSection';

const Home = () => {
    return (
        <div className={`home-container`}>
            <Navbar />
            <HeroSection />
            <AboutMe />
            <ExperiencesSection />
            <Carousel />
            <ParticleBoardSection />
            <ContactUs />
        </div>
    );
}

export default Home;