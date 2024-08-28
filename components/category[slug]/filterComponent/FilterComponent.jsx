import React, { useState, useEffect } from "react";

export const FilterComponent = ({ filterCategories, handleCheckboxChange }) => {
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    if (filterCategories && filterCategories.length > 0) {
      setFilters(filterCategories);
    }
  }, [filterCategories]);

  console.log("Filters state:", filters);

  const onCheckboxChange = (categoryIndex, itemIndex) => {
    // Update the filter locally
    const updatedFilters = filters.map((category, catIdx) => {
      if (catIdx === categoryIndex) {
        const updatedItems = category.filter_items.map((item, itemIdx) => {
          if (itemIdx === itemIndex) {
            return { ...item, is_in_filter: !item.is_in_filter };
          }
          return item;
        });
        return { ...category, filter_items: updatedItems };
      }
      return category;
    });

    setFilters(updatedFilters);

    // Call the parent handler to fetch new data
    handleCheckboxChange(categoryIndex, itemIndex);
  };

  if (!filters || filters.length === 0) {
    return <div>No filters available</div>;
  }

  return (
    <div>
      {filters.map((category, catIdx) => (
        <div key={catIdx}>
          <h4>{category.title}</h4>
          <ul>
            {category.filter_items.map((item, itemIdx) => (
              <li key={itemIdx}>
                <label>
                  <input
                    type="checkbox"
                    checked={item.is_in_filter}
                    onChange={() => onCheckboxChange(catIdx, itemIdx)}
                  />
                  {item.name} ({item.items_count})
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
