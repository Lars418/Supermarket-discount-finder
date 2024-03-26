import {SUPERMARKET_ADAPTER_MAPPING, supermarkets} from "./config.js";
import {createEmail} from "./createEmail.js";
import fs from 'fs';

const SUPERMARKET_DISCOUNTS = [];

for (const supermarket of supermarkets) {
    if (supermarket.hidden) {
        continue;
    }

    const response = await SUPERMARKET_ADAPTER_MAPPING[supermarket.name](supermarket.url, supermarket.city, supermarket.name, supermarket.custom);
    SUPERMARKET_DISCOUNTS.push(response);

    console.log(`Fetched supermarket: ${supermarket.name}`);
}

const email = createEmail(SUPERMARKET_DISCOUNTS);

fs.writeFileSync('./email.html', email);
console.log(email);