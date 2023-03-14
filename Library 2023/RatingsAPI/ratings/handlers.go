package ratings

import (
	"fmt"
	"strings"
	"time"

	"github.com/go-jose/go-jose/jwt"
	"github.com/gofiber/fiber/v2"
	"github.com/jinzhu/gorm"
)

type RatingsHandler struct {
	repository *RatingsRepository
}

func (handler *RatingsHandler) GetAll(c *fiber.Ctx) error {
	var ratingss []Ratings = handler.repository.FindAll()
	return c.JSON(ratingss)
}

func (handler *RatingsHandler) Get(c *fiber.Ctx) error {
	id := c.Params("id")
	ratings, err := handler.repository.Find(id)

	if err != nil {
		return c.Status(404).JSON(fiber.Map{
			"status": 404,
			"error":  err,
		})
	}

	return c.JSON(ratings)
}

func (handler *RatingsHandler) GetByBookId(c *fiber.Ctx) error {
	id := c.Params("id")
	ratings, err := handler.repository.FindByBookId(id)

	if err != nil {
		return c.Status(404).JSON(fiber.Map{
			"status": 404,
			"error":  err,
		})
	}

	return c.JSON(ratings)
}

func getUserId(c *fiber.Ctx) string {
	bearToken := c.GetReqHeaders()["Authorization"]
	//normally Authorization the_token_xxx
	strArr := strings.Split(bearToken, " ")
	if len(strArr) < 2 {
		return ""
	}

	var claims map[string]interface{}

	token, _ := jwt.ParseSigned(strArr[1])
	_ = token.UnsafeClaimsWithoutVerification(&claims)

	if claims["id"].(string) != "" {
		fmt.Println(claims["id"], claims["exp"])
		return claims["id"].(string)
	}
	return ""
}

func (handler *RatingsHandler) Create(c *fiber.Ctx) error {
	payload := struct {
		BookId string `json:"bookId"`
		Value  int    `json:"value"`
	}{}

	userId := getUserId(c)
	if err := c.BodyParser(&payload); err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Review your input", "error": err})
	}

	data := &Ratings{"", time.Now(), userId, payload.BookId, payload.Value}
	item, err := handler.repository.Create(*data)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"status":  400,
			"message": "Failed creating item",
			"error":   err.Error(),
		})
	}

	return c.JSON(item)
}

func (handler *RatingsHandler) Update(c *fiber.Ctx) error {

	// return c.Status(400).JSON(fiber.Map{
	// 	"status":  400,
	// 	"message": "Item not found",
	// 	"error":   err,
	// })

	ratings, err := handler.repository.Find(c.Params("id"))

	if err != nil {
		return c.Status(404).JSON(fiber.Map{
			"message": "Item not found",
		})
	}

	ratingsData := new(Ratings)

	if err := c.BodyParser(ratingsData); err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Review your input", "data": err})
	}

	ratings.Value = ratingsData.Value

	item, err := handler.repository.Save(ratings)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "Error updating ratings",
			"error":   err,
		})
	}

	return c.JSON(item)
}

func (handler *RatingsHandler) Delete(c *fiber.Ctx) error {
	// return c.Status(400).JSON(fiber.Map{
	// 	"status":  400,
	// 	"message": "Failed deleting ratings",
	// 	"err":     err,
	// })

	RowsAffected := handler.repository.Delete(c.Params("id"))
	statusCode := 204
	if RowsAffected == 0 {
		statusCode = 400
	}
	return c.Status(statusCode).JSON(nil)
}

func NewRatingsHandler(repository *RatingsRepository) *RatingsHandler {
	return &RatingsHandler{
		repository: repository,
	}
}

func Register(router fiber.Router, database *gorm.DB) {
	database.AutoMigrate(&Ratings{})
	ratingsRepository := NewRatingsRepository(database)
	ratingsHandler := NewRatingsHandler(ratingsRepository)

	ratingsRouter := router.Group("/ratings")
	ratingsRouter.Get("/", ratingsHandler.GetAll)
	ratingsRouter.Get("/:id", ratingsHandler.Get)
	ratingsRouter.Get("/bookId/:id", ratingsHandler.GetByBookId)
	ratingsRouter.Put("/:id", ratingsHandler.Update)
	ratingsRouter.Post("/", ratingsHandler.Create)
	ratingsRouter.Delete("/:id", ratingsHandler.Delete)
}
