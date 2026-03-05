import type { Migration, MigrationProvider } from 'kysely'
import { sql } from 'kysely'

interface MigrationProviderProps {
  migrations: Record<string, string>
}

export class SqlMigrationProvider implements MigrationProvider {
  migrations: Record<string, string>

  constructor(props: MigrationProviderProps) {
    this.migrations = props.migrations
  }

  public getMigrations(): Promise<Record<string, Migration>> {
    const migrations = Object.entries(this.migrations).map(([key, value]) => {
      return [key, { up: async (db: any) => sql`${sql.raw(value)}`.execute(db) }]
    })
    return Promise.resolve(Object.fromEntries(migrations))
  }
}
