import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: '123456',
        },
    });
    console.log('Database seeded!');
}

await main();
console.log('Database seeded!');
await prisma.$disconnect();