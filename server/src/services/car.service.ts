import { CreateCarRequestBody } from "../interfaces/car.interface";
import { Car } from "../models";
import { ICar } from "../models/car.model";

/**
 * CarService class
 * @class CarService
 * @static createCar
 */
export default class CarService {
  /**
   * @static
   * @param {CreateCarRequestBody} body
   * @returns {Promise<any>}
   * @memberof CarService
   */
  static async createCar(body: CreateCarRequestBody): Promise<ICar> {
    return await Car.create({ ...body });
  }

  /**
   *  Get all cars
   * @param user  User id
   * @returns  {Promise<ICar[]>}
   */
  static async getAllCars(user: string): Promise<ICar[]> {
    return await Car.find({ user });
  }
}
