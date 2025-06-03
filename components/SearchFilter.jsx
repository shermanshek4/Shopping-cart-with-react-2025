export default function SearchFilter({ search, setSearch, category, setCategory }) {
    return (
      <div>
        <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="all">All</option>
          <option value="clothing">Clothing</option>
          <option value="footwear">Footwear</option>
        </select>
      </div>
    );
  }