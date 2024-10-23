import fs from 'fs/promises';
import path from "path";
import { fileURLToPath } from "url";

export const seedTodos = async (prisma) => {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)

    let data;
    try {
        data = await fs.readFile(path.join(__dirname, 'todosData.json'), 'utf-8')
    } catch (error) {
        console.error("❌ Error reading todosData.json: ", error)
        return;
    }

    let todos;
    try {
        todos = await JSON.parse(data)
    } catch (error) {
        console.error('❌ Error parsing todosData.json: ', error)
        return;
    }

    try {
        await prisma.$transaction( async (entity) => {

            await entity.todo.deleteMany();
            console.log('🗑️ Existing todos cleared')

            await entity.$executeRaw`ALTER TABLE todos AUTO_INCREMENT = 1;`;
            console.log('🔄 Auto-increment counter reset');

            await entity.todo.createMany({
                data: todos
            })
        })

        console.log("✅ Seeding todos completed successfully!")
    } catch (error) {
        console.error("❌ Error seeding todos table: ", error)
        console.log("♻️ All changes have been rolled back")
        throw error;
    }
}