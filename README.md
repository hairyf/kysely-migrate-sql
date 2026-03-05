# kysely-migrate-sql

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![License][license-src]][license-href]

Simple SQL-based migration provider for [Kysely](https://koskimas.github.io/kysely/) that lets you define migrations as plain SQL strings while keeping the familiar `Migrator` API.

## Installation

```bash
pnpm add kysely-migrate-sql
# or
npm install kysely-migrate-sql
# or
yarn add kysely-migrate-sql
```

You also need `kysely` (peer dependency, `>=0.28`).

## Usage

### Quick start

```ts
import { Migrator } from 'kysely'
import { SqlMigrator } from 'kysely-migrate-sql'

// Map of migration name -> SQL string
const migrations = {
  '001_init.sql': `
    create table users (
      id integer primary key autoincrement,
      name text not null
    );
  `,
}

const migrator = new SqlMigrator({
  db, // your Kysely instance
  migrations,
  // any other MigratorProps (except "provider") can be passed here
})

const { error } = await migrator.migrateToLatest()

if (error) {
  console.error('Migration failed', error)
  process.exit(1)
}
```

### Using `SqlMigrationProvider` directly

If you prefer to construct the `Migrator` yourself:

```ts
import { Migrator } from 'kysely'
import { SqlMigrationProvider } from 'kysely-migrate-sql'

const provider = new SqlMigrationProvider({ migrations })

const migrator = new Migrator({
  db,
  provider,
})
```

`SqlMigrationProvider` turns each SQL string into a migration whose `up` function runs that SQL via `sql\`\``.

## License

[MIT](./LICENSE) License © [hairyf](https://github.com/hairyf)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/kysely-migrate-sql?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/kysely-migrate-sql
[npm-downloads-src]: https://img.shields.io/npm/dm/kysely-migrate-sql?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/kysely-migrate-sql
[bundle-src]: https://img.shields.io/bundlephobia/minzip/kysely-migrate-sql?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=kysely-migrate-sql
[license-src]: https://img.shields.io/github/license/hairyf/kysely-migrate-sql.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/hairyf/kysely-migrate-sql/blob/main/LICENSE
