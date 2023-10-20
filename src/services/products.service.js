import {
  ProductModel
} from '../DAO/mongo/models/products.model.js';
import CustomError from "../services/errors/custom-error.js";
import EErrors from "../services/errors/enums.js";


export class ProductService {

  async getAllProducts(limit, page, query, sort) {
    const sortOption = sort == "asc" ? {
      price: 1
    } : {
      price: -1
    };
    const filter = query ? {
      category: query
    } : {};
    const products = await ProductModel.paginate(filter, {
      limit: limit,
      page: page,
      sort: sortOption,
    });
    return products;
  }

  async getById(id) {
    try{
    const product = await ProductModel.findById(id);
    return product;
    } catch(error){
        CustomError.createError({
          name: "product not found",
          message: `the product with the id: ${id} was not found`,
          code: EErrors.NOT_FOUND,
      });
      next(error)
    }
  }

  async addProduct(product) {
    const productCreated = await ProductModel.create(product);
    return productCreated;
  }

  async deleteProduct(_id) {
    const deletedProduct = await ProductModel.deleteOne({
      _id: _id
    });
    return deletedProduct;
  }

  async updateOne(id, newProduct) {
    if (!id) throw new Error('invalid _id');

    const uptadedProduct = await ProductModel.updateOne({
      _id: id
    }, newProduct);
    return uptadedProduct;
  }
}