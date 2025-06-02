import { pgTable, integer, text, serial, jsonb } from "drizzle-orm/pg-core"

export const users = pgTable('users', {
  id: serial("id").primaryKey(),
  email:text().unique(),
  username:text(),
  image:text(),
  bookmarks:integer('bookmarks').references(() => articles.id,{onDelete:'cascade',onUpdate:'cascade'}).array(),
  read:integer('read').references(() => articles.id,{onDelete:'cascade',onUpdate:'cascade'}).array()
});

// title,
//       excerpt,
//       content,
//       featuredImage,
//       tags

export const articles = pgTable('articles',{
  id:serial("id").primaryKey(),
  title:text().unique(),
  content:text(),
  excerpt:text(),
  featuredImage:text(),
  tags:text().array()
})


export const questionnaires = pgTable('questionnaires',{
  id:serial("id").primaryKey(),
  title:text().unique(),
  image:text(),
  description: text('description'),
  questions: jsonb('questions').notNull(), // Array of objects
})
export const questions = pgTable('questions',{
  id:serial("id").primaryKey(),
  swali:text().unique(),
  choices:text().array(),
  answer:text(),
})