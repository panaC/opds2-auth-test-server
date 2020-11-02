import { HttpService, Injectable } from '@nestjs/common';
import { debug } from 'console';
import { TaJsonDeserialize, TaJsonSerialize } from 'r2-lcp-js/dist/es6-es2015/src/serializable';
import { OPDSFeed } from 'r2-opds-js/dist/es6-es2015/src/opds/opds2/opds2';
import { OPDSMetadata } from 'r2-opds-js/dist/es6-es2015/src/opds/opds2/opds2-metadata';
import { OPDSPublication } from 'r2-opds-js/dist/es6-es2015/src/opds/opds2/opds2-publication';
import { Publication } from 'r2-shared-js/dist/es6-es2015/src';
import { STATIC_SERVER_URL, STREAMER_SERVER_URL } from 'src/constants';
import { IStaticServerModel } from 'src/model/static.interface';
import { resolve } from 'url';

const encodeURIComponent_RFC3986 = (str: string) =>
    encodeURIComponent(str)
        .replace(/[!'()*]/g, (c) => "%" + c.charCodeAt(0).toString(16));

@Injectable()
export class PublicService {
    constructor(private httpService: HttpService) { }

    public async publicFeed() {

        console.log("publicFeedService");

        const staticServerPublicUrl = resolve(STATIC_SERVER_URL, "/public/");
        console.log("static server url", staticServerPublicUrl);

        const feed = new OPDSFeed();

        feed.Metadata = new OPDSMetadata();
        feed.Metadata.Title = "public feed";

        console.log("get", staticServerPublicUrl);
        
        const http = this.httpService.get(staticServerPublicUrl);
        const res = await http.toPromise();
        if (
            res.status === 200 &&
            typeof res.data === "object" &&
            Array.isArray(res.data)
        ) {

            console.log("get OK");
            
            const data = res.data as IStaticServerModel[];
            const fileArray = data.filter((v) => typeof v.name === "string");

            console.log("fileArray", fileArray);
            

            const opdsPublicationArrayPromise = fileArray.map(async (file) => {
                
                const fileName = file.name;

                console.log(">>", fileName);

                const pub = new OPDSPublication();

                const epubFileUrl = resolve(staticServerPublicUrl, fileName);
                // const epubFileUrlEncoded = Buffer.from(encodeURIComponent_RFC3986(epubFileUrl).toString("base64");
                // const epubFileUrlEncoded = encodeURIComponent_RFC3986(epubFileUrl);
                const epubFileUrlEncoded = Buffer.from(epubFileUrl).toString("base64");
                console.log(epubFileUrlEncoded);
                const streamerFileUrl = resolve(STREAMER_SERVER_URL, epubFileUrlEncoded);
                const streamerFileUrlManifest = streamerFileUrl + "/manifest.json"; // no resolve: ended with .epub

                console.log(epubFileUrl, streamerFileUrl);

                console.log("get ",streamerFileUrlManifest);
                
                const http = this.httpService.get(streamerFileUrlManifest);
                const res = await http.toPromise();
                if (
                    res.status === 200 &&
                    typeof res.data === "object"
                ) {
                    console.log("get ok");
                    

                    const r2Publication = TaJsonDeserialize(res.data, Publication);
                    
                    if (typeof r2Publication.Metadata === "object") {
                        pub.Metadata = r2Publication.Metadata;
                    }

                    const coverLink = r2Publication.searchLinkByRel("cover");
                    if (coverLink) {
                        pub.AddImage(
                            resolve(streamerFileUrlManifest, coverLink.Href),
                            coverLink.TypeLink,
                            coverLink.Height, coverLink.Width);
                    }

                    pub.AddLink_(epubFileUrl, "application/epub+zip", "http://opds-spec.org/acquisition/open-access", "");
                    pub.AddLink_(streamerFileUrlManifest, "application/webpub+json", "http://opds-spec.org/acquisition/open-access", "");

                    return pub;
                } else {
                    console.log("get ko", res.status, res.headers, typeof res.data);
                }

                return undefined;
            });

            const pubsPromise = opdsPublicationArrayPromise.map(async (p) => {
                try {
                    return await p;
                } catch (e) {

                    debug(e.toString());
                    return undefined;
                }
            });
            const pubsNotFiltered = await Promise.all(pubsPromise);
            const pubs = pubsNotFiltered.filter((v) => !!v);

            console.log("pubs loaded");

            feed.Publications = pubs;
        } else {
            console.log("get ko", res.status, res.headers);
            
        }

        return TaJsonSerialize(feed);
    }
}
