import { useMemo, useState } from 'react';
import { properties } from '../data';
import type { Property } from '../types';
import { PropertyCard } from '../components/PropertyCard';
import { Controls } from '../components/Controls';

export function ListPage() {
  const [search, setSearch] = useState('');
  const [minBedrooms, setMinBedrooms] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [sort, setSort] = useState<'price-asc' | 'price-desc' | 'bedrooms-desc' | 'sqft-desc'>('price-asc');

  const filteredAndSorted = useMemo(() => {
    let result: Property[] = properties.filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(search.trim().toLowerCase());
      const matchesBedrooms = p.bedrooms >= minBedrooms;
      const matchesPrice = maxPrice === 0 || p.price <= maxPrice;
      
      return matchesSearch && matchesBedrooms && matchesPrice;
    });

    result = result.sort((a, b) => {
      switch (sort) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'bedrooms-desc': return b.bedrooms - a.bedrooms;
        case 'sqft-desc': return b.sqft - a.sqft;
        default: return 0;
      }
    });
    
    return result;
  }, [search, minBedrooms, maxPrice, sort]);

  const totalProperties = properties.length;
  const averagePrice = Math.round(properties.reduce((sum, p) => sum + p.price, 0) / totalProperties);
  const priceRange = {
    min: Math.min(...properties.map(p => p.price)),
    max: Math.max(...properties.map(p => p.price))
  };

  const clearFilters = () => {
    setSearch('');
    setMinBedrooms(0);
    setMaxPrice(0);
    setSort('price-asc');
  };

  const hasActiveFilters = search || minBedrooms > 0 || maxPrice > 0;

  return (
    <div className="container">
      <div className="hero-section">
        <h1 className="hero-title">Find Your Dream Home</h1>
        <p className="hero-subtitle">
          Discover {totalProperties} premium properties with an average price of ${averagePrice.toLocaleString()}
        </p>
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">{totalProperties}</span>
            <span className="stat-label">Properties</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">${(priceRange.min / 1000).toFixed(0)}k - ${(priceRange.max / 1000).toFixed(0)}k</span>
            <span className="stat-label">Price Range</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{new Set(properties.map(p => p.location)).size}</span>
            <span className="stat-label">Locations</span>
          </div>
        </div>
      </div>

      <Controls
        search={search}
        onSearch={setSearch}
        minBedrooms={minBedrooms}
        onMinBedrooms={setMinBedrooms}
        maxPrice={maxPrice}
        onMaxPrice={setMaxPrice}
        sort={sort}
        onSort={setSort}
      />

      <div className="results-summary">
        <div className="results-info">
          <span className="results-count">
            {filteredAndSorted.length} {filteredAndSorted.length === 1 ? 'property' : 'properties'} found
          </span>
          {hasActiveFilters && (
            <button className="clear-filters" onClick={clearFilters}>
              Clear all filters
            </button>
          )}
        </div>
        {hasActiveFilters && (
          <div className="active-filters">
            {search && <span className="filter-tag">Search: "{search}"</span>}
            {minBedrooms > 0 && <span className="filter-tag">Min {minBedrooms} bedrooms</span>}
            {maxPrice > 0 && <span className="filter-tag">Max ${maxPrice.toLocaleString()}</span>}
          </div>
        )}
      </div>

      {filteredAndSorted.length === 0 ? (
        <div className="empty">No properties found. Try adjusting your filters.</div>
      ) : (
        <div className="grid">
          {filteredAndSorted.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      )}
    </div>
  );
}
