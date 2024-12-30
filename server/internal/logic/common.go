package logic

import "golang.org/x/crypto/bcrypt"

func HashPassword(password string) (string, error) {
	// Generate the hashed password with a cost of bcrypt.DefaultCost
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hash), nil
}

// CheckPasswordHash compares a plain-text password with its hashed version.
func CheckPasswordHash(password, hashedPassword string) bool {
	// Use bcrypt's CompareHashAndPassword to verify the password
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	return err == nil
}
