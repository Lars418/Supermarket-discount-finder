export const supermarkets = [
    {
        url: 'https://www.rewe.de/angebote/garrel/241055/rewe-markt-hauptstr-96/?week=current&categories=bier%2Cwein-und-spirituosen', // fuck WAF
        supermarket: 'Rewe',
        city: 'Garrel'
    },
    {
        url: 'https://www.edeka.de/eh/minden-hannover/edeka-husmann-pingel-anton-str.-4-6/angebote.jsp',
        supermarket: 'EDEKA',
        city: 'Cloppenburg',
    },
    {
        url: 'https://www.edeka.de/eh/minden-hannover/edeka-vera-rabal-alter-sch%C3%BCtzenplatz-1/angebote.jsp',
        supermarket: 'EDEKA',
        city: 'Molbergen',
    },
    {
        url: 'https://www.edeka.de/eh/minden-hannover/edeka-gemoll-am-m%C3%BChlencenter-17/angebote.jsp',
        supermarket: 'EDEKA',
        city: 'Emstek'
    },
    {
        url: 'https://filiale.kaufland.de/angebote/aktuelle-woche/uebersicht.category=08_Getr%C3%A4nke__Spirituosen.html',
        supermarket: 'Kaufland',
    },
    {
        url: 'https://www.lidl.de/c/billiger-montag/a10006065?channel=store&tabCode=Current_Sales_Week#10019717',
        supermarket: 'LIDL',
    },
    {
        url: 'https://www.bonialserviceswidget.de/de/stores/DE-47692507/brochures?storeId=DE-47692507&publisherId=DE-47692065&limit=100&hasOffers=true&lng=8.05186&lat=52.8419', // get brochure-id
        custom: {
            brochureProductsUrl: 'https://www.bonialserviceswidget.de/de/v2/offers/{brochureId}?pages={pages}', // insert brocureId and page numbers (1,2,3,...)
        },
        supermarket: 'Famila',
        city: 'Cloppenburg'
    },
    {
        url: 'https://www.bonialserviceswidget.de/de/stores/DE-134446537/brochures?storeId=DE-134446537&publisherId=DE-42265682&limit=100&hasOffers=true&lng=8.10837&lat=52.8117',
        custom: {
            brochureProductsUrl: 'https://www.bonialserviceswidget.de/de/v2/offers/{brochureId}?pages={pages}',
        },
        supermarket: 'Combi',
        city: 'Cappeln'
    },
    {
        url: 'https://www.netto-online.de/filialangebote/1/27999',
        custom: {
            cookie: 'netto_user_stores_id=2002',
        },
        supermarket: 'Netto',
        city: 'Cappeln'
    }
];