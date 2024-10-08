'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

const UserSchema = Schema({
    email: { type: String, unique: true, lowercase: true },
    displayName: String,
    avatar: String,
    password: { type: String, select: false },
    signupDate: { type: Date, default: Date.now() },
    lastLogin: { type: Date }
});

// Middleware que se ejecuta antes de guardar un usuario para guardar la password cifrada
// Si uso una arrow function this no se puede usar, por eso uso una function normal
UserSchema.pre('save', function(next) {
    let user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.gravatar = function() {
    // Si el usuario no ha introducido el email se crea un avatar por defecto (se emplea la libreria gravatar para ello)
    if (!this.email) {
        return 'https://gravatar.com/avatar/?s=200&d=retro';
    }

    const md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return `https://gravatar.com/avatar/${md5}/?s=200&d=retro`;
};

module.exports = mongoose.model('User', UserSchema);
