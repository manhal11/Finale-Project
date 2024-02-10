export interface User {
    id: number,
    username: string,
    email: string,
    role: UserRole
}

type UserRole = 'User' | 'Administrator'