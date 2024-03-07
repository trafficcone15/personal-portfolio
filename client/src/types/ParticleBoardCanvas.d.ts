type ParticleBoardCanvas = {
    particles: Paticle[];
    showLines: boolean;
    particleBoardWidth: number;
    particleBoardHeight: number;
    svgRef: Ref;
    setIsCanvasLoaded: (boolean) => void;
}