import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import CarService from "../services/car.service";
import { generateUniqueFileName } from "../utils/generateFileName";
import path from "node:path";
export const carController = {
  /**
   * @route POST /car
   * @desc Create a car
   */
  create: catchAsync(async (req: Request, res: Response) => {
    console.log(req.body);
    // save the images
    const images = req.files?.pictures;
    const pictures = [];
    if (images) {
      if (Array.isArray(images)) {
        images.forEach((image) => {
          let imageName = generateUniqueFileName(15);
          const fileName = `${imageName}${path.extname(image.name)}`;
          const filePath = `${path.join(
            process.cwd()
          )}/src/public/uploads/${fileName}`;
          image.mv(filePath);
          pictures.push(fileName);
        });
      } else {
        let imageName = generateUniqueFileName(15);
        const fileName = `${imageName}${path.extname(images?.name as string)}`;
        const filePath = `${path.join(
          process.cwd()
        )}/src/public/uploads/${fileName}`;
        images?.mv(filePath);
        pictures.push(fileName);
      }
    }

    req.body.pictures = pictures;
    const response = await CarService.createCar({
      ...req.body,
      user: req.user.id,
    });
    res.status(201).json(response);
  }),

  /**
   * @route GET /car
   * @desc Get all cars
   */
  getAll: catchAsync(async (req: Request, res: Response) => {
    const response = await CarService.getAllCars(req.user.id);
    res.status(200).json(response);
  }),
};
