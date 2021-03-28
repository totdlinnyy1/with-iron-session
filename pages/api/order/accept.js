import dbConnect from '../../../utils/dbConnect'
import Order from '../../../models/Order'

export default async (req, res) => {
  if (req.method === 'POST') {
    await dbConnect()

    try {
      const {
        orderId,
        status,
        farmerId,
        email,
        number,
        name,
        lastname,
        avatar
      } = req.body
      const updateOrder = await Order.updateOne(
        {_id: orderId},
        {
          status,
          farmer: {
            farmerId,
            name,
            lastname,
            email,
            number,
            avatar
          }
        }
      )

      return res.status(200).send('')
    } catch (e) {
      console.log(e.message)
      return res.status(500).send(e.message)
    }
  } else res.status(422).send('req_method_not_supported')
}
