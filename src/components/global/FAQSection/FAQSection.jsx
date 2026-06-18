import './FAQSection.css';

/**
 * FAQSection
 *
 * FAQ a soffietto, basata su <details>/<summary> nativi: accessibilita'
 * per default (keyboard + screen reader) e zero dipendenze JS.
 * Ogni item: { q, a }.
 */
const FAQSection = ({ items, title = 'Domande frequenti', subtitle }) => (
  <section className="faq-section">
    <div className="faq-header">
      <span className="faq-tag">// FAQ //</span>
      <h2 className="faq-title">{title}</h2>
      {subtitle && <p className="faq-subtitle">{subtitle}</p>}
    </div>

    <div className="faq-list">
      {items.map((item, i) => (
        <details key={i} className="faq-item">
          <summary className="faq-question">
            <span className="faq-question-text">{item.q}</span>
            <span className="faq-question-toggle" aria-hidden="true">+</span>
          </summary>
          <div className="faq-answer">
            {Array.isArray(item.a)
              ? item.a.map((p, j) => <p key={j}>{p}</p>)
              : <p>{item.a}</p>}
          </div>
        </details>
      ))}
    </div>
  </section>
);

export default FAQSection;
