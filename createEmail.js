function chunkProducts(products) {
    const chunkedProducts = [
        []
    ];
    let index = 0;
    for (const product of products) {
        if (chunkedProducts[index].length < 4) {
            chunkedProducts[index].push(product);
        } else {
            chunkedProducts.push([product]);
            index++;
        }
    }

    return chunkedProducts;
}

export function createEmail(supermarketDiscounts) {
    const formatter = new Intl.NumberFormat('de', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2
    })
    const header = `
        <html lang="de" style="margin: 0;padding: 0;font-size: 16px;font-family: Arial, sans-serif;background-color: #eaeaea;">
            <head>
                <title>Lars Alkohol Radar</title>
                <meta charset="utf-8">
                <style>
                    img.g-img + div {display:none;}
                </style>
            </head>
            <body style="margin: 0;padding: 0;font-size: 16px;font-family: Arial, sans-serif;background-color: #eaeaea;">
                <a href="#">
                    <h1 style="text-align: center">
                        <img
                            src="https://raw.githubusercontent.com/Lars418/supermarket-discount-finder/main/img/alkoholradar.png"
                            alt="Lars Alkohol Radar"
                            draggable="false"
                            style="max-width: 1050px;width:100%"
                        >
                    </h1>
                </a>
                
                <strong style="display:block;text-align: center;color:red;">Einige E-Mail-Anbieter kürzen die E-Mail. Sofern am Ende der E-Mail "Vollständige Nachricht ansehen" steht, bitte unbedingt darauf klicken, da ansonsten nicht alle Angebote angezeigt werden.</strong>
                
                <hr>
    `;

    let body = '';

    for (const supermarket of supermarketDiscounts) {
                const productRows = chunkProducts(supermarket.products);

        body += '<table style="margin:2rem auto; border: none;border-spacing: 0.25rem;"><tbody>';

        body += `
            <tr>
                <td colspan="4">
                    <h2 style="margin: 0 0 0.5rem 0;">${supermarket.supermarket} (${supermarket.city || 'bundesweit'})</h2>
                </td>
            </tr>
        `;

        if (supermarket.validity) {
            body += `
            <tr>
                <td colspan="4">
                    <p style="margin: 0;">Gültig vom ${new Date(supermarket.validity.from).toLocaleDateString()} bis zum ${new Date(supermarket.validity.until).toLocaleDateString()}</p>
                </td>
            </tr>`;
        }

        for (const row of productRows) {
            let tr = `<tr>`;

            for (const product of row) {
                tr += `
                    <td>
                       <div style="width: 250px;height:400px;padding: 0.25rem;background-color: #d5d5d5;">
                           <div style="background-color: white;height: 244px;position: relative;margin: auto;padding: .25rem;">
                                <img src="${product.image}" alt="" draggable="false" style="text-align: center;vertical-align: center;width: 220px;height: 200px;object-fit: contain;">
                                <div style="text-align: right;font-size: 1.25rem;font-weight: bold;color: red;">
                                    ${product.oldPrice ? `<span style="text-decoration: line-through;display:inline-block;margin-right:0.5rem;">${formatter.format(product.oldPrice)}</span>` : ''}
                                    <span>${formatter.format(product.price)}</span>
                                </div>
                           </div> 
                           <h3 style="word-break: break-all;">${product.name}</h3>
                           
                           ${product.specialDiscountPrice ? `<h5 style="margin: 0; color: darkgray;font-size: 0.85rem;">Gesonderter Rabatt (z.B. mit Kundenkarte o.ä.): ${formatter.format(product.specialDiscountPrice)} ${product.specialDiscountInPercentage ? `(${product.specialDiscountInPercentage})` : ''}</h5>` : ''}    
                           ${product.discountInPercentage ? `<p style="margin: 0; color: darkgray;font-size: 0.85rem;">Rabatt in Prozent: ${product.discountInPercentage}</p>` : ''}
                           
                           ${product.description ? `<p style="margin: 0; color: darkgray;font-size: 0.85rem;">${product.description}</p>` : ''}          
                        </div>             
                    </td>
                `;
            }

            tr += `</tr>`;

            body += tr;
        }

        body += '</tbody></table>'
    }

    const footer = `
        </body>
        </html>
    `;

    return header + body + footer;
}