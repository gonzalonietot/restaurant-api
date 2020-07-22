import { Controller, Get, Post} from '@decorators/express'
import { ErrorHandler } from '../middlewares/error'
import NodeCache from  'node-cache'

@Controller ('/api/restaurant')
class RestaurantController {
  constructor() {
    this.cache = new NodeCache({ stdTTL: 3600, checkperiod: 3600 * 0.2, useClones: false })
  }

  @Post('/')
  async createRestaurant (req, res, next) {
    try {
      const { name, kindOfRestaurant, specials } = req.body
      if (!name || !kindOfRestaurant || !specials) {
        throw new ErrorHandler(400, `Missing data: name: ${name}, kindOfRestaurant: ${kindOfRestaurant}, specials: ${specials}`)
      }
      const restaurant = this.cache.get('restaurant')
      console.log(restaurant)
      if (restaurant.nombre === name ) {
        throw new ErrorHandler(400, 'There is already a restaurant with that name')
      }
      this.cache.set('restaurant', req.body)
      const restaurant1 = this.cache.get('restaurant')
      console.log(restaurant1, '1')
      return res.status(201).json('Created')
    } catch (e) {
      return next(e)
    }
  }

  @Get('/:kindOfRestaurant')
  async getInformation(req, res, next) {
    try {
      const { kindOfRestaurant } = req.params,
            restaurant = this.cache.get('restaurant'),
            restaurantInformation = restaurant.filter(p => {
              return p.kindOfRestaurant === kindOfRestaurant
             })
      return res.status(200).json(restaurantInformation)
    } catch (e) {
      return next(e)
    }
  }
}

export default RestaurantController