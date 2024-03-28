import { auth } from './../auth'
import Elysia, { t } from 'elysia'
import { db } from '../../db/connection'
import dayjs from 'dayjs'
import { authLinks } from '../../db/schema'
import { eq } from 'drizzle-orm'

export const authenticateFromLink = new Elysia().use(auth).get(
  '/auth-links/authenticate',
  async ({ query, signUser, set }) => {
    const { code, redirect } = query
    // todo: authLinkFromCode = link de autenticação a partir do código
    const authLinkFromCode = await db.query.authLinks.findFirst({
      where(fields: { eq }) {
        return eq(fields.code, code)
      },
    })

    if (!authLinkFromCode) {
      throw new Error('Auth link not found.')
    }
    // todo: daysSinceAuthLinkCreated = dias desde a criação do AuthLink
    const daysSinceAuthLinkCreated = dayjs().diff(
      authLinkFromCode.createdAt,
      'days',
    )

    if (daysSinceAuthLinkCreated > 7) {
      throw new Error('Auth link expired, please generate a new one.')
    }
    // todo: procurando se o usuário que se está tentando autenticar é um manager de um restaurante
    const managedRestaurant = await db.query.restaurants.findFirst({
      where(fields, { eq }) {
        return eq(fields.managerId, authLinkFromCode.userId)
      },
    })
    // todo: cookies de autenticação
    await signUser({
      sub: authLinkFromCode.userId,
      restaurantId: managedRestaurant?.id,
    })

    // todo: Delete link
    await db.delete(authLinks).where(eq(authLinks.code, code))
    // todo: redirect
    // set.redirect = redirect
  },
  {
    query: t.Object({
      code: t.String(),
      redirect: t.String(),
    }),
  },
)
