import React, { useState, useEffect } from 'react';

const GetSVG: React.FC<GetSVG> = ({ svgName, svgClassName }) => {
    const [svgContent, setSvgContent] = useState<string | null>(null);

    useEffect(() => {
        const fetchSVG = async () => {
            try {
                const svgModule = await import(`../assets/svg-icons/${svgName}.svg`);
                const svgContent = await svgModule.default;
                setSvgContent(svgContent);
            } catch (error) {
                console.error(`Error loading SVG: ${error}`);
                setSvgContent(null);
            }
        };

        fetchSVG();

        return () => {
            setSvgContent(null);
        };
    }, [svgName]);

    return (
        <div className="get-svg-container">
            {svgContent && <img className={svgClassName} src={svgContent} alt={svgName} />}
        </div>
    );
};

export default GetSVG;
