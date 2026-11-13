import { Link } from 'react-router-dom'
import Icon from './Icon'
import { services } from '../data/services'

const byId = Object.fromEntries(services.map((service) => [service.id, service]))

const cells = [
  { type: 'service', service: byId.branding },
  { type: 'service', service: byId.digital },
  { type: 'service', service: byId.video },
  { type: 'service', service: byId.startup },
  { type: 'center' },
  { type: 'service', service: byId.web },
  { type: 'service', service: byId.print },
  { type: 'service', service: byId.performance },
  { type: 'note' },
]

export default function Diagram360() {
  return (
    <div className="hub">
      <div className="hub__grid">
        {cells.map((cell, index) => {
          if (cell.type === 'center') {
            return (
              <div className="hub__cell hub__center" key={`cell-${index}`}>
                <span className="hub__center-mark">ERUPT</span>
                <span className="hub__center-sub">360°</span>
              </div>
            )
          }

          if (cell.type === 'note') {
            return (
              <div className="hub__cell hub__cell--note" key={`cell-${index}`}>
                <Icon name="check" size={20} />
                <span className="hub__label">One team, one plan</span>
              </div>
            )
          }

          const { service } = cell
          return (
            <Link
              className="hub__cell hub__cell--link"
              to={`/services#${service.id}`}
              key={service.id}
            >
              <span className="hub__num">{service.number}</span>
              <Icon name={service.icon} size={20} />
              <span className="hub__label">{service.title}</span>
            </Link>
          )
        })}
      </div>
      <p className="hub__caption">
        Seven service lines. One connected team. That is the 360°.
      </p>
    </div>
  )
}
