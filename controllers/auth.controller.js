import prisma from "../config/prisma.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

export const login = async (request, response) => {

    try {
        const { email, password } = request.body;

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return response.status(401).json({
                message: "Invalid credentials."
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return response.status(401).json({
                message: "Invalid credentials."
            })
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h"});

        response.status(200).json({ token });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            message: "Server error."
        })
    }

}