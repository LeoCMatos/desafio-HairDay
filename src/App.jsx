import { useState } from 'react'
import Header from './components/Header/Header'
import AppointmentForm from './components/AppointmentForm/AppointmentForm'
import AppointmentList from './components/AppointmentList/AppointmentList'
import './App.css'

function App() {
  // Estado central - array de agendamentos
  const [appointments, setAppointments] = useState([])

  // Adicionar agendamento (imutabilidade com spread operator)
  const handleAddAppointment = (newAppointment) => {
    setAppointments(prevAppointments => [
      ...prevAppointments,
      {
        ...newAppointment,
        id: crypto.randomUUID()
      }
    ])
  }

  // Remover agendamento (imutabilidade com filter)
  const handleDeleteAppointment = (id) => {
    setAppointments(prevAppointments =>
      prevAppointments.filter(appointment => appointment.id !== id)
    )
  }

  return (
    <div className="app">
      <Header
        title="HairDay"
        subtitle="Gerencie seus agendamentos de forma simples"
      />

      <main className="container">
        <section className="section">
          <h2 className="section-title">Novo Agendamento</h2>
          <AppointmentForm onAddAppointment={handleAddAppointment} />
        </section>

        <section className="section">
          <h2 className="section-title">
            Agendamentos
            {appointments.length > 0 && (
              <span className="count-badge">{appointments.length}</span>
            )}
          </h2>
          <AppointmentList
            appointments={appointments}
            onDeleteAppointment={handleDeleteAppointment}
          />
        </section>
      </main>

      <footer className="footer">
        <p>HairDay &copy; {new Date().getFullYear()} - Desafio React Rocketseat</p>
      </footer>
    </div>
  )
}

export default App
