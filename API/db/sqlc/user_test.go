package db

import (
	"context"
	"database/sql"
	"github.com/google/uuid"
	"github.com/stretchr/testify/require"
	"testing"
)

func createDummyUser(fName string) User {
	newUser := User{
		Fname: sql.NullString{
			String: fName,
			Valid:  true,
		},
		Sname: sql.NullString{
			String: fName + "lst",
			Valid:  true,
		},
		Email:    fName + "@gmail.com",
		Password: uuid.NewString(),
		PhotoURL: sql.NullString{
			String: "user1PhotoURl",
			Valid:  true,
		},
	}

	return newUser
}

func TestQueries_CreateUser(t *testing.T) {
	newUser := createDummyUser("James")
	arg := CreateUserParams{
		Fname:    newUser.Fname,
		Sname:    newUser.Sname,
		Email:    newUser.Email,
		Password: newUser.Password,
		PhotoURL: newUser.PhotoURL,
	}

	user1, err := testQueries.CreateUser(context.Background(), arg)

	require.NoError(t, err)
	require.NotEmpty(t, user1)

	require.Equal(t, arg.Fname, user1.Fname)
	require.Equal(t, arg.Sname, user1.Sname)
	require.Equal(t, arg.Email, user1.Email)
	require.Equal(t, arg.Password, user1.Password)
	require.Equal(t, arg.PhotoURL, user1.PhotoURL)
	require.NotEmpty(t, user1.CreatedAt)
	require.NotEmpty(t, user1.UpdatedAt)
	require.Empty(t, user1.DeletedAt)
}
