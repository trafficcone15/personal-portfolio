import $ from "jquery";
import Button from '@mui/material/Button';
import '../styles/Carousel.scss';
import a4CommunityPic from '../assets/images/a4-front-page.jpg';
import insightsPic from '../assets/images/insights-tool-front-page.png';
import temproPic from '../assets/images/tempro-front-page.jpg';
import incomeRelatedRentPic from '../assets/images/income-related-rent-calculator.jpg';
import incomeTaxCalculatorPic from '../assets/images/income-tax-calculator-python.jpg';
import kjConverterPic from '../assets/images/kj-calorie-converter.jpg';
import electricityBillPic from '../assets/images/electricity-bill-calculator.png';
import { useEffect, useRef, useState } from "react";
import { contentForCarousel } from "../content/textContent";
import GetSVG from "./GetSVG";
import { animateOnScrollTo } from "../utils/generalUtilities";

const Carousel: React.FC = () => {
    const defaultDescription = contentForCarousel["TEMPRO Website"];
    const [descriptionHeader, setDescriptionHeader] = useState<string>(defaultDescription.descriptionHeader);
    const [descriptionText, setDescriptionText] = useState<string>(defaultDescription.descriptionText);
    const [skillIcons, setskillIcons] = useState<string[]>(defaultDescription.skillIcons);
    const [iconAnimationKey, setIconAnimationKey] = useState(0);
    const hiddenElementsRef = useRef<NodeListOf<HTMLElement> | null>(null);

    useEffect(() => {
        hiddenElementsRef.current = document.querySelectorAll('h1, .carousel-description');
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        animateOnScrollTo(hiddenElementsRef);
    };

    const moveToSelected = (event: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>) => {
        const elementTrigger = (event.currentTarget as HTMLElement).className;

        let selectedCarouselItem;
        if (elementTrigger.includes("next")) {
            selectedCarouselItem = $(".selected").next();
        } else if (elementTrigger.includes("previous")) {
            selectedCarouselItem = $(".selected").prev();
        }

        if (!selectedCarouselItem) 
            return;

        // Fallback for when there are no more items in the direction
        if (!selectedCarouselItem.length) {
            if (elementTrigger.includes("next")) {
                selectedCarouselItem = $(".carousel div:first");
            } else if (elementTrigger.includes("previous")) {
                selectedCarouselItem = $(".carousel div:last");
            }
        }

        // Reset all classes
        $(".carousel div").removeClass("selected next previous next-right-second previous-left-second hide-left hide-right");

        // Assign new classes
        selectedCarouselItem.addClass("selected");
        selectedCarouselItem.next().addClass("next");
        selectedCarouselItem.next().next().addClass("next-right-second").nextAll().addClass("hide-right");
        selectedCarouselItem.prev().addClass("previous");
        selectedCarouselItem.prev().prev().addClass("previous-left-second").prevAll().addClass("hide-left");

        // Update description and skill icons
        const selectedImageAltTag = selectedCarouselItem.find("img").attr("alt");
        const selectedDescription = contentForCarousel[selectedImageAltTag as keyof typeof contentForCarousel];

        if (selectedDescription) {
            setDescriptionHeader(selectedDescription.descriptionHeader);
            setDescriptionText(selectedDescription.descriptionText);
            setskillIcons(selectedDescription.skillIcons);
        } else {
            setDescriptionHeader("");
            setDescriptionText("");
            setskillIcons([]);
        }

        setIconAnimationKey(prevKey => prevKey + 1);
    };

    return (
        <div className="carousel-container section-container" id="projects">
            <h1>
                Projects
            </h1>
            <div className='carousel-wrapper' id="carousel">
                <div className="carousel">
                    <div className="hide-left" onClick={moveToSelected}>
                        <img src={kjConverterPic} alt='Kj to Calorie Converter' />
                    </div>

                    <div className="previous-left-second" onClick={moveToSelected}>
                        <img src={incomeRelatedRentPic} alt='Income Related Rent App' />
                    </div>

                    <div className="previous" onClick={moveToSelected}>
                        <img src={a4CommunityPic} alt='A4 Community Website' />
                    </div>

                    <div className="selected" onClick={moveToSelected}>
                        <img src={temproPic} alt='TEMPRO Website' />
                    </div>

                    <div className="next" onClick={moveToSelected}>
                        <img src={insightsPic} alt='Insights Tool' />
                    </div>

                    <div className="next-right-second" onClick={moveToSelected}>
                        <img src={incomeTaxCalculatorPic} alt='Income Tax Calculator Python' />
                    </div>

                    <div className="hide-right" onClick={moveToSelected}>
                        <img src={electricityBillPic} alt='Electricity Bill Calculator Python' />
                    </div>
                </div>
                <div className="buttons">
                    <Button id="previous-button" variant="contained" color="warning" className='previous' onClick={moveToSelected}>
                        Previous
                    </Button>
                    <Button id="next-button" variant="contained" color="warning" className='next' onClick={moveToSelected}>
                        Next
                    </Button>
                </div>
            </div>
            <div className="descriptions">
                <h2>
                    {descriptionHeader}
                </h2>
                <div className="carousel-description" dangerouslySetInnerHTML={{ __html: descriptionText }}>
                </div>
                <div className="icon-container" key={iconAnimationKey}>
                    {skillIcons.map((skill, index: number) => (
                        <GetSVG key={index} svgName={skill} svgClassName='icons' />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carousel;