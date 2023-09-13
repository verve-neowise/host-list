import { SignJWT, jwtVerify } from 'jose'

const secret = new TextEncoder().encode(
    process.env.JWT_SECRET!!,
)

export default class JwtService {
    static sign() {
        return new SignJWT({ })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime(process.env.JWT_EXPIRE_TIME!!)
            .sign(Buffer.from(process.env.JWT_SECRET!!))
    }

    static verify(token: string) {
        return jwtVerify(token, secret)
    }
}