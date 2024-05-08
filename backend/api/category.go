package api

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

type CreateCategoryRequest struct {
	Name string `json:"name" binding:"required"`
}

type CreateCategoryResponse struct {
	CategoryID   int64     `json:"category_id"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
	CategoryName string    `json:"category_name"`
}

func (s *Server) createCategory(ctx *gin.Context) {
	var createCategoryRequest CreateCategoryRequest

	if err := ctx.ShouldBind(&createCategoryRequest); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	createdCategory, err := s.store.CreateCategory(ctx, createCategoryRequest.Name)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	res := CreateCategoryResponse{
		CategoryID:   createdCategory.CategoryID,
		CreatedAt:    createdCategory.CreatedAt,
		UpdatedAt:    createdCategory.UpdatedAt,
		CategoryName: createdCategory.CategoryName,
	}

	ctx.JSON(http.StatusOK, res)
}
