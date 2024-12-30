package database

import (
	"fmt"
	"log"
	"os"

	// "goscl/config"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

type MysqlDbInstance struct {
	Db *gorm.DB
}
type Configuration struct {
	// DataBase Setup
	DBHost     string `mapstructure:"DB_HOST"`
	DBUsername string `mapstructure:"DB_USER"`
	DBPassword string `mapstructure:"DB_PASSWORD"`
	DBName     string `mapstructure:"DB_NAME"`
	DBPort     string `mapstructure:"DB_PORT"`
}

// Database is mysql database ~object
var Database MysqlDbInstance

// Establishing Mysql Connection
func MysqlConnectDb() {
	config := Configuration{
		DBUsername: "root",
		DBPassword: "Ajin4594",
		DBHost:     "localhost",
		DBPort:     "3306",
		DBName:     "auth",
	}

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		config.DBUsername, config.DBPassword, config.DBHost, config.DBPort, config.DBName)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to Connect db \n", err.Error())
		os.Exit(2)
	}
	log.Println("connection to Database established")
	db.Logger = logger.Default.LogMode(logger.Info)
	log.Println("Running Migrations")
	// adding migrations
	Database = MysqlDbInstance{Db: db}
}
