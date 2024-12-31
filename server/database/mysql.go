package database

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

type MysqlDbInstance struct {
	Db *gorm.DB
}

type Configuration struct {
	// DataBase Setup
	DBHost     string
	DBUsername string
	DBPassword string
	DBName     string
	DBPort     string
}

// Database is mysql database ~object
var Database MysqlDbInstance

// Establishing Mysql Connection
func MysqlConnectDb() {
	// Load environment variables from .env file
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file: ", err)
	}

	// Fetch configuration from environment variables
	config := Configuration{
		DBUsername: os.Getenv("DB_USER"),
		DBPassword: os.Getenv("DB_PASSWORD"),
		DBHost:     os.Getenv("DB_HOST"),
		DBPort:     os.Getenv("DB_PORT"),
		DBName:     os.Getenv("DB_NAME"),
	}

	// Validate required environment variables
	if config.DBUsername == "" || config.DBPassword == "" || config.DBHost == "" || config.DBPort == "" || config.DBName == "" {
		log.Fatal("Missing required environment variables for database configuration")
	}

	// Create DSN (Data Source Name)
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		config.DBUsername, config.DBPassword, config.DBHost, config.DBPort, config.DBName)

	// Connect to MySQL database
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database: ", err)
		os.Exit(2)
	}

	log.Println("Connection to database established")
	db.Logger = logger.Default.LogMode(logger.Info)

	// Run migrations if needed
	log.Println("Running migrations...")
	// Example: db.AutoMigrate(&YourModel{})

	// Assign database instance
	Database = MysqlDbInstance{Db: db}
}
