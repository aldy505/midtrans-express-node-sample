# Midtrans Express Node Sample

![GitHub branch checks state](https://img.shields.io/github/checks-status/aldy505/midtrans-express-node-sample/master?style=flat-square) ![GitHub issues](https://img.shields.io/github/issues-raw/aldy505/midtrans-express-node-sample?style=flat-square) ![Libraries.io dependency status for GitHub repo](https://img.shields.io/librariesio/github/aldy505/midtrans-express-node-sample?style=flat-square) ![GitHub](https://img.shields.io/github/license/aldy505/midtrans-express-node-sample?style=flat-square)

This is just a simple example of using Snap Midtrans payment without Midtrans Package for Node JS. Feel free to give a Pull Request or issues. Scroll down for [Indonesian version](#memulai) of this README.

## Getting Started

* Clone this repository
* `npm install` to install all required dependencies.
* Install MySQL Community Edition on your local machine
* Change `.env.example` file to `.env`, and fill up the rest.
* `npm run dev` to start the local server. Or `npm run dev:ts` to start Typescript server.

## Code Overview

### Dependencies

* [Express](https://github.com/expressjs/express) - Server handling
* [Cors](https://github.com/expressjs/cors) - CORS middleware for Express
* [Dotenv](https://github.com/motdotla/dotenv) - Injecting `process.env` with contents from `.env` file
* [Knex](https://github.com/knex/knex) - SQL Query builder
* [Mysql](https://github.com/mysqljs/mysql) - Node JS driver for MySQL
* [UUID](https://github.com/uuidjs/uuid) - Creation of UUID
* [Axios](https://github.com/axios/axios) - HTTP Request library
* [ISO-3166-1](https://github.com/ecrmnn/iso-3166-1) - For converting country name to ISO-3166-1 acceptable country code

### Application Structure

* `src/` - Application code in Javascript, with `index.js` being the entry point.
* `typescript/` - Application code in Typescript, with `index.ts` being the entry point.
* `test/` -  This folder contains test file for fetching data to the server.

### NPM Commands

* `npm run dev` - Starts local server with Javascript code (from `src/` folder)
* `npm run dev:ts` - Starts local server with Typescript code (from `typescript/` folder)
* `npm run lint` - Lint all files with ESLint
* `npm run lint:fix` - Fixes all fixable errors with ESLint
* `npm run build` - Compiles typescript files from `typescript/` into `dist/`

### Response Schema

There is no response schema for success attemps as we refer directly from [Midtrans' Snap Response](https://snap-docs.midtrans.com/#response).

For failed attemps or 400 and 500 status code, the response schema should be:
```json
{
  "message": "Error message"
}
```

## Memulai

* Clone repository ini
* `npm install` untuk menginstall dependency yang diperlukan.
* Install MySQL Community Edition pada komputer Anda
* Ubah `.env.example` menjadi `.env`, dan isi file tersebut.
* `npm run dev` untuk menjalankan local server. Atau `npm run dev:ts` untuk menjalankan Typescript server.

## Gambaran Kode

### Dependencies

* [Express](https://github.com/expressjs/express) - Server utama
* [Cors](https://github.com/expressjs/cors) - CORS middleware untuk Express
* [Dotenv](https://github.com/motdotla/dotenv) - Memasukan `process.env` dengan konten dari file `.env`
* [Knex](https://github.com/knex/knex) - SQL Query builder
* [Mysql](https://github.com/mysqljs/mysql) - Node JS driver untuk MySQL
* [UUID](https://github.com/uuidjs/uuid) - Menciptakan data UUID
* [Axios](https://github.com/axios/axios) - HTTP Request
* [ISO-3166-1](https://github.com/ecrmnn/iso-3166-1) - Untuk mengubah nama negara menjadi format ISO-3166-1

### Application Structure

* `src/` - Kode aplikasi dengan bahasa Javascript, dengan `index.js` menjadi entry point.
* `typescript/` - Kode aplikasi dengan bahasa Typescript, dengan `index.ts` menjadi entry point.
* `test/` -  Folder ini berisi file tes untuk mendapatkan data dari server.

### NPM Commands

* `npm run dev` - Menjalankan local server dalam bahasa Javascript (dari folder `src/`)
* `npm run dev:ts` - Menjalankan local server dalam bahasa Typescript (dari folder `typescript/`)
* `npm run lint` - Mencari kesalahan dengan ESLint
* `npm run lint:fix` - Mengoreksi error yang bisa diselesaikan dengan ESLint
* `npm run build` - Menghimpun file typescript dari `typescript/` ke `dist/`

### Response Schema

Tidak ada skema response untuk percobaan yang sukses sebagaimana kami mengambil skema langsung dari [Midtrans Snap Response](https://snap-docs.midtrans.com/#response).

Untuk percobaan yang gagal atau dengan status code 400 dan 500, skema response seharusnya menjadi:
```json
{
  "message": "Error message"
}
```