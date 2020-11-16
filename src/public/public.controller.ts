import { PubFeedService } from "src/pub-feed/pub-feed.service";

import { Controller, Get } from "@nestjs/common";

@Controller('public')
export class PublicController {
    constructor(private readonly pubFeedService: PubFeedService) { }

    @Get()
    entryPoint() {
        return this.pubFeedService.pubFeed();
    }

}
