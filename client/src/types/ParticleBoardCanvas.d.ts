type ParticleBoardCanvas = {
    particles: Paticle[];
    showLines: boolean;
    particleBoardWidth: number;
    particleBoardHeight: number;
    svgContainerRef: Ref;
    onParticlesRendered: (hasBeenRendered: boolean) => void;
}