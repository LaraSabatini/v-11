/* eslint-disable no-console */
import { MailtrapClient } from "mailtrap"

// f51b6904b0145b571d4281ae0261e175
const TOKEN = "2e07812876b4875ee5475bdb3fc252dd"
const ENDPOINT = "https://send.api.mailtrap.io/"

const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN })

const sender = {
  email: "mailtrap@vonceescalada.com",
  name: "Mailtrap Test",
}
const recipients = [
  {
    email: "sabatinilara@gmail.com",
  },
]

const sendEmail = () => {
  const res = client
    .send({
      from: sender,
      to: recipients,
      subject: "You are awesome!",
      text: "Congrats for sending test email with Mailtrap!",
      category: "Integration Test",
    })
    .then(console.log, console.error)

  return res
}

export default sendEmail
