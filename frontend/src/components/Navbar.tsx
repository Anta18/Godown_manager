// src/components/Navbar/Navbar.tsx

import React from "react";

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterType: string;
  onFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  categories: string[]; // New prop for dynamic categories
}

const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  filterType,
  onFilterChange,
  categories, // Destructure the new categories prop
}) => {
  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex items-center justify-between">
      {/* Logo or Title */}
      <div className="text-xl font-bold">Inventory Dashboard</div>

      {/* Search and Filter Controls */}
      <div className="flex items-center space-x-4">
        {/* Search Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search..."
          className="px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Filter Dropdown */}
        <select
          value={filterType}
          onChange={onFilterChange}
          className="px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.length > 0 ? (
            categories.map((category) => (
              <option key={category} value={category}>
                {category === "All" ? "All Categories" : category}
              </option>
            ))
          ) : (
            <option value="All">All Categories</option>
          )}
        </select>
      </div>
    </nav>
  );
};

export default Navbar;
