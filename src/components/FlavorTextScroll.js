import { useEffect, useRef, useState } from "react";

const FlavorTextScroll = ({ pokemonFlavorContainer, pokemonFlavor, type}) => {
  const intervalTimer = useRef(null);
  const timeoutTimer = useRef(null);
  const [flavorContainerHeight, setFlavorContainerHeight] = useState(null);
  const [flavorHeight, setFlavorHeight] = useState(null);
  const [heightDifference, setHeightDifference] = useState(null);
  // const heightDifference = flavorHeight - flavorContainerHeight;
  console.log(heightDifference);
  console.log(flavorContainerHeight);
  console.log(flavorHeight);
  console.log(type);
  // console.log(pokemonFlavorContainer.clientHeight);
  console.log(pokemonFlavor);

  useEffect(() => {
    if (pokemonFlavorContainer) {
      setFlavorContainerHeight(pokemonFlavorContainer.clientHeight);
      pokemonFlavorContainer.scrollTo(0, 0)
    }
    if (pokemonFlavor) {
      setFlavorHeight(pokemonFlavor.scrollHeight);
    }
  }, [pokemonFlavor, pokemonFlavorContainer, type])

  useEffect(() => {
    if (pokemonFlavorContainer) {
      setHeightDifference(flavorHeight - flavorContainerHeight);
    }
  }, [flavorHeight, flavorContainerHeight, pokemonFlavorContainer, pokemonFlavor, type])

  const speed = (type) => {
    switch (type) {
      case 'flavor':
        return 75;
      case 'moves':
        return 25;
      case 'stats':
        return 50
      default:
        return 75
    }  
  };

  useEffect(() => {
    pokemonFlavorContainer.scrollTo(0, 0);
    clearInterval(intervalTimer.current);
    if (heightDifference > 0) {
      let scrollDown = 0;
      let scrollUp = heightDifference;
      let paused = false;
      timeoutTimer.current = setTimeout(() => {
        intervalTimer.current = setInterval(() => {
          if (!paused) {
            if (scrollDown < heightDifference) {
              scrollDown += 1;
              pokemonFlavorContainer.scrollTo({ top: scrollDown, left: 0, behavior: 'smooth'});
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
              pokemonFlavorContainer.scrollTo({ top: scrollUp, left: 0, behavior: 'smooth'});
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
        }, speed(type));
      }, 3000);
      return () => {clearInterval(intervalTimer.current); clearTimeout(timeoutTimer.current);};
    }
  }, [pokemonFlavorContainer, heightDifference, type]);

  return (
    null
  );
};

export default FlavorTextScroll;