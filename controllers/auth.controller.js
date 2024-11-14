import prisma from "../config/prisma.js";
import bcrypt from 'bcrypt';

export const register = async (request, response) => {

    try {
        const { email, password } = request.body;

        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (existingUser) {
            return response.status(400).json({
                message: "User already exists."
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        });

        response.status(201).json({
            message: "User registered successfully."
        })
    } catch (error) {
        console.log(error);
        response.status(500).json({
            message: "Server error."
        })
    }

}