"use server"
import jwt from 'jsonwebtoken';

export async function decodeToken(token: string) {
    const decodeToken = jwt.decode(token)
    return decodeToken
}