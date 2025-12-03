import { useState } from 'react'
import './BookingForm.css'

const TIME_SLOTS = {
  morning: ['09:00', '10:00', '11:00', '12:00'],
  afternoon: ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
  evening: ['19:00', '20:00', '21:00']
}

function BookingForm({ onAddAppointment, selectedDate, onDateChange, bookedTimes }) {
  const [clientName, setClientName] = useState('')
  const [selectedTime, setSelectedTime] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!clientName.trim() || !selectedTime) {
      return
    }

    onAddAppointment({
      clientName: clientName.trim(),
      date: selectedDate,
      time: selectedTime
    })

    setClientName('')
    setSelectedTime('')
  }

  const isTimeBooked = (time) => bookedTimes.includes(time)

  const formatDateDisplay = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00')
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  return (
    <div className="booking-form-container">
      <div className="booking-form-header">
        <h2 className="booking-title">Agende um atendimento</h2>
        <p className="booking-subtitle">
          Selecione data, horário e informe o nome do cliente para criar o agendamento
        </p>
      </div>

      <form className="booking-form" onSubmit={handleSubmit}>
        {/* Seletor de Data */}
        <div className="form-section">
          <label className="form-label">Data</label>
          <div className="date-input-wrapper">
            <svg className="calendar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="date-input"
            />
            <span className="date-display">{formatDateDisplay(selectedDate)}</span>
            <svg className="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </div>

        {/* Seletor de Horários */}
        <div className="form-section">
          <label className="form-label">Horários</label>

          {/* Manhã */}
          <div className="time-period">
            <span className="period-label">Manhã</span>
            <div className="time-slots">
              {TIME_SLOTS.morning.map(time => (
                <button
                  key={time}
                  type="button"
                  className={`time-slot ${selectedTime === time ? 'selected' : ''} ${isTimeBooked(time) ? 'booked' : ''}`}
                  onClick={() => !isTimeBooked(time) && setSelectedTime(time)}
                  disabled={isTimeBooked(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Tarde */}
          <div className="time-period">
            <span className="period-label">Tarde</span>
            <div className="time-slots">
              {TIME_SLOTS.afternoon.map(time => (
                <button
                  key={time}
                  type="button"
                  className={`time-slot ${selectedTime === time ? 'selected' : ''} ${isTimeBooked(time) ? 'booked' : ''}`}
                  onClick={() => !isTimeBooked(time) && setSelectedTime(time)}
                  disabled={isTimeBooked(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Noite */}
          <div className="time-period">
            <span className="period-label">Noite</span>
            <div className="time-slots">
              {TIME_SLOTS.evening.map(time => (
                <button
                  key={time}
                  type="button"
                  className={`time-slot ${selectedTime === time ? 'selected' : ''} ${isTimeBooked(time) ? 'booked' : ''}`}
                  onClick={() => !isTimeBooked(time) && setSelectedTime(time)}
                  disabled={isTimeBooked(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Nome do Cliente */}
        <div className="form-section">
          <label className="form-label">Cliente</label>
          <div className="client-input-wrapper">
            <svg className="user-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Nome do cliente"
              className="client-input"
            />
          </div>
        </div>

        {/* Botão de Agendar */}
        <button
          type="submit"
          className="submit-button"
          disabled={!clientName.trim() || !selectedTime}
        >
          AGENDAR
        </button>
      </form>
    </div>
  )
}

export default BookingForm
