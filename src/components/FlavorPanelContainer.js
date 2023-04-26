import { forwardRef } from "react";

const FlavorPanelContainer = forwardRef((props, ref) => {
  return (
    <div onMouseOverCapture={() => props.setStopScrolling(true)} onMouseLeave={() => props.setStopScrolling(false)} ref={ref} className="pokemon-flavor-container">
      {props.children}
    </div>
  );
});

export default FlavorPanelContainer;