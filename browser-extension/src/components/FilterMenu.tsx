const options = ["All", "Ongoing", "In next 24hrs", "In next 7days"];

const FilterMenu = ({curFilter,updateFilter}: {
    curFilter: string,
    updateFilter: (option:string) => void
}) => {
  return (
    <div className="self-start flex items-center gap-4 flex-wrap">
    {options.map(
      (option) => (
        <button
          key={option}
          onClick={() => updateFilter(option)}
          className={`p-2 text-sm rounded-md ${
            curFilter === option
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-gray-200"
          }`}
        >
          {option}
        </button>
      )
    )}
  </div>
  )
}

export default FilterMenu
