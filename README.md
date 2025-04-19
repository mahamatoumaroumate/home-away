- Task	Command
- Init Prisma	
npx prisma init
- Generate Client	
npx prisma generate
- Migrate DB	
npx prisma migrate 
- dev View DB schema in browser	
npx prisma studio

* npx prisma migrate dev --name init
* npx prisma db push
* npx prisma migrate dev --name init creates a new migration for your database schema changes and applies it, while npx prisma db push directly updates the database schema without creating a migration. In the context of databases, a migration is set of operations, that modify the database schema, helping it evolve over time while preserving existing data.