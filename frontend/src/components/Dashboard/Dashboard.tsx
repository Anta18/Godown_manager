// src/components/Dashboard/Dashboard.tsx

import React, { useState, useEffect } from "react";
import Tree from "../Sidebar/Tree";
import ItemDetails from "./ItemDetails";
import Navbar from "../Navbar"; // Import Navbar
import axiosInstance from "../../api/axiosInstance";
import { TreeItem, Location } from "../../types";
import debounce from "lodash.debounce";

const Dashboard: React.FC = () => {
  const [treeData, setTreeData] = useState<TreeItem[]>([]);
  const [filteredTreeData, setFilteredTreeData] = useState<TreeItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<TreeItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // States for search and filters
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("All");
  const [categories, setCategories] = useState<string[]>(["All"]);

  useEffect(() => {
    // Helper function to recursively collect categories
    const collectCategories = (items: TreeItem[], categorySet: Set<string>) => {
      items.forEach((item) => {
        if (item.type === "item" && item.itemDetails?.category) {
          categorySet.add(item.itemDetails.category);
        }
        if (item.children) {
          collectCategories(item.children, categorySet);
        }
      });
    };

    // Fetch tree data from backend
    const fetchTreeData = async () => {
      try {
        const response = await axiosInstance.get("/godown"); // Adjusted endpoint
        const locations: Location[] = response.data;

        // Convert Location[] to TreeItem[]
        const convertLocationsToTreeItems = (
          locations: Location[]
        ): TreeItem[] => {
          return locations.map(
            (loc): TreeItem => ({
              _id: loc._id,
              name: loc.name,
              type: "location",
              isSubGodown: !(loc.subGodowns && loc.subGodowns.length > 0),
              children: [
                ...(loc.subGodowns
                  ? convertLocationsToTreeItems(loc.subGodowns)
                  : []),
                ...(loc.items
                  ? loc.items.map(
                      (item): TreeItem => ({
                        _id: item._id,
                        name: item.name,
                        type: "item",
                        itemDetails: item,
                      })
                    )
                  : []),
              ],
            })
          );
        };

        const treeItems = convertLocationsToTreeItems(locations);
        setTreeData(treeItems);
        setFilteredTreeData(treeItems); // Initialize filtered data

        // Collect unique categories
        const categorySet = new Set<string>();
        collectCategories(treeItems, categorySet);
        setCategories(["All", ...Array.from(categorySet).sort()]);
      } catch (error) {
        console.error("Error fetching tree data:", error);
        setError("Failed to load tree data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTreeData();
  }, []);

  // Debounced search handler to optimize performance
  const handleSearch = debounce((query: string) => {
    setSearchQuery(query);
  }, 300);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
  };

  // Effect to filter tree data based on searchQuery and filterType
  useEffect(() => {
    if (!searchQuery && filterType === "All") {
      setFilteredTreeData(treeData);
      return;
    }

    const filterTree = (items: TreeItem[]): TreeItem[] => {
      return items
        .map((item) => {
          if (item.type === "item") {
            const matchesSearch =
              item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (item.itemDetails &&
                Object.values(item.itemDetails.attributes || {}).some((attr) =>
                  String(attr).toLowerCase().includes(searchQuery.toLowerCase())
                ));
            const matchesFilter =
              filterType === "All" || item.itemDetails?.category === filterType;
            if (matchesSearch && matchesFilter) {
              return item;
            }
            return null;
          } else if (item.type === "location" && item.children) {
            const filteredChildren = filterTree(item.children);
            if (filteredChildren.length > 0) {
              return { ...item, children: filteredChildren };
            }
            return null;
          }
          return null;
        })
        .filter((item): item is TreeItem => item !== null);
    };

    const newFilteredData = filterTree(treeData);
    setFilteredTreeData(newFilteredData);
  }, [searchQuery, filterType, treeData]);

  const handleSelect = (item: TreeItem) => {
    setSelectedItem(item);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-black">
      {/* Navbar */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
        filterType={filterType}
        onFilterChange={handleFilterChange}
        categories={categories} // Pass categories here
      />

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-black border-r overflow-y-auto">
          <Tree
            data={filteredTreeData}
            onSelect={handleSelect}
            selectedItem={selectedItem}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 bg-black  ">
          <ItemDetails item={selectedItem} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
