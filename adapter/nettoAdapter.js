import {JSDOM} from "jsdom";
import {isNoUnwantedProduct} from "../config.js";

export default async function nettoAdapter(url, city, name, custom){
    const response = await fetch(url, {
        headers: {
            Cookie: custom.cookie
        }
    });

    if (!response.ok) {
        return [
            {
                error: `Failed to fetch: ${response.status}`
            }
        ];
    }

    const result = await response.text();
    const dom = (new JSDOM(result)).window.document;
    const rawProducts = Array.from(dom.querySelectorAll('.product'));

    const products = rawProducts.map(product => {

        return {
            name: product.querySelector('.product__title').textContent,
            baseQuantity: product.querySelector('.product-property__base-price').textContent,
            baseUnit: product.querySelector('.product-property__bundle-text').textContent,
            price: +product.querySelector('.product__current-price').textContent.trim().replace('*', '').replace('.–', ''),
            description: product.querySelector('.product-property__description-short').textContent,
            oldPrice: Number.isNaN(+product.querySelector('.product__strike-price')) ? null : +product.querySelector('.product__strike-price').textContent.replace('statt').trim(),
            discountInPercentage: product.querySelector('.product__percent-saving__text')
                ? product.querySelector('.product__percent-saving__text').textContent.trim()
                : null,
            specialDiscountPrice: product.querySelector('strong span[style]') && product.querySelector('strong span[style]').textContent.toUpperCase().includes('NETTO-APP-PREIS:')
                ? +product.querySelector('strong span[style]').textContent.toUpperCase().replace('NETTO-APP-PREIS:', '').trim().split(' ')[0]
                : null,
            specialDiscountInPercentage: null,
            image: product.querySelector('img') ? product.querySelector('img').src : null
        };
    }).filter(product => isNoUnwantedProduct(product.name, product.description));

    return {
        products,
        supermarket: name,
        city,
    }
}