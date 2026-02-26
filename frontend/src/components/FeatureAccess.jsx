import { useAuth } from "../context/AuthContext";

export default function FeatureAccess() {
  const { user } = useAuth();
  const features = user?.features || [];

  if (!features.length) {
    return null;
  }

  return (
    <section className="card section-card section-wrap">
      <h2 className="section-title">Your Access Features</h2>
      <p className="section-subtitle">
        Enabled permissions for your account ({user.role}).
      </p>
      <div className="pill-row">
        {features.map((feature) => (
          <span key={feature} className="feature-pill feature-access-pill">
            {feature}
          </span>
        ))}
      </div>
    </section>
  );
}
