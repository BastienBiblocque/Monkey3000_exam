module.exports = (sequelize, DataTypes) => {

    var cages = sequelize.define('cages', {
     Number : DataTypes.INTEGER
    });

    return cages;
  };