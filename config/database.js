import { Sequelize } from 'sequelize'; // Import Sequelize constructor
import dotenv from 'dotenv'; // Import dotenv to load environment variables
 
// Load environment variables from .env file
dotenv.config();
 
// Create a new instance of Sequelize to connect to the database
const sequelize = new Sequelize(
  process.env.DB_NAME,      // Database name
  process.env.DB_USER,      // Database user
  process.env.DB_PASSWORD,   // Database password
  {
    host: process.env.DB_HOST, // Database host
    dialect: 'mysql',         
  }
);
 
// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
 
// Export the sequelize instance for use in other parts of the application
export default sequelize;