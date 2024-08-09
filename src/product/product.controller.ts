// Import necessary decorators and classes from NestJS modules.
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';  // Decorators for defining routes and handling HTTP requests.
import { ProductService } from './product.service';  // Import the service that handles business logic related to products.
import { CreateProductDto } from './dto/create-product.dto';  // Import DTO for creating a product.
import { UpdateProductDto } from './dto/update-product.dto';  // Import DTO for updating a product.
import { MessagePattern } from '@nestjs/microservices';  // Decorator for handling messages in a microservice.

@Controller()  // Marks this class as a controller that handles incoming HTTP requests or messages.
export class ProductController {
  // The constructor injects the ProductService into this controller.
  // The service is used to perform operations related to products.
  constructor(private readonly productService: ProductService) { }

  // @MessagePattern({ cmd: 'add_product' }) decorator defines a pattern for handling messages with the command 'add_product'.
  // This method will be called when a message with this command is received by the microservice.
  // It takes the 'CreateProductDto' object from the message body and passes it to the ProductService to create a new product.
  @MessagePattern({ cmd: 'add_product' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);  // Call the create method of ProductService to add a new product.
  }

  // @MessagePattern({ cmd: 'get_products' }) decorator defines a pattern for handling messages with the command 'get_products'.
  // This method will be called when a message with this command is received.
  // It calls the ProductService to retrieve the list of all products.
  @MessagePattern({ cmd: 'get_products' })
  findAll() {
    return this.productService.findAll();  // Call the findAll method of ProductService to get all products.
  }

  // @Get(':id') decorator defines a route that listens for GET requests at the '/:id' endpoint.
  // It uses the ':id' parameter from the URL to fetch a specific product.
  // The 'findOne' method takes the 'id' from the URL, converts it to a number, and calls the ProductService to find the product.
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);  // Call the findOne method of ProductService with the product ID.
  }

  // @Patch(':id') decorator defines a route that listens for PATCH requests at the '/:id' endpoint.
  // It updates an existing product identified by the 'id' in the URL.
  // The 'update' method takes the 'id' and 'updateProductDto' from the request to update the product details.
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);  // Call the update method of ProductService to modify a product.
  }

  // @Delete(':id') decorator defines a route that listens for DELETE requests at the '/:id' endpoint.
  // It deletes a product identified by the 'id' in the URL.
  // The 'remove' method takes the 'id' from the URL and calls the ProductService to remove the product.
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);  // Call the remove method of ProductService to delete a product.
  }
}
/*
Explanation:
@Controller() Decorator: Marks the class as a controller in NestJS. It handles incoming requests and responses for the application.

@MessagePattern() Decorator: Used in a microservices context to handle messages with specific patterns. It is used for defining methods that respond to microservice commands.

@Get(':id'), @Patch(':id'), @Delete(':id') Decorators: Define HTTP routes and methods to handle HTTP requests. The :id is a route parameter, which allows the controller to capture and use specific parts of the URL.

@Body() Decorator: Used to extract and bind the body of the request to a method parameter. This is used for handling the data sent in POST and PATCH requests.

@Param('id') Decorator: Used to extract route parameters from the URL. It retrieves the id parameter for methods that handle GET, PATCH, and DELETE requests.

ProductService: A service class that contains the business logic related to products. The controller methods call this service to perform operations like creating, retrieving, updating, and deleting products.

By using these decorators and methods, the ProductController handles HTTP requests and microservice messages related to product operations. It interacts with the ProductService to perform the necessary actions and return the results.
*/