import {isAlcoholicBeverageOrSoftdrink, isNoUnwantedProduct} from "../config.js";

export default async function buentingAdapter(url, city, name, custom){
    const response = await fetch(url);

    if (!response.ok) {
        return [
            {
                error: `Failed to fetch: ${response.status}`
            }
        ];
    }

    const result = await response.json();
    const discountBrochure = result.brochures.find(brochure => brochure.hasOffers && brochure.title.toUpperCase() === 'MARKT - ANGEBOTE');

    if (!discountBrochure) {
        return {
            products: [],
            supermarket: 'FAMILA',
            city,
        }
    }

    const brochureUrl = custom.brochureProductsUrl
        .replace('{brochureId}', discountBrochure.id)
        .replace('{pages}', [...Array(discountBrochure.pageCount).keys()].join(','));
    const productsResponse = await fetch(brochureUrl);

    if (!productsResponse.ok) {
        return [
            {
                error: `Failed to fetch products: ${productsResponse.status}`
            }
        ];
    }

    const productsResult = await productsResponse.json();
    const products = productsResult.map(product => {
        return {
            name: `${product.products[0].brandName || ''} ${product.products[0].name}`.trim(),
            description: product.products[0].description.join('\n').trim(),
            baseQuantity: product.deals[0].price,
            baseUnit: product.deals[0].priceByBaseUnit,
            price: product.deals[0].minAmount,
            oldPrice: null,
            discountInPercentage: null,
            specialDiscountPrice: null,
            specialDiscountInPercentage: null,
            image: product.products[0].images.length > 0 ? product.products[0].images[0] : null,
            tags: product.deals.length > 1
                ? product.deals.map(deal => `${deal.description}: ${deal.minAmount}`)
                : []
        };
        })
        .filter(product => isNoUnwantedProduct(product.name, product.description))
        .filter(product => isAlcoholicBeverageOrSoftdrink(product.name, product.description))

    return {
        products,
        supermarket: name,
        city,
        validity: {
            from: discountBrochure.validFrom,
            until: discountBrochure.validUntil
        }
    }
}