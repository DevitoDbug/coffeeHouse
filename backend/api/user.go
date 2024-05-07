package api

import (
	db "coffeeHouse_API/db/sqlc"
	"database/sql"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

type CreateUserRequest struct {
	Fname    string `json:"fname" binding:"required"`
	Sname    string `json:"sname" binding:"required"`
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required" `
	PhotoURL string `json:"photoURL" binding:"required"`
}

type CreateUserResponse struct {
	Id        int64     `json:"id"`
	CreatedAt time.Time `json:"createdAt"`
	Fname     string    `json:"fname" `
	Sname     string    `json:"sname" `
	Email     string    `json:"email" `
	PhotoURL  string    `json:"photoURL" `
}

func (s *Server) createUser(ctx *gin.Context) {
	var request CreateUserRequest
	if err := ctx.ShouldBind(&request); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	arg := db.CreateUserParams{
		Fname: sql.NullString{
			String: request.Fname,
			Valid:  true,
		},
		Sname: sql.NullString{
			String: request.Sname,
			Valid:  true,
		},
		Email:    request.Email,
		Password: request.Password,
		PhotoURL: sql.NullString{
			String: request.PhotoURL,
			Valid:  true,
		},
	}

	createdUser, err := s.store.CreateUser(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	res := CreateUserResponse{
		Id:        createdUser.UsrID,
		CreatedAt: createdUser.CreatedAt,
		Fname:     createdUser.Fname.String,
		Sname:     createdUser.Sname.String,
		Email:     createdUser.Email,
		PhotoURL:  createdUser.PhotoURL.String,
	}

	ctx.JSON(http.StatusOK, res)
}
