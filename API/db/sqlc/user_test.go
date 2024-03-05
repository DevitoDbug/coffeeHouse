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
