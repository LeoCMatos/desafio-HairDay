import { useState } from 'react'
import { SERVICES } from '../../constants/services'
import { getMinDate } from '../../utils/formatDate'
import './AppointmentForm.css'

const initialFormData = {
  clientName: '',
  phone: '',
  date: '',
  time: '',
  service: '',
  notes: ''
}

function AppointmentForm({ onAddAppointment }) {
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Limpa erro do campo quando usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.clientName.trim()) {
      newErrors.clientName = 'Nome é obrigatório'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório'
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Telefone inválido'
    }

    if (!formData.date) {
      newErrors.date = 'Data é obrigatória'
    }

    if (!formData.time) {
      newErrors.time = 'Horário é obrigatório'
    }

    if (!formData.service) {
      newErrors.service = 'Selecione um serviço'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      onAddAppointment({
        ...formData,
        createdAt: new Date().toISOString()
      })
      setFormData(initialFormData)
    }
  }

  return (
    <form className="appointment-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        {/* Input tipo text - Nome */}
        <div className="form-group">
          <label htmlFor="clientName">Nome do Cliente</label>
          <input
            type="text"
            id="clientName"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            placeholder="Digite o nome completo"
            className={errors.clientName ? 'error' : ''}
          />
          {errors.clientName && <span className="error-message">{errors.clientName}</span>}
        </div>

        {/* Input tipo tel - Telefone */}
        <div className="form-group">
          <label htmlFor="phone">Telefone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(00) 00000-0000"
            className={errors.phone ? 'error' : ''}
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        {/* Input tipo date - Data */}
        <div className="form-group">
          <label htmlFor="date">Data</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={getMinDate()}
            className={errors.date ? 'error' : ''}
          />
          {errors.date && <span className="error-message">{errors.date}</span>}
        </div>

        {/* Input tipo time - Horário */}
        <div className="form-group">
          <label htmlFor="time">Horário</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className={errors.time ? 'error' : ''}
          />
          {errors.time && <span className="error-message">{errors.time}</span>}
        </div>

        {/* Input tipo select - Serviço */}
        <div className="form-group">
          <label htmlFor="service">Serviço</label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className={errors.service ? 'error' : ''}
          >
            <option value="">Selecione um serviço</option>
            {SERVICES.map(service => (
              <option key={service.id} value={service.id}>
                {service.name} - R$ {service.price}
              </option>
            ))}
          </select>
          {errors.service && <span className="error-message">{errors.service}</span>}
        </div>

        {/* Input tipo textarea - Observações */}
        <div className="form-group full-width">
          <label htmlFor="notes">Observações (opcional)</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Alguma informação adicional..."
            rows={3}
          />
        </div>
      </div>

      <button type="submit" className="submit-button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        Agendar
      </button>
    </form>
  )
}

export default AppointmentForm
