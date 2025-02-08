const User = require('../models/User');
const { compare } = require('bcryptjs');

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

const getUserByEmail = async (req, reply) => {
    const { email } = req.params;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return reply.status(404).send({ error: 'Usuário não encontrado' });

        return reply.send(user);
    } catch (error) {
        req.log.error(error);
        return reply.status(404).send({ error: 'Usuário não encontrado' });
    }
};

const updateUser = async (req, reply) => {
    const { name, email, department, password } = req.body;

    const { id } = req.user;
    if (!id) return reply.status(401).send({ error: 'Usuário não autorizado' });
    
    try {
        const user = await User.findByPk(id);
        if (!user) return reply.status(404).send({ error: 'Usuário não encontrado' });

        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) return reply.status(401).send({ error: 'Senha inválida' });

        user.name = name || user.name;
        user.email = email || user.email;
        user.department = department || user.department;

        await user.save();
        return reply.send(user);
    } catch (error) {
        req.log.error(error);
        return reply.status(500).send({ error: 'Erro atualizando usuário' });
    }
}

const deleteUser = async (req, reply) => {
    const { id } = req.user;
    if (!id) return reply.status(401).send({ error: 'Usuário não autorizado' });

    try {
        const user = await User.findByPk(id);
        if (!user) return reply.status(404).send({ error: 'Usuário não encontrado' });

        const { password } = req.body;
        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) return reply.status(401).send({ error: 'Senha inválida' });

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
    getUserByEmail,
    updateUser,
    deleteUser,
};