type CircleIconProps = {
  color: string;
  size: number;
};

export default function CircleIcon({ color, size }: CircleIconProps) {
  return (
    <>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox={`0 0 ${size + 2} ${size + 2}`}
      >
        <circle
          cx={size / 2 + 1}
          cy={size / 2 + 1}
          r={size / 2}
          fill={color}
          stroke='black'
          strokeWidth={0.5}
        />
      </svg>
    </>
  );
}
