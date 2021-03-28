import crypto from 'crypto'
import withSession from '../../../lib/session'
import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/User'

export default withSession(async (req, res) => {
  const data = await req.body

  try {
    // we check that the user exists on GitHub and store some data in session
    await dbConnect()
    const user = await User.findOne({_id: data.id})
    if (user) {
      const inputHash = await crypto
        .pbkdf2Sync(data.password, user.salt, 1000, 64, 'sha512')
        .toString('hex')
      if (user.hash === inputHash) {
        data['name'] = data.name ? data.name : user.name
        data['lastname'] = data.lastname ? data.lastname : user.lastname
        if (data.avatar) {
          await User.updateOne({_id: data.id}, {avatar: data.avatar})
        }
        await User.updateOne(
          {_id: data.id},
          {name: data.name, lastname: data.lastname}
        )
        const updateUser = await User.findOne({_id: data.id})
        const avatar = updateUser.avatar ? updateUser.avatar : null
        const session = {
          isLoggedIn: true,
          name: updateUser.name,
          lastname: updateUser.lastname,
          avatar,
          email: updateUser.email,
          number: updateUser.number,
          role: updateUser.role,
          id: updateUser._id
        }
        req.session.destroy()
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
