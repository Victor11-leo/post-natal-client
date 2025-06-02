import { defineConfig } from "drizzle-kit";
export default defineConfig({
  out:'./drizzle',
  dialect: 'postgresql', // 'mysql' | 'sqlite' | 'turso'
  schema: './src/db/schema.ts',
   migrations: {
    table: 'my-migrations-table', // `__drizzle_migrations` by default
    schema: 'public', // used in PostgreSQL only, `drizzle` by default
  },
  dbCredentials:{
    url:'postgresql://postgres.smauuurtvfvxuxumbicr:2jyCmNBUMcQDEBwe@aws-0-eu-central-1.pooler.supabase.com:6543/postgres'
  }
})