package health

import (
	"os"

	"github.com/gofiber/fiber/v2"
)

type HealthHandler struct {
}

func (handler *HealthHandler) Get(c *fiber.Ctx) error {
	return c.JSON("Ratings API is up and running " + os.Getenv("envName") + " ....")
}

func Register(router fiber.Router) {
	healthRouter := router.Group("/health")
	healthRouter.Get("/", new(HealthHandler).Get)
}
