import { Elysia } from 'elysia'

const app = new Elysia()
  .get('/', () => {
    return 'Hello Ronald'
  })

app.listen(3333, () => {
  console.log('svr run on port 3333')
})