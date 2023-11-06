import "./utils/load-env";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    const config = new DocumentBuilder()
        .setTitle("Body works")
        .setDescription("Api do projeto body works")
        .setVersion("1.0")
        .addTag("body works")
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);

    await app.listen(process.env.PORT || 3010);
}
bootstrap();
