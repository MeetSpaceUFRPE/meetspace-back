const { createUser, getUsers, getUserById, getUserByEmail, updateUser, deleteUser } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const userRoutes = async (fastify, options) => {
    fastify.post('/users', createUser);
    fastify.get('/users', getUsers);
    fastify.get('/users/:id', getUserById);
    fastify.get('/users/email/:email', getUserByEmail);
    fastify.put('/users', { preHandler: authMiddleware }, updateUser);
    fastify.delete('/users', { preHandler: authMiddleware }, deleteUser);
};

module.exports = userRoutes;
