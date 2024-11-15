import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.js';

export const authenticateToken = async (request, response, next) => {

    try {
        const token = request.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return response.status(401).json({
                message: "Authorization required."
            })
        }

        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await prisma.user.findUnique({
            where: { id: verifiedToken.id }
        });

        if (!user) {
            return response.status(401).json({
                message: "Authorization required."
            })
        };

        request.user = {
            id: user.id,
            email: user.email
        };

        next();
    } catch (error) {
        console.log(error);
        response.status(401).json({
            message: "Invalid authentication token."
        })
    }

}