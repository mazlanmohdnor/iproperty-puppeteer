import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class ScrapperService {
  async getDataViaPuppeteer(location = '') {
    const URL = `https://www.iproperty.com.my/sale/all-residential/?q=${location}`;
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    await page.goto(URL, {
      waitUntil: 'networkidle2',
    });

    const results = await page.evaluate(() => {
      const propertyList = [];

      document
        .querySelectorAll('.ListingsListstyle__ListingListItemWrapper-bmHwPm')
        .forEach((z) => {
          const tempImgList = [];

          z.querySelectorAll(
            '.ListingImageCarouselstyle__CarouselWrapper-dtbMQB.jibwWZ.Premium picture',
          ).forEach((x) => {
            if (x.querySelector('img').src)
              tempImgList.push(x.querySelector('img').src);
          });

          const data = {
            title: z.querySelector('.detail-property > div > h2')?.textContent,
            price: z.querySelector('.listing-price > ul > li')?.textContent,
            pricePSF: z.querySelector('.listing-price > div')?.textContent,
            address: z.querySelector(
              '.detail-property > div > div.PremiumCardstyle__AddressWrapper-ldsjqp.gRJjrp',
            )?.textContent,
            descriptionItem: z.querySelector(
              '.detail-property .attributes-description > p',
            )?.textContent,
            bedroomCount: z.querySelector('.bedroom-facility')?.textContent,
            bathroomCount: z.querySelector('.bathroom-facility')?.textContent,
            carparkCount: z.querySelector('.carPark-facility')?.textContent,
            agentContact: z
              .querySelector('a.phone-mobile')
              .getAttribute('href'),
            propertyUrl: z
              .querySelector('.depth-listing-card-link')
              .getAttribute('href'),
            postedBy: z.querySelector('#listing-heading-title')?.textContent,
            postedDate: z.querySelector(
              '.ListingHeadingstyle__HeadingCreationDate-hVckGQ',
            )?.textContent,
            imgList: tempImgList,
          };

          propertyList.push(data);
        });

      return propertyList;
    });

    console.log('getDataViaPuppeteer results :', results);
    await browser.close();
    return results;
  }
}
