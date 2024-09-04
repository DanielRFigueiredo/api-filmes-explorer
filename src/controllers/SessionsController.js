const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const { compare } = require('bcryptjs')

const { sign } = require('jsonwebtoken')
const { jwt } = require('../configs/auth')

class SessionsController {
  async create(req, res) {
    const { email, password } = req.body
    const user = await knex('users').where({ email }).first()
    
    if (!user) {
      throw new AppError('Email ou/e Senha Incorretos', 401)
    }
    const checkMatchPassword = await compare(password, user.password)
    
    if (!checkMatchPassword) {
      throw new AppError('Email ou/e Senha Incorretos', 401)
    }
    
    const token = sign({}, jwt.secret, {
      subject: String(user.id),
      expiresIn: jwt.expiresIn
    })
    
    res.json({ user, token })
  }
}


module.exports = SessionsController;