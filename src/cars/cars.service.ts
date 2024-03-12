import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    // {
    //   id: uuid(),
    //   brand: 'Toyota',
    //   model: 'Corolla',
    // },
    // {
    //   id: uuid(),
    //   brand: 'Honda',
    //   model: 'Civic',
    // },
    // {
    //   id: uuid(),
    //   brand: 'Jeep',
    //   model: 'Cherokee',
    // },
  ];

  findAll() {
    return this.cars;
  }

  findById(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id ${id} not found`);

    return car;
  }

  createCar(createCarDto: CreateCarDto) {
    const car = {
      id: uuid(),
      ...createCarDto,
    };
    this.cars.push(car);
    return car;
  }

  updateCar(id: string, updateCarDto: UpdateCarDto) {
    let carDB = this.findById(id);

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = { ...carDB, ...updateCarDto, id };
        return carDB;
      }
      return car;
    });

    return carDB;
  }

  deleteCar(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const car = this.findById(id);
    this.cars = this.cars.filter((car) => car.id !== id);
  }

  fillCarsWithSeedData( cars: Car[] ) {
    this.cars = cars;
}

}
