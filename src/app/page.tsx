export default function Home() {
  return (
    <div className="landing-container">
      <div className="landing-content">
        {/* Status Badge */}
        <div className="logo-badge">
          <span className="pulse-dot"></span>
          Active Development
        </div>

        {/* Hero Section */}
        <h1 className="hero-title">
          Emergency Ward<br />Bed Status Monitoring
        </h1>

        <p className="hero-subtitle">
          Real-time digital dashboard for hospital emergency ward management
        </p>

        <p className="hero-description">
          Track bed status with one-click updates, automatic time tracking, and AI-generated daily performance reports for JMCH Medical College & Hospital.
        </p>

        {/* CTA Buttons */}
        <div className="cta-buttons">
          <a
            href="https://github.com/somuyakhandelwal/EWTCS"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View on GitHub
          </a>
          <a
            href="https://github.com/somuyakhandelwal/EWTCS#-getting-started"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            📚 Documentation
          </a>
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🏥</div>
            <h3 className="feature-title">Real-Time Tracking</h3>
            <p className="feature-description">
              Monitor all emergency beds with color-coded status indicators and automatic time tracking.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3 className="feature-title">One-Click Updates</h3>
            <p className="feature-description">
              Nurses can update bed status instantly without typing - simple and intuitive interface.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3 className="feature-title">AI-Powered Reports</h3>
            <p className="feature-description">
              Automated daily summaries with insights on patient flow, bottlenecks, and performance metrics.
            </p>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="status-indicator">
          <span className="pulse-dot"></span>
          MVP in Development - Contributions Welcome
        </div>
      </div>
    </div>
  );
}
