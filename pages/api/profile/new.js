import dbConnect from '../../../utils/dbConnect'
import Order from '../../../models/Order'

export default async (req, res) => {
  if (req.method === 'POST') {
    await dbConnect()
    const data = req.body
    try {
      const order = new Order(data)
      await order.save()
      return res.status(200).send('')
    } catch (e) {
      console.log(e.message)
      return res.status(500).send(e.message)
    }
  } else res.status(422).send('req_method_not_supported')
}
