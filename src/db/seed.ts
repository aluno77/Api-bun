/* eslint-disable drizzle/enforce-delete-with-where */
import { faker } from '@faker-js/faker'
import {
  users,
  restaurants,
  orderItems,
  orders,
  products,
  authLinks,
} from './schema'
import { db } from './connection'
import chalk from 'chalk'
import { createId } from '@paralleldrive/cuid2'

/**
 *todo: Reset database
 */
await db.delete(users)
await db.delete(restaurants)
await db.delete(orderItems)
await db.delete(orders)
await db.delete(products)
await db.delete(authLinks)

console.log(chalk.yellow('☑️Database reset'))

/**
 * Create customers
 */
const [customer1, customer2] = await db
  .insert(users)
  .values([
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: 'customer',
    },
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: 'customer',
    },
  ])
  .returning()

console.log(chalk.yellow('☑️Create customers'))

/**
 * Create manager
 */
const [manager] = await db
  .insert(users)
  .values([
    {
      name: faker.person.fullName(),
      email: 'admin@admin.com',
      role: 'manager',
    },
  ])
  .returning({
    id: users.id,
  })

console.log(chalk.yellow('☑️Create manager'))

/**
 * Create restaurants
 */
const [restaurant] = await db
  .insert(restaurants)
  .values([
    {
      name: faker.company.name(),
      description: faker.lorem.paragraph(),
      managerId: manager.id,
    },
  ])
  .returning()

console.log(chalk.yellow('☑️Create manager!'))

// todo: generateProduct = Gerar produtos
function generateProduct() {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    restaurantId: restaurant.id,
    priceInCents: Number(faker.commerce.price({ min: 190, max: 490, dec: 0 })),
  }
}
/**
 * Create products
 */
// todo: availableProducts = Produtos disponíveis
const availableProducts = await db
  .insert(products)
  .values([
    generateProduct(),
    generateProduct(),
    generateProduct(),
    generateProduct(),
    generateProduct(),
    generateProduct(),
  ])
  .returning()

console.log(chalk.yellow('☑️Create product!'))

/**
 * Create order
 */
type OrderItemsInsert = typeof orderItems.$inferInsert
type orderInsert = typeof orders.$inferInsert

const orderItemsToInsert: OrderItemsInsert[] = []
const orderToInsert: orderInsert[] = []

for (let i = 0; i < 200; i++) {
  const orderId = createId()

  const orderProducts = faker.helpers.arrayElements(availableProducts, {
    min: 1,
    max: 3,
  })

  let totalInCents = 0

  orderProducts.forEach((orderProduct) => {
    const quantity = faker.number.int({ min: 1, max: 3 })

    totalInCents += orderProduct.priceInCents * quantity

    orderItemsToInsert.push({
      orderId,
      productId: orderProduct.id,
      priceInCents: orderProduct.priceInCents,
      quantity,
    })
  })

  orderToInsert.push({
    id: orderId,
    customerId: faker.helpers.arrayElement([customer1.id, customer2.id]),
    restaurantId: restaurant.id,
    totalInCents,
    status: faker.helpers.arrayElement([
      'pending',
      'processing',
      'delivering',
      'delivered',
      'cancelled',
    ]),
    createdAt: faker.date.recent({ days: 40 }), // todo: data de criação aleatória dos 40 dias
  })
}

// todo: Inserir pedidos
await db.insert(orders).values(orderToInsert)
await db.insert(orderItems).values(orderItemsToInsert)
// --
console.log(chalk.yellow('☑️Create orders!'))

console.log(chalk.greenBright('Database seeded successfully!'))

process.exit()
