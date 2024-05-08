package api

import (
	db "coffeeHouse_API/db/sqlc"
	"database/sql"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

type CreateAttributeRequest struct {
	AttValue      string `json:"att_value" binding:"required"`
	Abbreviations string `json:"abbreviations" binding:"required,len=1"`
}

type CreateAttributeResponse struct {
	AttID         int64     `json:"att_id"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
	AttValue      string    `json:"att_value"`
	Abbreviations string    `json:"abbreviations" `
}

func (s *Server) createAttribute(ctx *gin.Context) {
	var createAttributeRequest CreateAttributeRequest
	if err := ctx.ShouldBind(&createAttributeRequest); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	arg := db.CreateAttributeParams{
		AttValue: sql.NullString{
			String: createAttributeRequest.AttValue,
			Valid:  true,
		},
		Abbreviations: sql.NullString{
			String: createAttributeRequest.Abbreviations,
			Valid:  true,
		},
	}

	fetchedAttribute, err := s.store.CreateAttribute(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	res := CreateAttributeResponse{
		AttID:         fetchedAttribute.AttID,
		CreatedAt:     fetchedAttribute.CreatedAt,
		UpdatedAt:     fetchedAttribute.UpdatedAt,
		AttValue:      fetchedAttribute.AttValue.String,
		Abbreviations: fetchedAttribute.Abbreviations.String,
	}
	ctx.JSON(http.StatusOK, res)
}
