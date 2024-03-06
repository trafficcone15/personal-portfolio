import '../styles/BackgroundWaves.scss';

const BackgroundWaves: React.FC<BackgroundWaves> = ({ light, medium, dark, lightest, backgroundColourOne, backgroundColourTwo }) => {
    const waveFillLight = light;
    const waveFillMedium = medium;
    const waveFillDark = dark;
    const waveFillLightest = lightest;

    return (
        <div className="background-waves-container">
           <div className="background-waves-wrapper" style={{ background: `linear-gradient(60deg, ${backgroundColourOne} 0%, ${backgroundColourTwo} 100%)` }}>
                <div className="enable-flex-center">
                    <svg
                        version="1.1"
                        className="logo"
                        baseProfile="tiny"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 500 500"
                        xmlSpace="preserve"
                    >
                        <path
                            fill="#FFFFFF"
                            stroke="#000000"
                            strokeWidth="10"
                            strokeMiterlimit="10"
                            d="M57,283"
                        />
                    </svg>
                </div>
                <div>
                    <svg
                        className="waves"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 24 150 28"
                        preserveAspectRatio="none"
                        shapeRendering="auto"
                    >
                        <defs>
                            <path
                                id="gentle-wave"
                                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                            />
                        </defs>
                        <g className="parallax">
                            <use xlinkHref="#gentle-wave" x="48" y="0" fill={waveFillLight} />
                            <use xlinkHref="#gentle-wave" x="48" y="3" fill={waveFillMedium} />
                            <use xlinkHref="#gentle-wave" x="48" y="5" fill={waveFillDark} />
                            <use xlinkHref="#gentle-wave" x="48" y="7" fill={waveFillLightest} />
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default BackgroundWaves;