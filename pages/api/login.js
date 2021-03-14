import bcrypt from 'bcrypt'
import withSession from '../../lib/session'
import dbConnect from '../../utils/dbConnect'
import User from '../../models/User'

export default withSession(async (req, res) => {
  const { email, password } = await req.body


  try {
    // we check that the user exists on GitHub and store some data in session
    await dbConnect()
    const user = await User.findOne({email})
    const matchPassword = await bcrypt.compare(password, user.hash)
    if (matchPassword) {

      const session = { isLoggedIn: true, name: user.name, lastname: user.lastname, avatar: user.avatar }
      req.session.set('user', session)
      await req.session.save()
      res.json(user)
    }
  } catch (error) {
    const { response: fetchResponse } = error
    res.status(fetchResponse?.status || 500).json(error.data)
  }
})
