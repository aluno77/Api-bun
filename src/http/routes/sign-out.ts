import { auth } from './../auth'
import Elysia from 'elysia'

export const signOut = new Elysia()
  .use(auth)
  .post('/sign-out', async ({ cookie: internalSignOut }) => {
    delete internalSignOut.auth
  })
