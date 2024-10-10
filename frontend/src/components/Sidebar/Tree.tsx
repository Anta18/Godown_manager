import React, { useState } from "react";
import { TreeItem } from "../../types";
import { Menu } from "lucide-react";
import TreeNode from "./TreeNode";

interface TreeProps {
  data: TreeItem[];
  onSelect: (item: TreeItem) => void;
  selectedItem: TreeItem | null;
}

const Tree: React.FC<TreeProps> = ({ data, onSelect, selectedItem }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div
      className={`flex h-full ${
        isSidebarOpen ? "w-full" : "w-16"
      } transition-all duration-300 bg-gray-900 text-white shadow-lg`}
    >
      <button
        className="md:hidden p-3 text-white focus:outline-none"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu className="h-6 w-6" />
      </button>
      <div className="overflow-y-auto h-full w-full custom-scrollbar">
        {isSidebarOpen && (
          <h2 className="p-4 text-lg font-bold text-center">Godowns</h2>
        )}
        {data.map((item) => (
          <TreeNode
            key={item._id}
            item={item}
            onSelect={onSelect}
            level={0}
            parentExpanded={true}
            selectedItem={selectedItem}
          />
        ))}
      </div>
    </div>
  );
};

export default Tree;
