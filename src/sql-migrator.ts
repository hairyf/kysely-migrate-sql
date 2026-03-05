import type { Kysely, MigratorProps } from 'kysely'
import { Migrator } from 'kysely'
import { SqlMigrationProvider } from './sql-migration-provider'

export interface SqlMigratorProps extends Omit<MigratorProps, 'provider'> {
  migrations: Record<string, string>
}

export class SqlMigrator extends Migrator {
  constructor(db: Kysely<any>, options: SqlMigratorProps) {
    super({
      ...options,
      provider: new SqlMigrationProvider({ migrations: options.migrations }),
      db,
    })
  }
}
