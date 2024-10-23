import { PrismaClient } from "@prisma/client";
import { seedTodos } from "./todos/todo.seeder.js";

const prisma = new PrismaClient();

(async () => {

    try {
        const args = process.argv.slice(2);

        if (args.includes('--todos')) {
            await seedTodos(prisma)
        }

        if (args.length === 0) {
            await seedTodos(prisma)
        }

        console.log("✅ Seeding completed successfully!");
    } catch (error) {
        console.log('❌ Error in main seeding process: ', error)
    } finally {
        await prisma.$disconnect()
    }
})()