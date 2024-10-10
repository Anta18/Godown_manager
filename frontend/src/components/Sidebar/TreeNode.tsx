import React, { useState } from "react";
import { TreeItem } from "../../types";
import { ChevronDown, ChevronRight, Box } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TreeNodeProps {
  item: TreeItem;
  onSelect: (item: TreeItem) => void;
  level: number;
  parentExpanded: boolean;
  selectedItem: TreeItem | null;
}

const TreeNode: React.FC<TreeNodeProps> = ({
  item,
  onSelect,
  level,
  parentExpanded,
  selectedItem,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    if (item.type === "location") {
      setIsExpanded(!isExpanded);
    } else if (item.type === "item") {
      onSelect(item);
    }
  };

  const isSelected = selectedItem?._id === item._id;
  console.log(selectedItem?._id);
  console.log(item);

  return (
    <div>
      <div
        className={`flex items-center cursor-pointer p-2 transition-colors duration-200 ${
          isSelected
            ? "bg-gray-800 "
            : item.type === "location"
            ? "hover:bg-gray-700"
            : "hover:bg-gray-800"
        } rounded relative`}
        style={{ paddingLeft: `${level * 20}px` }}
        onClick={handleClick}
      >
        {parentExpanded && (
          <div
            className="absolute left-0 top-0 bottom-0 border-l border-gray-600"
            style={{ marginLeft: `${level * 20 - 10}px` }}
          ></div>
        )}
        {item.type === "location" ? (
          hasChildren ? (
            isExpanded ? (
              <ChevronDown className="h-5 w-5 mr-1 text-gray-400 transition-transform duration-200" />
            ) : (
              <ChevronRight className="h-5 w-5 mr-1 text-gray-400 transition-transform duration-200" />
            )
          ) : (
            <span className="h-5 w-5 mr-1" />
          )
        ) : (
          <Box className="h-5 w-5 mr-1 text-blue-400" />
        )}
        <span
          className={`flex-1 ${
            item.type === "item" ? "text-blue-300" : "text-gray-200"
          } font-medium`}
        >
          {item.name}
        </span>
      </div>
      {hasChildren && (
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="overflow-hidden"
            >
              {item.children!.map((child) => (
                <TreeNode
                  key={child._id}
                  item={child}
                  onSelect={onSelect}
                  level={level + 1}
                  parentExpanded={isExpanded}
                  selectedItem={selectedItem}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default TreeNode;
