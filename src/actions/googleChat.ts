import { FireCrawlLoader } from "@langchain/community/document_loaders/web/firecrawl";
import { RecursiveUrlLoader } from "@langchain/community/document_loaders/web/recursive_url";
import { compile } from "html-to-text";
import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import {
    PlaywrightWebBaseLoader,
    Page,
    Browser,
  } from "@langchain/community/document_loaders/web/playwright";

import { ApifyDatasetLoader } from "@langchain/community/document_loaders/web/apify_dataset";
import { Document } from "@langchain/core/documents";

export default async function generateGoogleVectorStore(){
    // const loader = new FireCrawlLoader({
    //     url: "https://developers.google.com/google-ads/api/docs/start", // The URL to scrape
    //     apiKey: process.env.FIRECRAWL_API_KEY, // Optional, defaults to `FIRECRAWL_API_KEY` in your env.
    //     mode: "crawl", // The mode to run the crawler in. Can be "scrape" for single urls or "crawl" for all accessible subpages
    //     params: {
    //       // optional parameters based on Firecrawl API docs
    //       // For API documentation, visit https://docs.firecrawl.dev
    //       crawlerOptions: {
    //         excludes: [],
    //         includes: [],
    //         limit: 100
    //       }
        
    //     },
    //   });
      
    //   const docs = await loader.load();
    //   console.log(docs)

    /**
     * Loader uses `page.evaluate(() => document.body.innerHTML)`
     * as default evaluate function
     **/

    const loader = await ApifyDatasetLoader.fromActorCall(
        "apify/website-content-crawler",
        {
          startUrls: [{ url: "https://developers.google.com/google-ads/api/docs" }],
        },
        {
          datasetMappingFunction: (item) =>
            new Document({
              pageContent: (item.text || "") as string,
              metadata: { source: item.url },
            }),
          clientOptions: {
            token: process.env.APIFY_API_TOKEN, // Or set as process.env.APIFY_API_TOKEN
          },
        }
    );
    const docs = await loader.load();
    console.log(docs)

}