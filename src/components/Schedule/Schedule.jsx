import './Schedule.css'

function Schedule({ appointments, onDeleteAppointment, selectedDate, onDateChange }) {
  const formatDateDisplay = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00')
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  // Agrupar agendamentos por período
  const groupByPeriod = (appointments) => {
    const morning = appointments.filter(apt => {
      const hour = parseInt(apt.time.split(':')[0])
      return hour >= 9 && hour < 12
    })
    const afternoon = appointments.filter(apt => {
      const hour = parseInt(apt.time.split(':')[0])
      return hour >= 12 && hour < 18
    })
    const evening = appointments.filter(apt => {
      const hour = parseInt(apt.time.split(':')[0])
      return hour >= 18 && hour <= 21
    })

    return { morning, afternoon, evening }
  }

  const grouped = groupByPeriod(appointments)

  const sortByTime = (a, b) => a.time.localeCompare(b.time)

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <div className="schedule-header-text">
          <h2 className="schedule-title">Sua agenda</h2>
          <p className="schedule-subtitle">Consulte os seus cortes de cabelo agendados por dia</p>
        </div>

        <div className="date-selector">
          <svg className="calendar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          <span className="date-text">{formatDateDisplay(selectedDate)}</span>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="date-input-hidden"
          />
          <svg className="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </div>

      <div className="schedule-content">
        {/* Manhã */}
        <div className="period-section">
          <div className="period-header">
            <div className="period-title">
              <svg className="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
              <span>Manhã</span>
            </div>
            <span className="period-time">09h-12h</span>
          </div>

          <div className="appointments-list">
            {grouped.morning.sort(sortByTime).map(apt => (
              <div key={apt.id} className="appointment-item">
                <span className="appointment-time">{apt.time}</span>
                <span className="appointment-name">{apt.clientName}</span>
                <button
                  className="delete-btn"
                  onClick={() => onDeleteAppointment(apt.id)}
                  aria-label="Remover agendamento"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                  </svg>
                </button>
              </div>
            ))}
            {grouped.morning.length === 0 && (
              <p className="no-appointments">Nenhum agendamento</p>
            )}
          </div>
        </div>

        {/* Tarde */}
        <div className="period-section">
          <div className="period-header">
            <div className="period-title">
              <svg className="cloud-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
              </svg>
              <span>Tarde</span>
            </div>
            <span className="period-time">13h-18h</span>
          </div>

          <div className="appointments-list">
            {grouped.afternoon.sort(sortByTime).map(apt => (
              <div key={apt.id} className="appointment-item">
                <span className="appointment-time">{apt.time}</span>
                <span className="appointment-name">{apt.clientName}</span>
                <button
                  className="delete-btn"
                  onClick={() => onDeleteAppointment(apt.id)}
                  aria-label="Remover agendamento"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                  </svg>
                </button>
              </div>
            ))}
            {grouped.afternoon.length === 0 && (
              <p className="no-appointments">Nenhum agendamento</p>
            )}
          </div>
        </div>

        {/* Noite */}
        <div className="period-section">
          <div className="period-header">
            <div className="period-title">
              <svg className="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
              <span>Noite</span>
            </div>
            <span className="period-time">19h-21h</span>
          </div>

          <div className="appointments-list">
            {grouped.evening.sort(sortByTime).map(apt => (
              <div key={apt.id} className="appointment-item">
                <span className="appointment-time">{apt.time}</span>
                <span className="appointment-name">{apt.clientName}</span>
                <button
                  className="delete-btn"
                  onClick={() => onDeleteAppointment(apt.id)}
                  aria-label="Remover agendamento"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                  </svg>
                </button>
              </div>
            ))}
            {grouped.evening.length === 0 && (
              <p className="no-appointments">Nenhum agendamento</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Schedule
