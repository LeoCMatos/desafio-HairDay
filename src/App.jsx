import { useState } from 'react'
import Header from './components/Header/Header'
import BookingForm from './components/BookingForm/BookingForm'
import Schedule from './components/Schedule/Schedule'
import './App.css'

function App() {
  const [appointments, setAppointments] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  const handleAddAppointment = (newAppointment) => {
    setAppointments(prevAppointments => [
      ...prevAppointments,
      {
        ...newAppointment,
        id: crypto.randomUUID()
      }
    ])
  }

  const handleDeleteAppointment = (id) => {
    setAppointments(prevAppointments =>
      prevAppointments.filter(appointment => appointment.id !== id)
    )
  }

  // Filtrar agendamentos pela data selecionada
  const filteredAppointments = appointments.filter(
    appointment => appointment.date === selectedDate
  )

  // Horários já ocupados na data selecionada
  const bookedTimes = filteredAppointments.map(apt => apt.time)

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <BookingForm
          onAddAppointment={handleAddAppointment}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          bookedTimes={bookedTimes}
        />

        <Schedule
          appointments={filteredAppointments}
          onDeleteAppointment={handleDeleteAppointment}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
      </main>
    </div>
  )
}

export default App
