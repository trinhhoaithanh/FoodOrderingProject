import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { responseArray, responseObject } from 'util/response-template';

@Injectable()
export class CategoriesService {
  prisma = new PrismaClient();

  // get all categories
  async getAllCategories() {
    try {
      const categories = await this.prisma.categories.findMany();
      return responseArray(
        200,
        'Get all categories successfully!',
        categories.length,
        categories,
      );
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }

  // Implement the GET/api/categories/{category_id}/items REST API to retrieves all items within a specific category.
  async findItemByCategoryId(category_id: number) {
    try {
      let checkCategory = await this.prisma.categories.findUnique({
        where: {
          category_id: Number(category_id),
        },
      });
      if (checkCategory) {
        let checkItem = await this.prisma.items.findMany({
          where: {
            category_id: Number(checkCategory.category_id),
          },
        });

        if (checkItem) {
          return responseObject(
            200,
            'Get items by id successfully!',
            checkItem,
          );
        } else {
          throw new NotFoundException(
            responseObject(404, 'Request is invalid', 'Item is not found!'),
          );
        }
      } else {
        throw new NotFoundException(
          responseObject(404, 'Request is invalid', 'Category is not found!'),
        );
      }
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }
}
