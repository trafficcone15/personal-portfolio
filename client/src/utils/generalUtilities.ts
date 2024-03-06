import { MutableRefObject } from "react";

export const animateOnScrollTo = (animateElement: MutableRefObject<NodeListOf<HTMLElement> | null>) => {
    if (!animateElement.current) return;

    window.addEventListener('scroll', () => {
        animateElement.current?.forEach((element) => {
            const rect = element.getBoundingClientRect();
            const isVisible = (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );

            if (isVisible) {
                element.style.transform = 'translateY(0px) scale(1)';
            }
        });
    });
};
