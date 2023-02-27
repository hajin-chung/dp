export const Spinner = () => {
  const lineNum = 8;
  const lineLength = 32;
  const lineWidth = 24;
  const innerRadius = 64;
  const outerRadius = innerRadius + lineLength;

  return (
    <div aria-label="Loading..." role="status">
      <svg
        class="h-6 w-6 animate-spin stroke-gray-500 dark:stroke-gray-200"
        viewBox="0 0 256 256"
      >
        {new Array(lineNum).fill(1).map((_, i) => {
          const t = (i * 2 * Math.PI) / lineNum;
          return (
            <line
              x1={Math.cos(t) * innerRadius + 128}
              y1={Math.sin(t) * innerRadius + 128}
              x2={Math.cos(t) * outerRadius + 128}
              y2={Math.sin(t) * outerRadius + 128}
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width={lineWidth}
            />
          );
        })}
      </svg>
    </div>
  );
};
