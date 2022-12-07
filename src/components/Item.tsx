interface ItemProps {
  children: React.ReactNode;
  borderColor?: string;
  className?: string;
}

export default function Item({
  children,
  borderColor = "",
  className = "",
}: ItemProps) {
  const bColor = borderColor ?? "border-gray-400";
  return (
    <div
      className={`bg-white p-5 border-2 border-solid ${bColor} ${className}`}
    >
      {children}
    </div>
  );
}
