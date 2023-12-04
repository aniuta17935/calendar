let userGuid = 0


export const INITIAL_USERS = [{
        id: createUsertId(),
        email: '123456@gmail.com',
        password: '11111111'
    },
    {
        id: createUsertId(),
        email: '1234567@gmail.com',
        password: '11111111'
    }
]

export function createUsertId() {
    return String(userGuid++)
}

export function createUser(email, password) {
    const newUser = {
        id: createUsertId(),
        email: email,
        password: password
    }
    INITIAL_USERS.push(newUser);
}