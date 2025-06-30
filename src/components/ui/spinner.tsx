export function Spinner({
  size = 48,
  color,
  className
}: {
  size?: number,
  color?: string,
  className?: string
}) {
  return (
    <span className={className} style={{
      width: `${size}px`,
      height: `${size}px`,
      border: `5px solid ${color || "#ccc"}`,
      borderBottomColor: "transparent",
      borderRadius: "50%",
      display: "inline-block",
      boxSizing: "border-box",
      animation: "rotation 1s linear infinite",
    }}></span>
  )
}