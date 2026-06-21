import { PANEL_ATMOSPHERE, PANEL_WIREFRAME_ACCENT } from "@/lib/panelStyles";

const LEFT_NODES: [number, number][] = [
  [90, 140],
  [110, 300],
  [80, 460],
  [130, 620],
];

const RIGHT_NODES: [number, number][] = [
  [1110, 160],
  [1090, 320],
  [1120, 480],
  [1070, 640],
];

function connectNodes(nodes: [number, number][], keyPrefix: string) {
  return nodes.slice(0, -1).map((node, index) => {
    const next = nodes[index + 1];
    return (
      <line
        key={`${keyPrefix}-${index}`}
        x1={node[0]}
        y1={node[1]}
        x2={next[0]}
        y2={next[1]}
      />
    );
  });
}

export function ALOSplitPanelAtmosphere() {
  return (
    <div className={PANEL_ATMOSPHERE} aria-hidden>
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6ee7b7] opacity-[0.07] blur-[120px] max-lg:top-[58%]" />

      <svg
        className={`${PANEL_WIREFRAME_ACCENT} inset-y-0 left-0 w-[min(22vw,280px)]`}
        viewBox="0 0 280 800"
        preserveAspectRatio="xMinYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="panel-wireframe-muted" strokeWidth="0.5">
          <line x1="0" y1="180" x2="280" y2="180" />
          <line x1="0" y1="380" x2="280" y2="380" />
          <line x1="0" y1="580" x2="280" y2="580" />
          <line x1="70" y1="0" x2="70" y2="800" />
          <line x1="180" y1="0" x2="180" y2="800" />
        </g>
        <g className="panel-wireframe-muted" strokeWidth="0.85">
          {connectNodes(LEFT_NODES, "left-muted")}
        </g>
        <g className="panel-wireframe-glow panel-wireframe-glow--mint" strokeWidth="0.75">
          {connectNodes(LEFT_NODES, "left-glow")}
        </g>
        {LEFT_NODES.map(([cx, cy], index) => (
          <g key={`left-${index}`} className="alosplit-network-node">
            <circle cx={cx} cy={cy} r="9" className="panel-wireframe-muted" strokeWidth="1" />
            <circle
              cx={cx}
              cy={cy}
              r="9"
              className="panel-wireframe-glow panel-wireframe-glow--mint"
              strokeWidth="0.65"
            />
            <circle cx={cx} cy={cy} r="2.5" fill="var(--neon-mint)" fillOpacity="0.15" />
          </g>
        ))}
      </svg>

      <svg
        className={`${PANEL_WIREFRAME_ACCENT} inset-y-0 right-0 w-[min(22vw,280px)]`}
        viewBox="0 0 280 800"
        preserveAspectRatio="xMaxYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="panel-wireframe-muted" strokeWidth="0.5">
          <line x1="0" y1="200" x2="280" y2="200" />
          <line x1="0" y1="400" x2="280" y2="400" />
          <line x1="0" y1="600" x2="280" y2="600" />
          <line x1="100" y1="0" x2="100" y2="800" />
          <line x1="210" y1="0" x2="210" y2="800" />
        </g>
        <g className="panel-wireframe-muted" strokeWidth="0.85">
          {connectNodes(
            RIGHT_NODES.map(([x, y]) => [x - 920, y] as [number, number]),
            "right-muted",
          )}
        </g>
        <g className="panel-wireframe-glow panel-wireframe-glow--mint" strokeWidth="0.75">
          {connectNodes(
            RIGHT_NODES.map(([x, y]) => [x - 920, y] as [number, number]),
            "right-glow",
          )}
        </g>
        {RIGHT_NODES.map(([cx, cy], index) => (
          <g key={`right-${index}`} className="alosplit-network-node">
            <circle
              cx={cx - 920}
              cy={cy}
              r="9"
              className="panel-wireframe-muted"
              strokeWidth="1"
            />
            <circle
              cx={cx - 920}
              cy={cy}
              r="9"
              className="panel-wireframe-glow panel-wireframe-glow--mint"
              strokeWidth="0.65"
            />
            <circle
              cx={cx - 920}
              cy={cy}
              r="2.5"
              fill="var(--neon-mint)"
              fillOpacity="0.15"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
