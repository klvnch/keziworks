import {
  F1_CIRCUIT_SECTOR_PATH,
  F1_CIRCUIT_TRACK_PATH,
} from "@/lib/f1CircuitPath";
import { PANEL_ATMOSPHERE, PANEL_WIREFRAME_ACCENT } from "@/lib/panelStyles";

export function F1PanelAtmosphere() {
  return (
    <div className={PANEL_ATMOSPHERE} aria-hidden>
      <svg
        className={`${PANEL_WIREFRAME_ACCENT} top-[-10%] right-[-5%] h-[min(48vh,420px)] w-[min(50vw,580px)]`}
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMaxYMin slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="f1-blueprint-grid"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 48 0 L 0 0 0 48"
              className="panel-wireframe-muted"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="1200" height="800" fill="url(#f1-blueprint-grid)" />

        <path
          d={F1_CIRCUIT_TRACK_PATH}
          className="panel-wireframe-muted"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d={F1_CIRCUIT_TRACK_PATH}
          className="panel-wireframe-glow panel-wireframe-glow--cyan"
          strokeWidth="1.75"
          strokeLinecap="round"
        />

        <path
          d={F1_CIRCUIT_SECTOR_PATH}
          className="panel-wireframe-muted"
          strokeWidth="1.5"
          strokeDasharray="8 6"
          strokeLinecap="round"
        />
        <path
          d={F1_CIRCUIT_SECTOR_PATH}
          className="panel-wireframe-glow panel-wireframe-glow--cyan"
          strokeWidth="1.25"
          strokeDasharray="8 6"
          strokeLinecap="round"
        />

        <circle cx="620" cy="280" r="6" className="panel-wireframe-muted" strokeWidth="1" />
        <circle cx="880" cy="340" r="6" className="panel-wireframe-muted" strokeWidth="1" />
        <circle cx="1020" cy="310" r="5" className="panel-wireframe-glow panel-wireframe-glow--cyan" strokeWidth="0.75" />
      </svg>

      <svg
        className={`${PANEL_WIREFRAME_ACCENT} bottom-[-8%] left-[-6%] h-[min(32vh,260px)] w-[min(36vw,420px)]`}
        viewBox="0 0 600 400"
        preserveAspectRatio="xMinYMax slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 40 360 C 120 320, 200 280, 320 260 S 480 240, 560 220"
          className="panel-wireframe-muted"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M 40 360 C 120 320, 200 280, 320 260 S 480 240, 560 220"
          className="panel-wireframe-glow panel-wireframe-glow--cyan"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
