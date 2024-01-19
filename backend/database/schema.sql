-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE `User` (
    `id` int  NOT NULL AUTO_INCREMENT,
    `pseudo` varchar(50)  NOT NULL ,
    `name` varchar(50)  NOT NULL ,
    `firstname` varchar(50)  NOT NULL ,
    `email` varchar(100) UNIQUE NOT NULL ,
    `password` varchar(300)  NOT NULL ,
   
    PRIMARY KEY (
        `id`
    )
);



