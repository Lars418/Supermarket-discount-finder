import {isNoUnwantedProduct} from "../config.js";

export default async function edekaAdapter(url, city) {
    const response = await fetch(url);

    if (!response.ok) {
        return [
            {
                error: `Failed to fetch: ${response.status}`
            }
        ];
    }

    const result = await response.json();

    const products =  result.offers
            .filter(product => product.category.name === 'Getränke')
            .map(product => ({
                name: product.title || '',
                price: product.price.rawValue,
                descriptions: product.description || '',
                tags: product.criteria ? product.criteria.map(x => x.name) : [],
                additional: product.additionalTextApp,
                baseUnit: product.baseUnit,
                basicPrice: product.basicPrice,
                image: product.images ?  product.images.original : null,
            }))
            .filter(product => isNoUnwantedProduct(product.name, product.description));

    return {
        products,
        supermarket: 'EDEKA',
        city,
        validity: {
            from: result.validFrom,
            until: result.validTill
        }
    }
}