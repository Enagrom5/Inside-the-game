-- MySQL dump 10.13  Distrib 8.0.32, for macos13 (arm64)
--
-- Host: localhost    Database: atelier_backend
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(250) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Anthony','tony@gmail.com','$argon2id$v=19$m=19456,t=2,p=1$uAxzXZuDHwo/iD6bWbeWfw$FFY2m5bpwCPDNb4AAl6lVNM4PwiXTJROYgTV0md3Vis'),(2,'Tristan','tristan@sacod.fr','azertyuiop'),(3,'Tristan','tristan@sacod.fr','azertyuiop'),(4,'Tristan','tristan@sacod.fr','azertyuiop'),(5,'Tristan','t@sacod','azertyuiop'),(6,'Tristan','t@sacod','azertyuiop'),(7,'Tristan','tristan@sacod.fr','azertyuiop'),(8,'Tristan','tristan@sacod.fr','azertyuiop'),(9,'Tristan','tristan@sacod.fr','azertyuiop'),(10,'Tristan','tristan@sacod.fr','azertyuiop'),(11,'Tristan','tristan@sacod.fr','azertyuiop'),(12,'Pierre','pierre@wcs.com','poiuytreza'),(13,'Pierre','pierre@wcs.com','poiuytreza'),(14,NULL,'pierre@wcs.com','poiuytreza'),(15,'Pierre','pierre@wcs.com','poiuytreza'),(16,NULL,'pierre@wcs.com','poiuytreza'),(17,'doriane','dodo@wcs.com','123456789'),(18,'Pierre','pierre@wcs.com','poiuytreza'),(19,NULL,'pierre@wcs.com','poiuytreza'),(20,'Pierre','pierre@wcs.com','poiuytreza'),(21,'Pierre','pierre@wcs.com','poiuytreza'),(22,'Pierre','pierre@wcs.com','poiuytreza'),(23,'Pierre','pierre@wcs.com','poiuytreza'),(24,'Pierre','pierre@wcs.com','poiuytreza'),(25,'Pierre','pierre@wcs.com','poiuytreza'),(26,'Pierre','pierre@wcs.com','poiuytreza'),(27,'Pierre','pierre@wcs.com','poiuytreza'),(28,'dorianeeeeeeeee','dodo@wcs.com','123456789'),(29,'baris','baris@wcs.com','azertyuiop'),(30,'anthony','anthony@gorski.fr','azertyuiop'),(31,'anthony','anthony@gorski.fr','azertyuiop'),(32,'anthony','anthony@gorski.fr','azertyuiop'),(33,'anthony','anthony@gorski.fr','azertyuiop'),(34,'anthony','anthony@gorski.fr','azertyuiop'),(35,'Jérémy','anthony@gorski.fr','azertyuiop'),(36,'Ghislain','anthony@gorski.fr','azertyuiop'),(37,'','anthony@gorski.fr','azertyuiop');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-08 15:22:10
