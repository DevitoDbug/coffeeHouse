package db

import (
	"coffeeHouse_API/util"
	"context"
	"database/sql"
	"testing"

	"github.com/stretchr/testify/require"
)

func createRandomImage(t *testing.T) Image {
	arg := CreateImageParams{
		ImgName: sql.NullString{
			String: util.RandomString(5),
			Valid:  true,
		},
		AltText: sql.NullString{
			String: util.RandomString(5),
			Valid:  true,
		},
	}
	createdImg, err := testQueries.CreateImage(context.Background(), arg)
	require.NoError(t, err)

	require.NotEmpty(t, createdImg)
	require.NotZero(t, createdImg.ImgID)
	require.NotZero(t, createdImg.CreatedAt)
	require.NotZero(t, createdImg.UpdatedAt)
	require.Empty(t, createdImg.DeletedAt)
	require.Equal(t, arg.ImgName, createdImg.ImgName)
	require.Equal(t, arg.AltText, createdImg.AltText)

	return createdImg
}

func TestQueries_CreateImage(t *testing.T) {
	createRandomImage(t)
}
