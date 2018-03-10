"use strict";

module.exports = function (sequelize, DataTypes) {
    var Message = sequelize.define('Message', {
        username: DataTypes.STRING,
        text: DataTypes.STRING
    });

    return Message;
};