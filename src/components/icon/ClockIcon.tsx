interface ClockIconProps {
  color?: string;
  className?: string;
}

const ClockIcon: React.FC<ClockIconProps> = ({
  color = "currentColor",
  className = "",
}) => {
  return (
    <svg
      className={`w-4 h-4 shrink-0 ${className}`}
      fill="none"
      stroke={color}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

export default ClockIcon;