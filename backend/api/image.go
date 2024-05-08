package api

import (
	db "coffeeHouse_API/db/sqlc"
	"database/sql"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

type CreateImageRequest struct {
	ImgName string `json:"img_name" binding:"required"`
	AltText string `json:"alt_text" binding:"required"`
	ImgUrl  string `json:"img_url" binding:"required"`
}

type CreateImageResponse struct {
	ImgID     int64     `json:"img_id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	ImgName   string    `json:"img_name"`
	ImgUrl    string    `json:"img_url"`
	AltText   string    `json:"alt_text"`
}

func (s *Server) createImage(ctx *gin.Context) {
	var createImageRequest CreateImageRequest
	if err := ctx.ShouldBind(&createImageRequest); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	arg := db.CreateImageParams{
		ImgName: sql.NullString{
			String: createImageRequest.ImgName,
			Valid:  true,
		},
		AltText: sql.NullString{
			String: createImageRequest.AltText,
			Valid:  true,
		},
		ImgUrl: sql.NullString{
			String: createImageRequest.ImgUrl,
			Valid:  true,
		},
	}

	fetchedImage, err := s.store.CreateImage(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	res := CreateImageResponse{
		ImgID:     fetchedImage.ImgID,
		CreatedAt: fetchedImage.CreatedAt,
		UpdatedAt: fetchedImage.UpdatedAt,
		ImgName:   fetchedImage.ImgName.String,
		ImgUrl:    fetchedImage.ImgUrl.String,
		AltText:   fetchedImage.AltText.String,
	}
	ctx.JSON(http.StatusOK, res)
}
