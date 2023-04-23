import { useEffect, useRef } from "react";

const FlavorTextScroll = ({ pokemonFlavorContainer, pokemonFlavor }) => {
  const intervalTimer = useRef(null);
  const timeoutTimer = useRef(null);
  const flavorContainerHeight = pokemonFlavorContainer.current.clientHeight
  const flavorHeight = pokemonFlavor.current.clientHeight
  const heightDifference = flavorHeight - flavorContainerHeight;

  useEffect(() => {
    if (heightDifference > 0) {
      let scrollDown = 0;
      let scrollUp = heightDifference;
      let paused = false;
      timeoutTimer.current = setTimeout(() => {
        intervalTimer.current = setInterval(() => {
          if (!paused) {
            if (scrollDown < heightDifference) {
              scrollDown += 1;
              pokemonFlavorContainer.current.scrollTo({ top: scrollDown, left: 0, behavior: 'smooth'});
              if (scrollDown === heightDifference) {
                scrollUp = heightDifference;
                paused = true;
                timeoutTimer.current = setTimeout(() => {
                  paused = false;
                }, 3000);
                return () => clearTimeout(timeoutTimer.current);
              }
            } else if (scrollDown === heightDifference) {
              scrollUp -= 1;
              pokemonFlavorContainer.current.scrollTo({ top: scrollUp, left: 0, behavior: 'smooth'});
              if (scrollUp === 0) {
                scrollDown = 0;
                paused = true;
                timeoutTimer.current = setTimeout(() => {
                  paused = false;
                }, 3000);
                return () => clearTimeout(timeoutTimer.current);
              }
            }
          }
        }, 75);
      }, 3000);
      return () => {clearInterval(intervalTimer.current); clearTimeout(timeoutTimer.current);};
    }
  }, [pokemonFlavorContainer, heightDifference]);

  return (
    null
  );
};

export default FlavorTextScroll;