import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'niamidsw@gmail.com',
    pass: 'bavg lqsd xjxd rckp',
  },
})

export async function sendMail(to: string, subject: string, text: string, html?: string) {
  const mailOptions = {
    from: '"Node Mail Tester" <niamidsw@gmail.com>',
    to,
    subject,
    text,
    html,
  }

  const info = await transporter.sendMail(mailOptions)
  console.log('Correo enviado:', info.messageId)
  return info
}