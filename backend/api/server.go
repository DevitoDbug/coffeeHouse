package api

import (
	db "coffeeHouse_API/db/sqlc"
	"github.com/gin-gonic/gin"
)

type Server struct {
	router *gin.Engine
	store  *db.Store
}

func NewServer(store *db.Store) *Server {
	server := Server{store: store}
	router := gin.Default()

	// User routes
	router.POST("user/", server.createUser)
	router.GET("user/:id", server.getUser)
	router.GET("user/", server.listUsers)

	// Category routes
	router.POST("category/", server.createCategory)

	// Image routes
	router.POST("image/", server.createImage)

	// Product routes
	router.POST("product/", server.createProduct)

	server.router = router
	return &server
}

func (s *Server) StartServer(address string) error {
	s.router.Run(address)
	return s.router.Run(address)
}

func errorResponse(err error) gin.H {
	return gin.H{"error": err.Error()}
}
