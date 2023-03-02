import helmet from "helmet";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { ExecutionTimeInterceptor } from "./interceptors/execution-time.interceptor";
import { AllExceptionsFilter } from "./exceptions/all-exceptions.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Interceptors
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  app.useGlobalInterceptors(new ExecutionTimeInterceptor());

  // Security headers and cors
  app.getHttpAdapter().getInstance().set("etag", false);
  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: false,
      forbidUnknownValues: true,
    }),
  );

  // Swagger
  const config = new DocumentBuilder()
    .setTitle("Community Channel")
    .setDescription("The Vending Machine API description")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}
bootstrap();
