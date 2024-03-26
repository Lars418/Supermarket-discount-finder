import {JSDOM} from "jsdom";
import {isAlcoholicBeverageOrSoftdrink, isNoUnwantedProduct} from "../config.js";

export default async function lidlAdapter(url, city){
    const response = await fetch(url);

    if (!response.ok) {
        return [
            {
                error: `Failed to fetch: ${response.status}`
            }
        ];
    }

    const result = await response.text();
    const dom = (new JSDOM(result)).window.document;
    const rawProducts = Array.from(dom.querySelectorAll('[data-selector="PRODUCT"]'));

    const products = rawProducts
        .map(product => {
        try {
            return JSON.parse(product.querySelector('div[data-grid-data]').dataset.gridData)[0];
        } catch (e) {
            console.log('Failed to parse JSON');
        }
        })
        .filter(product => product)
        .map(product => {
            return {
                name: product.fullTitle,
                baseQuantity: product.price.packaging ? product.price.packaging.text : null,
                baseUnit: product.price.basePrice ? product.price.basePrice.text : null,
                price: product.price.price,
                oldPrice: product.price.oldPrice,
                discountInPercentage: product.price.discount ? product.price.discount.percentageDiscount : null,
                specialDiscountPrice: null,
                specialDiscountInPercentage: null,
                image: product.image,
                tags: (product.ribbons || []).some(ribbon => ribbon.text.toUpperCase() === 'SPAREN MIT LIDL PLUS') ? [ 'LIDL Plus' ] : []
            };
        })
        .filter(product => isNoUnwantedProduct(product.name, product.description))
        .filter(product => isAlcoholicBeverageOrSoftdrink(product.name, product.description));

    return {
        products,
        supermarket: 'LIDL',
        city,
    }
}