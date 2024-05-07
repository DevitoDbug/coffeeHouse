package api

import (
	db "coffeeHouse_API/db/sqlc"
	"database/sql"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

type UserWithPublicData struct {
	UsrID     int64     `json:"usr_id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Fname     string    `json:"fname"`
	Sname     string    `json:"sname"`
	Email     string    `json:"email"`
	PhotoURL  string    `json:"photoURL"`
}

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

type GetUserRequest struct {
	ID int64 `uri:"id" binding:"required,min=1"`
}

func (s *Server) getUser(ctx *gin.Context) {
	var getUserRequest GetUserRequest
	if err := ctx.ShouldBindUri(&getUserRequest); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	fetchedUser, err := s.store.GetUser(ctx, getUserRequest.ID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	res := UserWithPublicData{
		UsrID:     fetchedUser.UsrID,
		CreatedAt: fetchedUser.CreatedAt,
		UpdatedAt: fetchedUser.UpdatedAt,
		Fname:     fetchedUser.Fname.String,
		Sname:     fetchedUser.Sname.String,
		Email:     fetchedUser.Email,
		PhotoURL:  fetchedUser.PhotoURL.String,
	}

	ctx.JSON(http.StatusOK, res)
}

type ListUsersRequest struct {
	PageId   int32 `form:"page_id" binding:"required,min=1"`
	PageSize int32 `form:"page_size" binding:"required,min=5,max=7"`
}

func (s *Server) listUsers(ctx *gin.Context) {
	var res []UserWithPublicData
	var listUsersRequest ListUsersRequest

	if err := ctx.ShouldBindQuery(&listUsersRequest); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	arg := db.ListUsersParams{
		Limit:  listUsersRequest.PageSize,
		Offset: (listUsersRequest.PageId - 1) * listUsersRequest.PageSize,
	}
	fetchedUsers, err := s.store.ListUsers(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	// instanced res in order to return empty slice instead of a nil in the case of no
	// users
	res = []UserWithPublicData{}

	for _, user := range fetchedUsers {
		res = append(res, UserWithPublicData{
			UsrID:     user.UsrID,
			CreatedAt: user.CreatedAt,
			UpdatedAt: user.UpdatedAt,
			Fname:     user.Fname.String,
			Sname:     user.Sname.String,
			Email:     user.Email,
			PhotoURL:  user.PhotoURL.String,
		})
	}

	ctx.JSON(http.StatusOK, res)
}
