import type { MigratorProps } from 'kysely'
import { Migrator } from 'kysely'
import SqlMigrationProvider from './sql-migration-provider'

export interface SqlMigratorProps extends Omit<MigratorProps, 'provider'> {
  migrations: Record<string, string>
}

export class SqlMigrator extends Migrator {
  constructor(options: SqlMigratorProps) {
    super({
      provider: new SqlMigrationProvider({ migrations: options.migrations }),
      ...options,
    })
  }
}
