import { PANEL_ATMOSPHERE, PANEL_DATA_FLOOR } from "@/lib/panelStyles";

interface MomentumPanelAtmosphereProps {
  chillRef: React.RefObject<SVGGElement | null>;
  moderateRef: React.RefObject<SVGGElement | null>;
  chaosRef: React.RefObject<SVGGElement | null>;
}

const CHILL_STREAMS = [188, 206, 224, 242];

const MODERATE_ROWS = [
  { y: 150, offset: 0 },
  { y: 178, offset: 28 },
  { y: 206, offset: 12 },
  { y: 234, offset: 36 },
];

function buildSineWave(
  amplitude: number,
  wavelength: number,
  baseline: number,
  segments = 24,
  width = 1200,
): string {
  const step = width / segments;
  let path = `M 0 ${baseline + Math.sin(0) * amplitude}`;

  for (let index = 1; index <= segments; index += 1) {
    const x = step * index;
    const y = baseline + Math.sin((x / wavelength) * Math.PI * 2) * amplitude;
    path += ` L ${x} ${y}`;
  }

  return path;
}

export function MomentumPanelAtmosphere({
  chillRef,
  moderateRef,
  chaosRef,
}: MomentumPanelAtmosphereProps) {
  const chillWave = buildSineWave(10, 360, 156);
  const moderateWaveA = buildSineWave(14, 180, 132);
  const moderateWaveB = buildSineWave(9, 140, 214);

  return (
    <div className={PANEL_ATMOSPHERE} aria-hidden>
      <div className={PANEL_DATA_FLOOR}>
        <svg
          className="h-full w-full"
          viewBox="0 0 1200 250"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="1200" height="250" fill="rgb(100 116 139 / 0.015)" />

          <g ref={chillRef} className="momentum-wire-chill">
            {CHILL_STREAMS.map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="1200"
                y2={y}
                className="panel-wireframe-glow panel-wireframe-glow--cyan"
                strokeWidth="0.65"
              />
            ))}
            <path
              d={chillWave}
              className="momentum-chill-wave panel-wireframe-glow panel-wireframe-glow--cyan"
              strokeWidth="0.85"
            />
          </g>

          <g ref={moderateRef} className="momentum-wire-moderate opacity-0">
            {MODERATE_ROWS.map(({ y, offset }) => (
              <g key={y}>
                <line
                  x1={offset}
                  y1={y}
                  x2="1200"
                  y2={y}
                  className="panel-wireframe-glow panel-wireframe-glow--amber"
                  strokeWidth="0.55"
                />
                <line
                  x1="0"
                  y1={y + 10}
                  x2="1200"
                  y2={y + 10}
                  className="panel-wireframe-muted"
                  strokeWidth="0.45"
                />
              </g>
            ))}
            {[120, 360, 600, 840, 1080].map((x) => (
              <line
                key={x}
                x1={x}
                y1="70"
                x2={x - 24}
                y2="250"
                className="panel-wireframe-glow panel-wireframe-glow--amber"
                strokeWidth="0.5"
              />
            ))}
            <path
              d={moderateWaveA}
              className="panel-wireframe-glow panel-wireframe-glow--amber"
              strokeWidth="0.7"
            />
            <path
              d={moderateWaveB}
              className="panel-wireframe-glow panel-wireframe-glow--amber"
              strokeWidth="0.6"
            />
          </g>

          <g ref={chaosRef} className="momentum-wire-chaos opacity-0">
            {Array.from({ length: 31 }, (_, index) => {
              const x = 12 + index * 38;
              return (
                <line
                  key={`v-${x}`}
                  x1={x}
                  y1="48"
                  x2={x + (index % 2 === 0 ? 10 : -10)}
                  y2="250"
                  className="panel-wireframe-glow panel-wireframe-glow--red"
                  strokeWidth="0.4"
                />
              );
            })}
            {Array.from({ length: 14 }, (_, index) => {
              const y = 118 + index * 10;
              return (
                <line
                  key={`h-${y}`}
                  x1="0"
                  y1={y}
                  x2="1200"
                  y2={y + (index % 2 === 0 ? 6 : -6)}
                  className="panel-wireframe-glow panel-wireframe-glow--red"
                  strokeWidth="0.35"
                />
              );
            })}
            {Array.from({ length: 16 }, (_, index) => {
              const x = 40 + index * 72;
              const peak = 108 - (index % 4) * 16;
              const spike = `M ${x} 250 L ${x + 14} ${peak} L ${x + 28} 250`;
              return (
                <path
                  key={`spike-${x}`}
                  d={spike}
                  className="panel-wireframe-glow panel-wireframe-glow--red"
                  strokeWidth="0.5"
                />
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
}
