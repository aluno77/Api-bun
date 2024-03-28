import Elysia, { t } from 'elysia'
import { db } from '../../db/connection'
import { authLinks } from '../../db/schema'
import { createId } from '@paralleldrive/cuid2'
import { env } from '../../env'
import { mail } from '../../lib/mail'
import nodemailer from 'nodemailer'

export const sendAuthLink = new Elysia().post(
  '/authenticate',
  async ({ body }) => {
    const { email } = body

    const userFromEmail = await db.query.users.findFirst({
      where(fields, { eq }) {
        return eq(fields.email, email)
      },
    })

    if (!userFromEmail) {
      throw new Error('User not found.')
    }

    // todo: code de authentication
    const authLinkCode = createId()

    await db.insert(authLinks).values({
      userId: userFromEmail.id,
      code: authLinkCode,
    })

    const authLink = new URL('/auth-links/authenticate', env.API_BASE_URL)

    authLink.searchParams.set('code', authLinkCode)
    authLink.searchParams.set('redirect', env.AUTH_REDIRECT_URL)

    // todo: Enviar e-mail
    const info = await mail.sendMail({
      from: {
        name: 'api',
        address: 'hi@pizzashop.com',
      },
      to: email,
      subject: 'Authenticate to pizza shop',
      text: `Use the fallowing link to authenticate on pizza shop ${authLink.toString()}`,
    })

    console.log(nodemailer.getTestMessageUrl(info))
  },

  {
    body: t.Object({
      email: t.String({ format: 'email' }),
    }),
  },
)

// todo: userFromEmail = usuário do e-mail
