import { Body, Controller, Get, Post } from "@nestjs/common";
import { AppDto } from "./app.dto";

@Controller()
export class AppController {
    @Get()
    getHello(): string {
        return "success";
    }
    @Post()
    postHello(@Body() body: AppDto): string {
        return body.name;
    }
}