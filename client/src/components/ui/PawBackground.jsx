export default function PawBackground() {
  return (
    <div className="fixed inset-0 -z-10 opacity-[0.03] pointer-events-none overflow-hidden">
      <svg width="100%" height="100%">
        <defs>
          <pattern id="paw-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <g transform="scale(0.5)">
              <path fill="currentColor" d="M12 21a9 9 0 0 0 9-9c0-5-3.5-9-9-9s-9 4-9 9a9 9 0 0 0 9 9z"/>
              <path fill="currentColor" d="M8.5 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
              <path fill="currentColor" d="M15.5 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
              <path fill="currentColor" d="M12 15a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
              <path fill="currentColor" d="M12 15v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </g>
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#paw-pattern)" className="text-terracotta" />
      </svg>
    </div>
  );
}
