type Props = {
  search: string;
  onSearch: (v: string) => void;
  minBedrooms: number;
  onMinBedrooms: (v: number) => void;
  maxPrice: number;
  onMaxPrice: (v: number) => void;
  sort: 'price-asc' | 'price-desc' | 'bedrooms-desc' | 'sqft-desc';
  onSort: (v: 'price-asc' | 'price-desc' | 'bedrooms-desc' | 'sqft-desc') => void;
};

export function Controls({ 
  search, onSearch, 
  minBedrooms, onMinBedrooms, 
  maxPrice, onMaxPrice,
  sort, onSort 
}: Props) {
  return (
    <div className="controls-section">
      <h2 className="controls-title">Search & Filter</h2>
      
      <div className="controls">
        <div className="control-group search-group">
          <label className="control-label">Search</label>
          <input
            className="search-input"
            placeholder="Search properties..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <div className="control-group">
          <label className="control-label">Min Bedrooms</label>
          <select 
            className="bedrooms-select"
            value={minBedrooms}
            onChange={(e) => onMinBedrooms(Number(e.target.value))}
          >
            <option value={0}>Any</option>
            <option value={1}>1+</option>
            <option value={2}>2+</option>
            <option value={3}>3+</option>
            <option value={4}>4+</option>
            <option value={5}>5+</option>
          </select>
        </div>

        <div className="control-group">
          <label className="control-label">Max Price</label>
          <select 
            className="price-select"
            value={maxPrice}
            onChange={(e) => onMaxPrice(Number(e.target.value))}
          >
            <option value={0}>Any</option>
            <option value={200000}>$200k</option>
            <option value={300000}>$300k</option>
            <option value={400000}>$400k</option>
            <option value={500000}>$500k</option>
            <option value={750000}>$750k</option>
            <option value={1000000}>$1M+</option>
          </select>
        </div>

        <div className="control-group">
          <label className="control-label">Sort by</label>
          <select 
            className="sort-select"
            value={sort} 
            onChange={(e) => onSort(e.target.value as 'price-asc' | 'price-desc' | 'bedrooms-desc' | 'sqft-desc')}
          >
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="bedrooms-desc">Most Bedrooms</option>
            <option value="sqft-desc">Largest Size</option>
          </select>
        </div>
      </div>
    </div>
  );
}
