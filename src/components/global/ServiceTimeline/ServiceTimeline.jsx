import './ServiceTimeline.css';

/**
 * ServiceTimeline
 *
 * Mostra i tempi tipici di consegna di un servizio sotto forma di linea
 * temporale orizzontale (verticale su mobile).
 * Ogni step: { phase, title, desc }.
 */
const ServiceTimeline = ({ steps, title = 'Tempi tipici di consegna', subtitle }) => (
  <section className="timeline-section">
    <div className="timeline-header">
      <span className="timeline-tag">// TEMPI //</span>
      <h2 className="timeline-title">{title}</h2>
      {subtitle && <p className="timeline-subtitle">{subtitle}</p>}
    </div>

    <ol className="timeline-list">
      {steps.map((step, i) => (
        <li key={i} className="timeline-step">
          <div className="timeline-step-phase">{step.phase}</div>
          <div className="timeline-step-line" aria-hidden="true" />
          <div className="timeline-step-body">
            <h3 className="timeline-step-title">{step.title}</h3>
            <p className="timeline-step-desc">{step.desc}</p>
          </div>
        </li>
      ))}
    </ol>
  </section>
);

export default ServiceTimeline;
