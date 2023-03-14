package ratings

import (
	"errors"

	"github.com/jinzhu/gorm"
)

type RatingsRepository struct {
	database *gorm.DB
}

func (repository *RatingsRepository) FindAll() []Ratings {
	var ratingss []Ratings
	repository.database.Find(&ratingss)
	return ratingss
}

func (repository *RatingsRepository) Find(id string) (Ratings, error) {
	var ratings Ratings

	//Originally it weas missing where clause and after reading documentation we added it
	// https://gorm.io/docs/query.html Where("name <> ?", "jinzhu")
	err := repository.database.Where("id = ?", id).Find(&ratings).Error
	if ratings.CreatedBy == "" {
		err = errors.New("Ratings not found")
	}
	return ratings, err
}

func (repository *RatingsRepository) FindByBookId(bookId string) (Ratings, error) {
	var ratings Ratings

	//Originally it weas missing where clause and after reading documentation we added it
	// https://gorm.io/docs/query.html Where("name <> ?", "jinzhu")
	err := repository.database.Where("book_id = ?", bookId).Find(&ratings).Error
	if ratings.CreatedBy == "" {
		err = errors.New("Ratings not found")
	}
	return ratings, err
}

func (repository *RatingsRepository) Create(ratings Ratings) (Ratings, error) {
	err := repository.database.Create(&ratings).Error
	if err != nil {
		return ratings, err
	}

	return ratings, nil
}

func (repository *RatingsRepository) Save(user Ratings) (Ratings, error) {
	err := repository.database.Save(user).Error
	return user, err
}

func (repository *RatingsRepository) Delete(id string) int64 {
	count := repository.database.Delete(&Ratings{}, id).RowsAffected
	return count
}

func NewRatingsRepository(database *gorm.DB) *RatingsRepository {
	return &RatingsRepository{
		database: database,
	}
}
