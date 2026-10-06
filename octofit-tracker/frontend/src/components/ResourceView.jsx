import { useEffect, useState } from 'react'
import { normalizeCollection } from '../api'

export default function ResourceView({ title, eyebrow, endpoint, columns, loadResource, renderItem }) {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const controller = new AbortController()

    setStatus('loading')
    loadResource(controller.signal)
      .then((payload) => {
        setItems(normalizeCollection(payload))
        setStatus('ready')
      })
      .catch(() => {
        if (!controller.signal.aborted) setStatus('error')
      })

    return () => controller.abort()
  }, [endpoint, loadResource])

  return (
    <section className="resource-section" aria-labelledby={`${title.toLowerCase()}-heading`}>
      <div className="section-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={`${title.toLowerCase()}-heading`}>{title}</h2>
        </div>
        <span className="week-label">{items.length} records</span>
      </div>

      <div className="resource-table" style={{ '--column-count': columns.length }}>
        <div className="resource-row resource-row-head">
          {columns.map((column) => (
            <span key={column}>{column}</span>
          ))}
        </div>

        {status === 'loading' && <div className="resource-message">Loading data...</div>}
        {status === 'error' && <div className="resource-message resource-error">Unable to load this data.</div>}
        {status === 'ready' && items.length === 0 && <div className="resource-message">No records yet.</div>}

        {status === 'ready' && items.map((item, index) => (
          <div className="resource-row" key={item._id ?? `${endpoint}-${index}`}>
            {renderItem(item).map((value, valueIndex) => (
              <span key={`${item._id ?? index}-${valueIndex}`}>{value ?? 'n/a'}</span>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}