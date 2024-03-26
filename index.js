import {SUPERMARKET_ADAPTER_MAPPING, supermarkets} from "./config.js";

const SUPERMARKET_DISCOUNTS = [];

for (const supermarket of supermarkets) {
    if (supermarket.hidden) {
        continue;
    }

    const response = await SUPERMARKET_ADAPTER_MAPPING[supermarket.name](supermarket.url, supermarket.city, supermarket.custom);

    console.log(`Fetched supermarket: ${supermarket.name}`);
}