# User Management System

## Setup and installation

Make sure you have the latest version of Node installed.

```sh
git clone <repo-url>
```

Inside the cloned folder:

```sh
npm install express dotenv express-handlebars body-parser mysql
```

```sh
npm install --save-dev
```
Create database with preferred name in Mysql

Add table to the Database(change DB_NAME):
```sh
CREATE TABLE `{DB_NAME}`.`user` ( `id` INT NOT NULL AUTO_INCREMENT , `first_name` VARCHAR(45) NOT NULL , `last_name` VARCHAR(45) NOT NULL , `email` VARCHAR(45) NOT NULL , `phone` VARCHAR(45) NOT NULL , `comments` TEXT NOT NULL , `status` VARCHAR(10) NOT NULL DEFAULT 'active' , PRIMARY KEY (`id`)) ENGINE = InnoDB;
```

Add sql dummy data to the table:
```sh
INSERT INTO `user` 
(`id`, `first_name`,  `last_name`,    `email`,                 `phone`,         `comments`, `status`) VALUES
(NULL, 'Amanda',      'Nunes',        'anunes@ufc.com',        '012345 678910', '',          'active'),
(NULL, 'Alexander',   'Volkanovski',  'avolkanovski@ufc.com',  '012345 678910', '',          'active'),
(NULL, 'Khabib',      'Nurmagomedov', 'knurmagomedov@ufc.com', '012345 678910', '',          'active'),
(NULL, 'Kamaru',      'Usman',        'kusman@ufc.com',        '012345 678910', '',          'active');
```

In the .env file change:
`database name`
`database username`
`databse password`
