export type UserSensitiveType = {
    nickname: string,
    email: string,
    password: string,
    picture?: string | null,
}

export type UserType = Omit<UserSensitiveType, "email" | "password">
