package ratings

import (
	"time"

	"github.com/gofrs/uuid/v3"
	"github.com/jinzhu/gorm"
)

type Ratings struct {
	Id          string    `sql:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	DateCreated time.Time `gorm:"Not Null" json:"dateCreated"`
	CreatedBy   string    `gorm:"Not Null" json:"createdBy"`
	BookId      string    `gorm:"Not Null" json:"bookId"`
	Value       int       `gorm:"Not Null" json:"value"`
}

func (base *Ratings) BeforeCreate(scope *gorm.Scope) error {
	id, err := uuid.NewV4()
	if err != nil {
		return err
	}
	return scope.SetColumn("ID", id.String())
}
