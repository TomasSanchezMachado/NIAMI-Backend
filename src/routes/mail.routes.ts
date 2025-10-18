import { Router } from 'express'
import { sendMail } from '../services/mailer'

const router = Router()

router.post('/send', async (req, res) => {
  const { to, subject, text, html } = req.body

  if (!to || !subject || !text) {
    return res.status(400).json({ error: 'Faltan campos: destino, asunto y cuerpo' })
  }

  try {
    const info = await sendMail(to, subject, text, html)
    res.json({ success: true, messageId: info.messageId })
  } catch (error) {
    console.error('Error al enviar correo:', error)
    res.status(500).json({ success: false, error: 'Error al enviar el correo' })
  }
})

export default router