const db = require('../../database/models/index');

const apiUsersController = {
    index: async (req, res) => {
        db.User.findAll()
        .then ( users => {
            return res.status(200).json({
                count: users.length,
                users: users.map(user => ({
                    id : user.id,
                    name : user.first_name + ' ' + user.last_name,
                    detail : `http://localhost:3030/api/users/${user.id}`
                    //detail : `https://bem-cvku.onrender.com/api/users/${user.id}` url for deployed website
            }))
            })
        })
    },

    detail: async (req, res) => {
        try {
            const user = await db.User.findByPk(req.params.id, {
                include: [
                    {association: "addresses"},
                    {association: "userOrders"}
            ]})

            const orders = await db.Order.findAll({
                where: { user_id: req.params.id },
                include: [
                    { association: "users" },
                    { association: "orderDetails" }
                ]
            })
            
            let total = 0
            const total_orders = orders.length
            
            orders.forEach(order => {
                order.orderDetails.forEach(orderDetail => {
                    total += parseFloat(orderDetail.total_amount);
                })
            })

			return res.status(200).json({
                user: {
                    id : user.id,
                    name : user.first_name + ' ' + user.last_name,
                    dni : user.dni,
                    email : user.email,
                    country: user.addresses.country,
                    state: user.addresses.state,
                    city: user.addresses.city,
                    address: user.addresses.street + ' ' + user.addresses.street_number,
                    cp: user.addresses.cp,
                    total_orders : total_orders,
                    total_orders_amount : total.toFixed(2),
                    avatar: `https://res.cloudinary.com/dmqvbjyyi/image/upload/v1696350997/users/${user.avatar}`
                }
			})

        } catch (error) {
            console.log(error)
        }
	}
}

module.exports = apiUsersController