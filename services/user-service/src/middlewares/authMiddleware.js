import jwt from 'jsonwebtoken';

const authMiddleware = (req, reply, done) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return reply.status(401).send({ message: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        done();
    } catch (error) {
        return reply.status(401).send({ message: 'Token inválido ou expirado' });
    }
};

export { authMiddleware };