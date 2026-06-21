import type gsap from "gsap";

export interface PanelAnimationProps {
  panelRef: React.RefObject<HTMLDivElement | null>;
  containerAnimation?: gsap.core.Tween | null;
}
