// Import necessary classes from NestJS core and microservices modules.
import { NestFactory } from '@nestjs/core';  // Provides a method to create a NestJS application.
import { AppModule } from './app.module';  // Import the main application module which holds the configuration for the app.
import { MicroserviceOptions, Transport } from '@nestjs/microservices';  // Import types and transport options for microservices.

async function bootstrap() {
  // Create a microservice application using NestFactory.
  // The 'AppModule' is the root module that sets up the application context.
  // The 'MicroserviceOptions' interface specifies the configuration for the microservice.
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,  // Use TCP protocol for communication between microservices.
    options: {
      host: 'localhost',  // Host address where the microservice will be running.
      port: 3002,  // Port number on which the microservice will listen for incoming requests.
    },
  });

  // Start the microservice and make it listen for incoming messages.
  await app.listen();  // This method is asynchronous and waits until the microservice is fully initialized and listening.
}

// Call the bootstrap function to start the microservice.
bootstrap();
