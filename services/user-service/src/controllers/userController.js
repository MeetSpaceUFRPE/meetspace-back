const User = require('../models/User');

const createUser = async (req, reply) => {
    const { email, password, name, department } = req.body;
    try {
        const user = await User.create({ email, password, name, department });
        return reply.status(201).send(user);
    } catch (error) {
        req.log.error(error);
        return reply.status(400).send({ error: 'Erro criando usuário' });
    }   
};

const getUsers = async (req, reply) => {
    try {
        const users = await User.findAll();
        return reply.send(users);
    } catch (error) {
        req.log.error(error);
        return reply.status(500).send({ error: 'Erro buscando usuários' });
    }
};

const getUserById = async (req, reply) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) return reply.status(404).send({ error: 'Usuário não encontrado' });

        return reply.send(user);
    } catch (error) {
        req.log.error(error);
        return reply.status(404).send({ error: 'Usuário não encontrado' });
    }
};

const updateUser = async (req, reply) => {
    const { id } = req.params;
    const { name, department } = req.body;
    
    try {
        const user = await User.findByPk(id);
        if (!user) return reply.status(404).send({ error: 'Usuário não encontrado' });

        user.name = name || user.name;
        user.department = department || user.department;

        await user.save();
        return reply.send(user);
    } catch (error) {
        req.log.error(error);
        return reply.status(500).send({ error: 'Erro atualizando usuário' });
    }
}

const deleteUser = async (req, reply) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) return reply.status(404).send({ error: 'Usuário não encontrado' });

        await user.destroy();
        return reply.status(204).send({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        req.log.error(error);
        return reply.status(500).send({ error: 'Erro deletando usuário' });
    }
};

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
};