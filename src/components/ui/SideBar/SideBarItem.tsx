type alignSide = "left" | "right";

interface SideBarItemProps {
  label: string;
  alignIcon?: alignSide;
  icon?: React.ReactNode;
  onItemClick: () => void;
}

const SideBarItem = ({
  label,
  alignIcon = "left",
  icon,
  onItemClick,
}: SideBarItemProps) => {
  return (
    <div
      onClick={onItemClick}
      className="rounded-lg border border-transparent cursor-pointer bg-[hsl(24,31%,37%)] text-[hsl(40,15%,95%)] hover:shadow-lg"
    >
      <div className="flex items-center gap-3 p-4">
        {icon && alignIcon === "left" && <span>{icon}</span>}
        <span className="flex-1">{label}</span>
        {icon && alignIcon === "right" && <span>{icon}</span>}
      </div>
    </div>
  );
};

export default SideBarItem;
