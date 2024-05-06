package api

import (
	db "coffeeHouse_API/db/sqlc"
	"database/sql"
	"github.com/gin-gonic/gin"
	"net/http"
)

type CreateUserRequest struct {
	Fname    sql.NullString `json:"fname" binding:"required"`
	Sname    sql.NullString `json:"sname" binding:"required"`
	Email    string         `json:"email" binding:"required"`
	Password string         `json:"password" binding:"required" `
	PhotoURL sql.NullString `json:"photoURL" binding:"required"`
}

func (s *Server) createUser(ctx *gin.Context) {
	var request CreateUserRequest
	if err := ctx.ShouldBind(&request); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	arg := db.CreateUserParams{
		Fname:    request.Fname,
		Sname:    request.Sname,
		Email:    request.Email,
		Password: request.Password,
		PhotoURL: request.PhotoURL,
	}

	createdUser, err := s.store.CreateUser(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}
	ctx.JSON(http.StatusOK, createdUser)
}
