import { text, timestamp, pgTable, integer } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'
import { orderItems, restaurants } from '.'
import { relations } from 'drizzle-orm'

export const products = pgTable('products', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  restaurantId: text('restaurant_id')
    .notNull()
    .references(() => restaurants.id, {
      onDelete: 'cascade',
    }),
  priceInCents: integer('price_in_cents').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const productsRelations = relations(products, ({ one, many }) => {
  return {
    restaurant: one(restaurants, {
      fields: [products.restaurantId],
      references: [restaurants.id],
      relationName: 'product_restaurant',
    }),
    orderItems: many(orderItems),
  }
})
