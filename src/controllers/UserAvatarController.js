const knex = require('../database/knex')
const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")


class UserAvatarController {
  async update(req, res) {
    const { id: user_id } = req.user
    const avatarFileName = req.file.filename
    const diskStorage = new DiskStorage()
    const user = await knex('users').where({ id: user_id }).first()


    if (!user) {
      throw new AppError('Usuário não encontrado', 404)
    }
    if (user.avatar) {
      diskStorage.deleteFile(user.avatar)
    }


    const filename = await diskStorage.saveFile(avatarFileName)
    user.avatar = filename


    await knex('users').update(user).where({ id: user_id })
    return res.json()
  }

}

module.exports = UserAvatarController