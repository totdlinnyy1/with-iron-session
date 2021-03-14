import dbConnect from '../../../utils/dbConnect'
import Order from '../../../models/Order'

export default async (req, res) => {
  if (req.method === 'POST') {
    const {id} = req.body
    await dbConnect()

    try {
      const result = await Order.find({id})
      const orders = result.map(doc => {
        const order = doc.toObject()
        order._id = order._id.toString()
        return order
      })
      return res.status(200).json(orders)
    } catch (e) {
      return res.status(500).send(e.message)
    }
  } else res.status(405).send('method_not_allowed')
}
