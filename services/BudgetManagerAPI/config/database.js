module.exports = (mongoose , config) => {
    const database = mongoose.connection;
    mongoose.Promise = Promise;
    
    mongoose.connect(config.database, {
        // useMongoClient: true, // has deprecated
        useNewUrlParser: true,
        promiseLibrary: global.Promise
    });
    
    database.on('error', error => console.log(`Connection to BudgetManager databse failed: ${error}`));
    
    database.on('connected', () => console.log('Connected to BudgetManager database'));
    
    database.on('disconnected', () => console.log('Disconnected from BudgetManager database'));
    
    process.on('SIGINT', () => {
        database.close(() => {
            console.log('BudgetManager terminated, connection closed');
            process.exit(0);
        });
    });
}