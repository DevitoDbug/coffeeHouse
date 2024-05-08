package api

import (
	"github.com/gin-gonic/gin"
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

}
