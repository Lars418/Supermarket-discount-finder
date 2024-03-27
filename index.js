import {SUPERMARKET_ADAPTER_MAPPING, supermarkets} from "./config.js";
import {createEmail} from "./createEmail.js";
import fs from 'fs';
import nodemailer from "nodemailer";
import 'dotenv/config';


Date.prototype.getWeekNumber = function(){
    const d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
};

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
console.log('Email content created!');

const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const response = await transporter.sendMail({
    from: {
        name: 'Lars Alkoholradar',
        address: process.env.EMAIL_ADDRESS
    },
    to: 'meteorgamer99@gmail.com',
    subject: `Lars Alkoholradar - KW ${new Date().getWeekNumber()}`,
    text: email,
    html: email,
});

console.log('Email send!');