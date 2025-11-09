// scripts/seed.cjs
require('dotenv/config');
const { DataSource } = require('typeorm');
const { readFileSync } = require('fs');
// Pfad anpassen, falls deine Entity-Datei anders heißt/liegt:
const { Quote } = require('../dist/quotes/entities/quotes.entity.js');

const ds = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  entities: [Quote],
});

(async () => {
  try {
    const raw = readFileSync('seed/quotes.json', 'utf8');
    const items = JSON.parse(raw);

    await ds.initialize();
    const repo = ds.getRepository(Quote);

    const count = await repo.count();
    if (count > 0) {
      console.log(`Quotes already present (${count}), skipping.`);
      await ds.destroy();
      return;
    }

    const rows = items.map((q) => ({
      // Spaltennamen laut SQLite-Schema: id, quote, author
      quote: q.quote,
      author: q.author ?? null,
    }));

    if (rows.length === 0) {
      console.log('No rows to seed. seed/quotes.json is empty?');
    } else {
      await repo.save(rows);
      console.log(`Seeded ${rows.length} quotes.`);
    }

    await ds.destroy();
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
})();
