import { Link } from 'react-router-dom';
import type { Property } from '../types';

type Props = {
  property: Property;
};

export function PropertyCard({ property }: Props) {
  return (
    <Link
      to={`/property/${property.id}`}
      className="property-card"
      style={{ textDecoration: 'none', color: 'inherit' }}
      aria-label={`View details for ${property.title}`}
    >
      <div className="card">
        <img src={property.thumbnail} alt={property.title} className="card-image" />
        <div className="card-body">
          <h3 className="card-title">{property.title}</h3>
          <p className="card-price">${property.price.toLocaleString()}</p>
          <p className="card-meta">{property.bedrooms} beds • {property.bathrooms} baths • {property.sqft.toLocaleString()} sqft</p>
          <p className="card-location">{property.location}</p>
        </div>
      </div>
    </Link>
  );
}
