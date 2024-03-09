type ParticleBoardCanvas = {
    particles: Paticle[];
    showLines: boolean;
    particleBoardWidth: number;
    particleBoardHeight: number;
    svgContainerRef: Ref;
    particleSpeedFactor: number;
    onParticlesRendered: (hasBeenRendered: boolean) => void;
}