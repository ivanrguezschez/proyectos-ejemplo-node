import DBLocal from 'db-local'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

import { SALT_ROUNDS } from './config.js'

const { Schema } = new DBLocal({ path: './db' })

const User = Schema('User', {
  _id: { type: String, require: true },
  username: { type: String, require: true },
  password: { type: String, require: true }
})

export class UserRepository {
  static async create ({ username, password }) {
    // 1. validaciones de username (opcional usar la libreria de validaciones 'zod')
    Validation.username(username)
    Validation.password(password)

    // 2. asegurarse que el username no existe
    const user = User.findOne({ username })
    if (user) throw new Error('username already exists')

    const id = crypto.randomUUID()
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    User.create({
      _id: id,
      username,
      password: hashedPassword
    }).save()

    return id
  }

  static async login ({ username, password }) {
    // 1. validaciones de username (opcional usar la libreria de validaciones 'zod')
    Validation.username(username)
    Validation.password(password)

    // 2. asegurarse que el username existe
    const user = User.findOne({ username })
    if (!user) throw new Error('username does not exists')

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) throw new Error('credentials not valid')

    const { passwrod: _, ...publicUser } = user
    return publicUser
  }
}

class Validation {
  static username(username) {
    if (typeof username !== 'string') throw new Error('username must be a string')
    if (username.length < 3) throw new Error('username must be at least 3 characters long')
  }

  static password(password) {
    if (typeof password !== 'string') throw new Error('password must be a string')
    if (password.length < 6) throw new Error('password must be at least 3 characters long')
  }
}
