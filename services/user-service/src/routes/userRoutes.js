const { createUser, getUsers, getUserById, getUserByEmail, updateUser, deleteUser } = require('../controllers/userController');

const userRoutes = async (fastify, options) => {
    fastify.post('/users', createUser);
    fastify.get('/users', getUsers);
    fastify.get('/users/:id', getUserById);
    fastify.get('/users/email/:email', getUserByEmail);
    fastify.put('/users/:id', updateUser);
    fastify.delete('/users/:id', deleteUser);
};

module.exports = userRoutes;
