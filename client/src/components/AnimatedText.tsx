import '../styles/AnimatedText.scss';
import React, { useEffect } from 'react';

const AnimatedText: React.FC<AnimatedText> = ({ heading, subText, className }) => {
    useEffect(() => {
        const spanizeLetters = {
            settings: {
                letters: document.querySelectorAll<HTMLElement>('.js-spanize'),
            },
            init: function () {
                this.bindEvents();
            },
            bindEvents: function () {
                this.settings.letters.forEach(letter => {
                    const text = letter.textContent?.trim() || '';
                    const spanizedText = text.split(" ").map(word => {
                        return `<span>${word} </span>`;
                    }).join("");
                    letter.innerHTML = spanizedText;
                });
            },
        };
        spanizeLetters.init();
    }, []);

    return (
        <div className={`animated-text-container ${className}`}>
            <div className='animated-text-wrapper'>
                <h1 className="heading js-spanize">{heading}</h1>
                <hr className="separater" />
                <p className="sub-text js-spanize" dangerouslySetInnerHTML={{__html: subText}}></p>
            </div>
        </div>
    );
};

export default AnimatedText;