import {JSDOM} from "jsdom";

export default async function kauflandAdapter(url, city){
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
    const rawProducts = Array.from(dom.querySelectorAll('.m-offer-tile__link'));

    const products = rawProducts.map(product => {

        return {
            name: `${product.querySelector('h5').textContent.trim()} ${product.querySelector('h4').textContent.trim()}`,
            baseQuantity: product.querySelector('.m-offer-tile__quantity') ? product.querySelector('.m-offer-tile__quantity').textContent.trim() : null,
            baseUnit: product.querySelector('.m-offer-tile__basic-price') ? product.querySelector('.m-offer-tile__basic-price').textContent.trim() : null,
            price: product.querySelector('.a-pricetag:not(.a-pricetag--k-card) .a-pricetag__price') ? +(product.querySelector('.a-pricetag:not(.a-pricetag--k-card) .a-pricetag__price').textContent.trim()) : null,
            oldPrice: product.querySelector('.a-pricetag:not(.a-pricetag--k-card) .a-pricetag__old-price') && product.querySelector('.a-pricetag:not(.a-pricetag--k-card) .a-pricetag__old-price').textContent.trim() === 'nur'
                ? null
                : +(product.querySelector('.a-pricetag:not(.a-pricetag--k-card) .a-pricetag__old-price').textContent.trim()),
            discountInPercentage: product.querySelector('.a-pricetag__discount')
                .textContent
                .trim()
                .match(/-\d{1,3}%/)
                ? product.querySelector('.a-pricetag__discount').textContent.trim()
                : null,
            specialDiscountPrice: product.querySelector('.a-pricetag--discount.a-pricetag--k-card')
                ? +(product.querySelector('.a-pricetag.a-pricetag--k-card .a-pricetag__price').textContent.replace(/\*+/, '').trim())
                : null,
            specialDiscountInPercentage: product.querySelector('.a-pricetag--discount.a-pricetag--k-card')
            && product.querySelector('.a-pricetag--discount.a-pricetag--k-card .a-pricetag__discount').textContent.trim().match(/-\d{1,3}%/)
                ? product.querySelector('.a-pricetag--discount.a-pricetag--k-card .a-pricetag__discount').textContent.trim()
                : null,
            image: product.querySelector('img') ? product.querySelector('img').dataset.src : null
        };
    });

    return {
        products,
        supermarket: 'KAUFLAND',
        city,
    }
}