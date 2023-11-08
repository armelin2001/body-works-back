import "./utils/load-env";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as fs from "fs";
async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });

    const config = new DocumentBuilder()
        .setTitle("Body works")
        .setDescription(
            `
            Rotas sem necessidade de autenticação:
            /auth/login
            /usuario (POST)
            /usuario/login (POST)
            /usuario-academia (POST)
        `,
        )
        .addBearerAuth()
        .setVersion("1.0")
        .build();

    const document = SwaggerModule.createDocument(app, config);

    fs.writeFileSync("./body-works-api.json", JSON.stringify(document));
    SwaggerModule.setup("api", app, document);

    await app.listen(process.env.PORT || 3010);
}
bootstrap();
