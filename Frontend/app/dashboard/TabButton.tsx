import React, { memo } from "react";

const TabButton = memo(
  ({
    id,
    label,
    icon: Icon,
    activeTab,
    onClick,
  }: {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    activeTab: string;
    onClick: (id: string) => void;
  }) => (
    <button
      onClick={() => onClick(id)}
      role="tab"
      aria-selected={activeTab === id}
      aria-pressed={activeTab === id}
      tabIndex={activeTab === id ? 0 : -1}
      className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 ${
        activeTab === id
          ? "bg-green-600 text-white shadow"
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
      }`}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  )
);

TabButton.displayName = "TabButton";
export default TabButton;
