var Sequelize = require('sequelize'); 
var sequelize = new Sequelize('huasheng', 'root', 'root', {
    host: '127.0.0.1',
    dialect: 'mysql'
});

var UserModel = sequelize.define('users', {
	id: {type:Sequelize.BIGINT,primaryKey: true},
    email: Sequelize.STRING,
    pwd: Sequelize.STRING,
    nicheng: Sequelize.STRING,
    createtime:Sequelize.DATE,
    updtime:Sequelize.DATE,
    role:Sequelize.INTEGER
},{
		timestamps: false,
		//paranoid: true  //获取不到id的返回值
	});

module.exports = UserModel;