package db

import (
	"coffeeHouse_API/util"
	"context"
	"database/sql"
	"github.com/google/uuid"
	"github.com/stretchr/testify/require"
	"testing"
)

func createRandomUser(t *testing.T) User {
	arg := CreateUserParams{
		Fname: sql.NullString{
			String: util.RandomUserName(),
			Valid:  true,
		},
		Sname: sql.NullString{
			String: util.RandomUserName() + "lst",
			Valid:  true,
		},
		Email:    util.RandomUserName() + "@gmail.com",
		Password: uuid.NewString(),
		PhotoURL: sql.NullString{
			String: "user1PhotoURl",
			Valid:  true,
		},
	}

	user1, err := testQueries.CreateUser(context.Background(), arg)

	require.NoError(t, err)
	require.NotEmpty(t, user1)

	require.Equal(t, arg.Fname, user1.Fname)
	require.Equal(t, arg.Sname, user1.Sname)
	require.Equal(t, arg.Email, user1.Email)
	require.Equal(t, arg.Password, user1.Password)
	require.Equal(t, arg.PhotoURL, user1.PhotoURL)
	require.NotEmpty(t, user1.UpdatedAt)
	require.NotEmpty(t, user1.CreatedAt)
	require.NotEmpty(t, user1.UsrID)
	require.NotZero(t, user1.UsrID)
	require.NotZero(t, user1.CreatedAt)
	require.NotZero(t, user1.UpdatedAt)
	require.Empty(t, user1.DeletedAt)

	return user1
}

func TestQueries_CreateUser(t *testing.T) {
	createRandomUser(t)
}

func TestQueries_GetUsers(t *testing.T) {
	createdUser := createRandomUser(t)

	fetchedUser, err := testQueries.GetUser(context.Background(), createdUser.UsrID)
	require.NoError(t, err)
	require.NotEmpty(t, fetchedUser)

	require.Empty(t, fetchedUser.DeletedAt)
	require.Equal(t, createdUser.Fname, fetchedUser.Fname)
	require.Equal(t, createdUser.Sname, fetchedUser.Sname)
	require.Equal(t, createdUser.Email, fetchedUser.Email)
	require.Equal(t, createdUser.Password, fetchedUser.Password)
	require.Equal(t, createdUser.PhotoURL, fetchedUser.PhotoURL)
}

func TestQueries_DeleteUser(t *testing.T) {
	user := createRandomUser(t)
	err1 := testQueries.DeleteUser(context.Background(), user.UsrID)
	require.NoError(t, err1)

	fetchedUser, err2 := testQueries.GetUser(context.Background(), user.UsrID)
	require.Error(t, err2)
	require.EqualError(t, err2, sql.ErrNoRows.Error())
	require.Empty(t, fetchedUser)
}

func TestQueries_DeleteUserTemporarily(t *testing.T) {
	user := createRandomUser(t)

	deletedUser, err1 := testQueries.DeleteUserTemporarily(context.Background(), user.UsrID)
	require.NoError(t, err1)
	require.NotEmpty(t, deletedUser)
	require.NotEmpty(t, deletedUser.DeletedAt)

	reDeletedUser, err2 := testQueries.DeleteUserTemporarily(context.Background(), user.UsrID)
	require.Error(t, err2)
	require.EqualError(t, err2, sql.ErrNoRows.Error())
	require.Empty(t, reDeletedUser)

	fetchedUser, err3 := testQueries.GetUser(context.Background(), user.UsrID)
	require.Error(t, err3)
	require.EqualError(t, err3, sql.ErrNoRows.Error())
	require.Empty(t, fetchedUser)
}

func TestQueries_RestoreUser(t *testing.T) {
	user := createRandomUser(t)

	testQueries.DeleteUserTemporarily(context.Background(), user.UsrID)
	restoredUser, err := testQueries.RestoreUser(context.Background(), user.UsrID)
	require.NoError(t, err)
	require.NotEmpty(t, restoredUser)
	require.Empty(t, restoredUser.DeletedAt)

	require.Equal(t, user.UsrID, restoredUser.UsrID)
	require.Equal(t, user.Email, restoredUser.Email)
	require.Equal(t, user.Fname, restoredUser.Fname)
	require.Equal(t, user.Sname, restoredUser.Sname)
	require.Equal(t, user.Password, restoredUser.Password)
	require.Equal(t, user.PhotoURL, restoredUser.PhotoURL)
}
