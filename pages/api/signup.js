import crypto from 'crypto'
import withSession from '../../lib/session'
import dbConnect from '../../utils/dbConnect'
import User from '../../models/User'

export default withSession(async (req, res) => {
  const {email, password, role, name, lastname, number} = await req.body

  try {
    // we check that the user exists on GitHub and store some data in session
    await dbConnect()
    const userExist = await User.findOne({email})
    if (!userExist) {
      const salt = await crypto.randomBytes(16).toString('hex')
      const hash = await crypto
        .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
        .toString('hex')
      const user = new User({email, name, lastname, number, role, hash, salt})
      const task = await user.save()
      const session = {
        isLoggedIn: true,
        name: task.name,
        lastname: task.lastname,
        email: task.email,
        number: task.number,
        role: task.role,
        id: task._id,
        avatar: task.avatar ? task.avatar : null
      }
      req.session.set('user', session)
      await req.session.save()
      res.json(session)
    } else throw new Error('User exist')
  } catch (error) {
    const {response: fetchResponse} = error
    res.status(fetchResponse?.status || 500).json(error.data)
  }
})
