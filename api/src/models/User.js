const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('User', {
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true
      },
      email: {
         type: DataTypes.STRING,
         allowNull: false,
         isEmail: true,
      },
      userName: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true
      },
      profilePicture:{
         type: DataTypes.TEXT,
         allowNull:true,
         defaultValue:"https://cdn.discordapp.com/attachments/781222020770693152/1140041535203848364/image.png"
      },
      password: {
         type: DataTypes.STRING,
         allowNull: false
      },
      favorites: {
         type: DataTypes.ARRAY(DataTypes.STRING),
         defaultValue: []
      }
   }, { timestamps: false });
};