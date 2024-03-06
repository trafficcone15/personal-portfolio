import { MutableRefObject } from "react";

export const animateOnScrollTo = (animateElement: MutableRefObject<NodeListOf<HTMLElement> | null>) => {
    if (!animateElement.current) return;

    const windowHeight = window.innerHeight;
        const bottomOfWindow = window.scrollY + windowHeight;

        animateElement.current.forEach((element) => {
            const rect = element.getBoundingClientRect();
            const bottomOfObject = rect.top + rect.height;

            if (bottomOfWindow > bottomOfObject) {
                element.style.transform = 'translateY(0px) scale(1)';
            }
        });
  };