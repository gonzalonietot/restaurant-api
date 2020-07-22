import RestaurantController from '../controllers/restaurant'
import { attachControllers } from '@decorators/express'
import { handleError } from '../middlewares/error'

class CustomRoutes {
  constructor (app) {
    this.app = app
  }
  createRoutes () {
    attachControllers(this.app, [
      RestaurantController
    ])
    this.app.use((err, req, res, next) => { handleError(err, res) })
  }
}

export default CustomRoutes