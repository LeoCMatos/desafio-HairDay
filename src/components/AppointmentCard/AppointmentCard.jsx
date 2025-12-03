import { formatDate, formatTime, isToday } from '../../utils/formatDate'
import { SERVICES } from '../../constants/services'
import './AppointmentCard.css'

function AppointmentCard({ appointment, onDelete }) {
  const service = SERVICES.find(s => s.id === appointment.service)

  const handleDelete = () => {
    if (window.confirm(`Cancelar agendamento de ${appointment.clientName}?`)) {
      onDelete(appointment.id)
    }
  }

  return (
    <div className={`appointment-card ${isToday(appointment.date) ? 'today' : ''}`}>
      {isToday(appointment.date) && <span className="today-badge">Hoje</span>}

      <div className="card-header">
        <h3 className="client-name">{appointment.clientName}</h3>
        <button
          onClick={handleDelete}
          className="delete-button"
          aria-label={`Cancelar agendamento de ${appointment.clientName}`}
          title="Cancelar agendamento"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
            <line x1="10" y1="11" x2="10" y2="17"/>
            <line x1="14" y1="11" x2="14" y2="17"/>
          </svg>
        </button>
      </div>

      <div className="card-body">
        <div className="info-row">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          <span>{formatDate(appointment.date)}</span>
        </div>

        <div className="info-row">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12,6 12,12 16,14"/>
          </svg>
          <span>{formatTime(appointment.time)}</span>
        </div>

        <div className="info-row">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
          </svg>
          <span>{appointment.phone}</span>
        </div>

        <div className="info-row service">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="6" cy="6" r="3"/>
            <circle cx="6" cy="18" r="3"/>
            <line x1="20" y1="4" x2="8.12" y2="15.88"/>
            <line x1="14.47" y1="14.48" x2="20" y2="20"/>
            <line x1="8.12" y1="8.12" x2="12" y2="12"/>
          </svg>
          <span>{service?.name || appointment.service}</span>
        </div>

        {appointment.notes && (
          <div className="notes">
            <p>{appointment.notes}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AppointmentCard
