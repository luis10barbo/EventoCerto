import { UserSensitiveType } from "@/model/userModel";
import mongoose from "mongoose";

export const userSchemaTypeDefinition = {
    nickname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    picture: String,
} as const;
export const userSchema = new mongoose.Schema(userSchemaTypeDefinition)
export const UserCol = mongoose.model("user", userSchema);

export async function getUserById(userId: string) {
    return await UserCol.findById(userId);
}

export function mapUserCollectionToUser(user: Awaited<ReturnType<typeof getUserById>>): UserSensitiveType | undefined {
    if (!user) return undefined;
    return {email: user?.email, nickname: user.nickname, password: user.password, picture: user.picture}
} 
