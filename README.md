## How to Run This Project

1. Run `pnpm install` to install all dependencies

2. Run `pnpm setup:dev` to configure the docker

You can also configure the Docker by changing the `.env.development` environment variable

```bash
DATABASE_URL=
DATABASE_NAME=
DATABASE_USER=
DATABASE_PASS=
DATABASE_PORT=
PORT=
```

3. Run `pnpm migrate:dev` to configure the database

4. Run `pnpm start:dev` to start the project

## Alasan pemilihan pattern

Pattern project seperti ini digunakan untuk memisahkan secara jelas dan terstruktur setiap komponen dari aplikasi. Dengan menyusun direktori dalam struktur seperti ini, memudahkan untuk mengorganisasi dan mengelola kode secara efisien.
Misalnya, modul-modul seperti auth, category, notes, dan users memiliki struktur yang serupa dengan sub-direktori untuk DTO, controller, service, dan module masing-masing, memungkinkan pengembang untuk dengan cepat menemukan dan memahami fungsionalitas spesifik pada setiap bagian dari aplikasi.
Selain itu, ada direktori common yang berisi konstan dan decorator yang dapat digunakan secara global dalam seluruh aplikasi. Infrastruktur seperti database disimpan dalam direktori yang terpisah, sehingga memudahkan untuk memisahkan kode aplikasi dari kode infrastruktur. Dengan menggunakan pola seperti ini, pengembang dapat meningkatkan keterbacaan, pemeliharaan, dan pengembangan aplikasi secara keseluruhan.
