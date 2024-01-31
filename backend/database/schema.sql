-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE `User` (
    `id` int  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `pseudo` varchar(50)  NOT NULL ,
    `name` varchar(50)  NOT NULL ,
    `firstname` varchar(50)  NOT NULL ,
    `email` varchar(100) UNIQUE NOT NULL ,
    `password` varchar(300)  NOT NULL ,
    `token` varchar(300)

);

CREATE TABLE `save`(
`id` int  NOT NULL AUTO_INCREMENT PRIMARY KEY,
`user_id` int NOT NULL,
`save` int NOT NULL);

ALTER TABLE `save` ADD CONSTRAINT save_fk0 FOREIGN KEY (user_id) REFERENCES user(id);