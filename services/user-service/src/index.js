const app = require('fastify')({ logger: true });
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./config/database');

// registra as rotas de usuários
app.register(userRoutes);

const startServer = async () => {
    try {
        // testa a conexão com o banco de dados
        await sequelize.authenticate();
        app.log.info('Conexão com o banco de dados estabelecida com sucesso.');

        // sincroniza as tabelas com o banco de dados
        await sequelize.sync();                 // não usar em produção
        app.log.info('Tabelas sincronizadas.');

        // inicia o servidor
        const USER_SERVICE_PORT = process.env.USER_SERVICE_PORT;
        await app.listen({ port: USER_SERVICE_PORT, host: '0.0.0.0' });
        app.log.info(`Serviço de usuários rodando em http://localhost:${USER_SERVICE_PORT}`);
    } catch (err) {
        // caso ocorra um erro, exibe o erro e encerra o processo
        app.log.error(err);
        process.exit(1);
    }
};
startServer();