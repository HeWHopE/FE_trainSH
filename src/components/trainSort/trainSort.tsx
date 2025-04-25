import React, { useEffect, useState } from "react";

interface SortProps {
  list: string[];
  callback: (params: { label?: string; order?: string }) => void;
  initialValue: { label: string; order: string };
  hideArrows?: boolean;
}

const Sort: React.FC<SortProps> = ({
  list,
  callback,
  initialValue,
  hideArrows,
}) => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [selectLabel, setSelectLabel] = useState<string>(
    initialValue?.label || ""
  );
  const [selectOrder, setSelectOrder] = useState<string>(
    initialValue?.order || ""
  );

  useEffect(() => {
    setShowDropDown(showDropDown);
  }, [showDropDown]);

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  const onClickHandler = (item: string): void => {
    console.log("123");
    setSelectLabel(item);
    callback({ label: item });

    if (selectLabel === item) {
      const newOrder = selectOrder === "asc" ? "desc" : "asc";
      setSelectOrder(newOrder);
      callback({ order: newOrder });
    } else {
      setSelectOrder("asc");
      callback({ order: "asc" });
    }
    setShowDropDown(false);
  };

  return (
    <div className="relative">
      <button
        className={`w-full sm:w-48 px-4 py-2 border rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex justify-between items-center ${
          showDropDown ? "ring-2 ring-indigo-500" : ""
        }`}
        onClick={toggleDropDown}
        aria-expanded={showDropDown}
        aria-label="Sort trains by"
      >
        <span>
          {selectLabel
            ? `Sort by: ${selectLabel}${
                !hideArrows ? ` ${selectOrder === "asc" ? "↑" : "↓"}` : ""
              }`
            : "Sort by"}
        </span>
        <span className="ml-2">▼</span>
      </button>
      {showDropDown && (
        <div className="absolute z-10 w-full sm:w-48 mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          {list.map((label, index) => (
            <div
              key={index}
              onClick={() => onClickHandler(label)}
              className={`px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 cursor-pointer flex justify-between items-center ${
                selectLabel === label ? "bg-indigo-100 font-semibold" : ""
              }`}
            >
              <span>{label}</span>
              {!hideArrows && (
                <span className="flex space-x-1">
                  <span
                    className={`${
                      selectLabel === label && selectOrder === "desc"
                        ? "text-indigo-600"
                        : "text-gray-400"
                    }`}
                  >
                    ↓
                  </span>
                  <span
                    className={`${
                      selectLabel === label && selectOrder === "asc"
                        ? "text-indigo-600"
                        : "text-gray-400"
                    }`}
                  >
                    ↑
                  </span>
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sort;
