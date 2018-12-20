module.exports = (sequelize, DataTypes) => {
	
    var singes = sequelize.define('singes', {
      Nom: DataTypes.STRING,
      Race: DataTypes.STRING,
      Age: DataTypes.INTEGER,
      Cage : DataTypes.INTEGER
    });
  
    return singes;
  };
