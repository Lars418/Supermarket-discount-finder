import edekaAdapter from "./adapter/edekaAdapter.js";
import kauflandAdapter from "./adapter/kauflandAdapter.js";

export const supermarkets = [
    {
        url: 'https://www.rewe.de/angebote/garrel/241055/rewe-markt-hauptstr-96/?week=current&categories=bier%2Cwein-und-spirituosen', // fuck WAF
        name: 'REWE',
        city: 'Garrel',
        hidden: true,
    },
    {
        url: 'https://www.edeka.de/api/offers?limit=999&marketId=142107',
        name: 'EDEKA',
        city: 'Cloppenburg',
        hidden: true,
    },
    {
        url: 'https://www.edeka.de/api/offers?limit=999&marketId=6280724',
        name: 'EDEKA',
        city: 'Molbergen',
        hidden: true,
    },
    {
        url: 'https://www.edeka.de/api/offers?limit=999&marketId=6280724',
        name: 'EDEKA',
        city: 'Emstek',
        hidden: true,
    },
    {
        url: 'https://filiale.kaufland.de/angebote/aktuelle-woche/uebersicht.category=08_Getr%C3%A4nke__Spirituosen.html',
        name: 'KAUFLAND',
        hidden: true,
    },
    {
        url: 'https://www.lidl.de/c/billiger-montag/a10006065?channel=store&tabCode=Current_Sales_Week#10019717',
        name: 'LIDL',
        hidden: true
    },
    {
        url: 'https://www.bonialserviceswidget.de/de/stores/DE-47692507/brochures?storeId=DE-47692507&publisherId=DE-47692065&limit=100&hasOffers=true&lng=8.05186&lat=52.8419', // get brochure-id
        custom: {
            brochureProductsUrl: 'https://www.bonialserviceswidget.de/de/v2/offers/{brochureId}?pages={pages}', // insert brocureId and page numbers (1,2,3,...)
        },
        name: 'FAMILA',
        city: 'Cloppenburg'
    },
    {
        url: 'https://www.bonialserviceswidget.de/de/stores/DE-134446537/brochures?storeId=DE-134446537&publisherId=DE-42265682&limit=100&hasOffers=true&lng=8.10837&lat=52.8117',
        custom: {
            brochureProductsUrl: 'https://www.bonialserviceswidget.de/de/v2/offers/{brochureId}?pages={pages}',
        },
        name: 'COMBI',
        city: 'Cappeln'
    },
    {
        url: 'https://www.netto-online.de/filialangebote/1/27999',
        custom: {
            cookie: 'netto_user_stores_id=2002',
        },
        name: 'NETTO',
        city: 'Cappeln'
    }
];

export function isNoUnwantedProduct(name, description) {
    if (name.toUpperCase().includes('MINERALWASSER')) {
        return false;
    }

    if (name.toUpperCase().includes('OETTINGER')) { // Pisse
        return false;
    }

    if ((description || '').toUpperCase().includes('FRUCHTSAFT')) {
        return false;
    }

    return true;
}

export const SUPERMARKET_ADAPTER_MAPPING = {
    REWE: null,
    EDEKA: edekaAdapter,
    KAUFLAND: kauflandAdapter,
}