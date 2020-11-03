import { Injectable } from '@nestjs/common';
import { TaJsonSerialize } from 'r2-lcp-js/dist/es6-es2015/src/serializable';
import { OPDSFeed } from 'r2-opds-js/dist/es6-es2015/src/opds/opds2/opds2';
import { OPDSMetadata } from 'r2-opds-js/dist/es6-es2015/src/opds/opds2/opds2-metadata';
import { NAME } from './constants';
import { resolveSelfUrl } from './utils';


@Injectable()
export class AppService {

  getRootFeed() {

    const feed = new OPDSFeed();

    feed.Metadata = new OPDSMetadata();
    feed.Metadata.Title = NAME;

    feed.AddNavigation("public", resolveSelfUrl("/public"), "", "application/opds+json");
    feed.AddNavigation("local auth", resolveSelfUrl("/local"), "", "application/opds+json");
    feed.AddNavigation("local jwt", resolveSelfUrl("/localjwt"), "", "application/opds+json");
    feed.AddNavigation("basic auth", resolveSelfUrl("/basic"), "", "application/opds+json");

    const feedSerialized = TaJsonSerialize(feed);
    return feedSerialized;
  }
}
