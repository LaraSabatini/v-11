import React, { useContext } from "react"
import { TrainersContext } from "contexts/Trainers"
import TextField from "@components/UI/TextField"
import InputCalendar from "@components/UI/InputCalendar"
import { RegisterForm } from "./styles"

function RegisterKid() {
  const { newKid, setNewKid } = useContext(TrainersContext)
  return (
    <RegisterForm>
      <p className="title"> Registrar cliente:</p>
      <div className="horizontal">
        <TextField
          label="Nombre"
          required
          type="text"
          width={200}
          onChange={e => setNewKid({ ...newKid, name: e.target.value })}
        />
        <TextField
          label="Apellido"
          required
          type="text"
          width={200}
          onChange={e => setNewKid({ ...newKid, last_name: e.target.value })}
        />
      </div>
      <div className="horizontal">
        <TextField
          label="DNI / Pasaporte"
          required
          type="text"
          width={200}
          onChange={e =>
            setNewKid({ ...newKid, identification: e.target.value })
          }
        />
        <InputCalendar
          reference={undefined}
          label="Fecha de nacimiento"
          required
          width={200}
          onChange={e =>
            setNewKid({ ...newKid, birthDate: e.selectedChangeDate })
          }
        />
      </div>
      <div className="horizontal">
        <TextField
          label="Nombre del tutor"
          required
          type="text"
          width={200}
          onChange={e => setNewKid({ ...newKid, tutor_name: e.target.value })}
        />
        <TextField
          label="Apellido del tutor"
          required
          type="text"
          width={200}
          onChange={e =>
            setNewKid({ ...newKid, tutor_last_name: e.target.value })
          }
        />
      </div>
      <div className="horizontal">
        <TextField
          label="DNI / Pasaporte del tutor"
          required
          type="text"
          width={200}
          onChange={e =>
            setNewKid({ ...newKid, tutor_identification: e.target.value })
          }
        />
        <TextField
          label="Contacto"
          required
          type="text"
          width={200}
          onChange={e => setNewKid({ ...newKid, phone: e.target.value })}
        />
      </div>
    </RegisterForm>
  )
}

export default RegisterKid
