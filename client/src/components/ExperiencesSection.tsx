import { useEffect, useRef } from 'react';
import '../styles/ExperiencesSection.scss';
import { contentForExperience } from '../content/textContent';
import { animateOnScrollTo } from '../utils/generalUtilities';

const ExperiencesSection = () => {
    const hiddenElementsRef = useRef<NodeListOf<HTMLElement> | null>(null);
    const headingRef = useRef<NodeListOf<HTMLElement> | null>(null);

    useEffect(() => {
        hiddenElementsRef.current = document.querySelectorAll('.experience .content .hidden');
        headingRef.current = document.querySelectorAll('h1');
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        animateOnScrollTo(headingRef);
    
        if (!hiddenElementsRef.current) return;
    
        hiddenElementsRef.current.forEach((element) => {
            const rect = element.getBoundingClientRect();
            const bottomOfObject = rect.top + rect.height;
    
            if (window.scrollY + window.innerHeight > bottomOfObject) {
                element.style.transition = 'opacity 1.2s, margin-left 1.2s';
                element.style.opacity = '1';
                element.style.marginLeft = '0';
            }
        });
    };
    

    return (
        <div className='experiences-section-container' id="experiences">
            <section className="experience section-container">
                <div className="content">
                    <h1>Experiences</h1>
                    <ul>
                        {contentForExperience.map((experience, index: number) => (
                            <li key={index}>
                                <div className="experience-content hidden">
                                    <h2>{experience.experience}</h2>
                                    <div className="experience-time">{experience.duration}</div>
                                    <p>{experience.details}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
}

export default ExperiencesSection;