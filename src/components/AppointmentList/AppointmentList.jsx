import AppointmentCard from '../AppointmentCard/AppointmentCard'
import './AppointmentList.css'

function AppointmentList({ appointments, onDeleteAppointment }) {
  if (appointments.length === 0) {
    return (
      <div className="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
          <line x1="9" y1="16" x2="15" y2="16"/>
        </svg>
        <h3>Nenhum agendamento</h3>
        <p>Adicione seu primeiro agendamento usando o formulário acima.</p>
      </div>
    )
  }

  const sortedAppointments = [...appointments].sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date)
    return dateCompare !== 0 ? dateCompare : a.time.localeCompare(b.time)
  })

  return (
    <div className="appointment-list">
      {sortedAppointments.map(appointment => (
        <AppointmentCard
          key={appointment.id}
          appointment={appointment}
          onDelete={onDeleteAppointment}
        />
      ))}
    </div>
  )
}

export default AppointmentList
