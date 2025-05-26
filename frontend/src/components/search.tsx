const Search = ({
  search,
  setSearch,
  handleSearch,
}: {
  search: string;
  setSearch: (search: string) => void;
  handleSearch: () => void;
}) => {
  return (
    <div className="flex items-center justify-between mb-4 gap-2">
      <input
        type="text"
        placeholder="Search recipes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white rounded px-4 py-2"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
