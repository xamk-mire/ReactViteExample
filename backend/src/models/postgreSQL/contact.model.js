export default function(sequelize, Sequelize) {
    const Contact = sequelize.define("contact", {
      contactId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      firstName: {
        type: Sequelize.STRING,
        required: true
      },
      lastName: {
        type: Sequelize.STRING,
        required: true
      },
      twitter: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.STRING
      },
      favorite: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Contact;
  };