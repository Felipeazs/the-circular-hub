import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

import { env } from "../t3-env"
import * as schema from "./schemas"

const pgclient = postgres(env.DATABASE_URI, { prepare: false })
const db = drizzle({ client: pgclient, schema })

export default db
