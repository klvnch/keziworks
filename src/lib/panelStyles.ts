/** Shared ultra-dark canvas + wireframe glow utilities for showcase panels */

export const SHOWCASE_PANEL =
  "showcase-panel relative flex h-auto min-h-[100dvh] w-full flex-shrink-0 flex-col justify-center overflow-hidden px-6 py-16 md:h-screen md:w-screen md:px-12 md:pt-24 md:pb-12 lg:px-24";

export const PANEL_INNER =
  "mx-auto flex h-full w-full max-w-7xl min-h-0 flex-col justify-center";

export const PANEL_SPLIT_GRID =
  "grid min-h-0 grid-cols-1 items-center gap-8 md:gap-10 xl:grid-cols-2 xl:gap-14";

export const PANEL_COPY_COLUMN =
  "flex min-h-0 shrink-0 flex-col justify-center xl:pr-4";

export const PANEL_ASSET_COLUMN =
  "flex min-h-0 w-full items-center justify-center xl:justify-end";

export const PANEL_ASSET_INNER =
  "w-full max-w-[300px] md:max-w-[320px] xl:max-w-none";

/** Absolute-positioned atmosphere layer shell — sits behind panel content */
export const PANEL_ATMOSPHERE =
  "pointer-events-none absolute inset-0 overflow-hidden";

/** Full-bleed SVG wireframe layer */
export const PANEL_WIREFRAME_SVG =
  "absolute inset-0 h-full w-full";

/** Edge-framed accent SVG — keeps wireframes off the content core */
export const PANEL_WIREFRAME_ACCENT =
  "pointer-events-none absolute overflow-hidden";

/** Bottom-anchored data-floor strip for stateful wave backgrounds */
export const PANEL_DATA_FLOOR =
  "pointer-events-none absolute bottom-0 left-0 h-[250px] w-full overflow-hidden";
