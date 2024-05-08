package api

import (
	db "coffeeHouse_API/db/sqlc"
	"database/sql"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

type CreateProductRequest struct {
	PdName           string `json:"pd_name" binding:"required"`
	ShortDescription string `json:"short_description" binding:"required"`
	LongDescription  string `json:"long_description" binding:"required"`
	ImgID            int64  `json:"img_id" binding:"required"`
	CategoryID       int64  `json:"category_id" binding:"required"`
}

type CreateProductResponse struct {
	PdID             int64     `json:"pd_id"`
	CreatedAt        time.Time `json:"created_at"`
	UpdatedAt        time.Time `json:"updated_at"`
	PdName           string    `json:"pd_name"`
	ShortDescription string    `json:"short_description"`
	LongDescription  string    `json:"long_description"`
	ImgID            int64     `json:"img_id"`
	CategoryID       int64     `json:"category_id"`
}

func (s *Server) createProduct(ctx *gin.Context) {
	var createProductRequest CreateProductRequest
	if err := ctx.ShouldBind(&createProductRequest); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	arg := db.CreateProductParams{
		PdName: createProductRequest.PdName,
		ShortDescription: sql.NullString{
			String: createProductRequest.ShortDescription,
			Valid:  true,
		},
		LongDescription: sql.NullString{
			String: createProductRequest.LongDescription,
			Valid:  true,
		},
		ImgID: sql.NullInt64{
			Int64: createProductRequest.ImgID,
			Valid: true,
		},
		CategoryID: sql.NullInt64{
			Int64: createProductRequest.CategoryID,
			Valid: true,
		},
	}

	fetchedProduct, err := s.store.CreateProduct(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	res := CreateProductResponse{
		PdID:             fetchedProduct.PdID,
		CreatedAt:        fetchedProduct.CreatedAt,
		UpdatedAt:        fetchedProduct.UpdatedAt,
		PdName:           fetchedProduct.PdName,
		ShortDescription: fetchedProduct.ShortDescription.String,
		LongDescription:  fetchedProduct.LongDescription.String,
		ImgID:            fetchedProduct.ImgID.Int64,
		CategoryID:       fetchedProduct.CategoryID.Int64,
	}

	ctx.JSON(http.StatusOK, res)
}
