import jwt from 'jsonwebtoken'

export default class JwtService {
    static sign() {
        return jwt.sign({ }, process.env.JWT_SECRET!!, {
            expiresIn: process.env.JWT_EXPIRE_TIME!!
        })
    }

    static verify(token: string) {
        return jwt.verify(token, process.env.JWT_SECRET!!)
    }
}