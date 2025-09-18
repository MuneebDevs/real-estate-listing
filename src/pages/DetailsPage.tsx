import { useParams, Link } from 'react-router-dom';
import { properties } from '../data';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart, CartesianGrid } from 'recharts';
import { MapView } from '../components/MapView';

export function DetailsPage() {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);
  const property = properties.find((p) => p.id === numericId);

  if (!property) {
    return (
      <div className="container">
        <p>Property not found.</p>
        <Link to="/">Back to list</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <Link to="/" className="back-link">← Back to Listings</Link>
      
      <div className="property-hero">
        <img src={property.image} alt={property.title} className="hero-image" />
        <div className="hero-overlay">
          <h1 className="hero-title">{property.title}</h1>
          <p className="hero-price">${property.price.toLocaleString()}</p>
        </div>
      </div>

      <div className="property-details">
        <div className="main-content">
          <div className="property-info">
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Bedrooms</span>
                <span className="info-value">{property.bedrooms}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Bathrooms</span>
                <span className="info-value">{property.bathrooms}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Square Feet</span>
                <span className="info-value">{property.sqft.toLocaleString()}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Year Built</span>
                <span className="info-value">{property.yearBuilt}</span>
              </div>
            </div>

            <div className="description-section">
              <h3>Description</h3>
              <p>{property.description}</p>
            </div>

            <div className="features-section">
              <h3>Features</h3>
              <div className="features-grid">
                {property.features.map((feature, index) => (
                  <span key={index} className="feature-tag">{feature}</span>
                ))}
              </div>
            </div>
          </div>

          {property.priceHistory && property.priceHistory.length > 0 && (
            <div className="chart-section">
              <h3>Price History</h3>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={property.priceHistory} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <defs>
                      <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12, fill: '#6B7280' }}
                      tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: '#6B7280' }} 
                      tickFormatter={(v) => `$${v / 1000}k`}
                    />
                    <Tooltip 
                      formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']}
                      labelFormatter={(value) => new Date(value).toLocaleDateString()}
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      fill="url(#priceGradient)"
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          <div className="map-section">
            <h3>Location</h3>
            <MapView 
              properties={properties} 
              selectedProperty={property} 
              height="400px" 
              showLocationButton={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}