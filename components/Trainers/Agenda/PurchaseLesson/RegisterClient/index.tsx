import React, { useContext } from "react"
import { TrainersContext } from "contexts/Trainers"
import TextField from "@components/UI/TextField"
import InputCalendar from "@components/UI/InputCalendar"
import { RegisterForm } from "../RegisterKid/styles"

function RegisterClient() {
  const { newPartner, setNewPartner } = useContext(TrainersContext)

  return (
    <RegisterForm>
      <p className="title"> Registrar cliente:</p>
      <div className="horizontal">
        <TextField
          label="Nombre"
          required
          type="text"
          width={200}
          onChange={e => setNewPartner({ ...newPartner, name: e.target.value })}
        />
        <TextField
          label="Apellido"
          required
          type="text"
          width={200}
          onChange={e =>
            setNewPartner({ ...newPartner, last_name: e.target.value })
          }
        />
      </div>
      <div className="horizontal">
        <TextField
          label="DNI / Pasaporte"
          required
          type="text"
          width={200}
          onChange={e =>
            setNewPartner({
              ...newPartner,
              identification_number: e.target.value,
            })
          }
        />
        <InputCalendar
          reference={undefined}
          label="Fecha de nacimiento"
          width={200}
          onChange={e =>
            setNewPartner({
              ...newPartner,
              identification: e.selectedChangeDate,
            })
          }
        />
      </div>
      <div className="horizontal">
        <TextField
          label="Email"
          required
          type="email"
          width={200}
          onChange={e =>
            setNewPartner({ ...newPartner, email: e.target.value })
          }
        />
        <TextField
          label="Telefono"
          required
          type="text"
          width={200}
          onChange={e =>
            setNewPartner({ ...newPartner, phone: e.target.value })
          }
        />
      </div>
    </RegisterForm>
  )
}

export default RegisterClient
