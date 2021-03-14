import crypto from 'crypto'
import withSession from '../../lib/session'
import dbConnect from '../../utils/dbConnect'
import User from '../../models/User'

export default withSession(async (req, res) => {
  const {email, password} = await req.body

  try {
    // we check that the user exists on GitHub and store some data in session
    await dbConnect()
    const user = await User.findOne({email})
    if (user) {
      const inputHash = await crypto
        .pbkdf2Sync(password, user.salt, 1000, 64, 'sha512')
        .toString('hex')
      if (user.hash === inputHash) {
        const session = {
          isLoggedIn: true,
          name: user.name,
          lastname: user.lastname,
          avatar: user.avatar ? user.avatar : null,
          email: user.email,
          number: user.number,
          role: user.role,
          id: user._id
        }
        req.session.set('user', session)
        await req.session.save()
        res.json(user)
      }
    } else throw new Error('User is not exist')
  } catch (error) {
    const {response: fetchResponse} = error
    res.status(fetchResponse?.status || 500).json(error.data)
  }
})
