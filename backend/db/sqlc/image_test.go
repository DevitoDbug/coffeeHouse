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
		ImgUrl: sql.NullString{
			String: util.RandomString(5),
			Valid:  true,
		},
	}
	createdImg, err := testQueries.CreateImage(context.Background(), arg)
	require.NoError(t, err)

	require.NotEmpty(t, createdImg)
	require.NotEmpty(t, createdImg.ImgID)
	require.NotEmpty(t, createdImg.ImgUrl)
	require.NotEmpty(t, createdImg.ImgName)
	require.NotEmpty(t, createdImg.AltText)
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

func TestQueries_ListImage(t *testing.T) {
	for i := 0; i < 20; i++ {
		createRandomImage(t)
	}

	args := ListImageParams{
		Limit:  5,
		Offset: 5,
	}

	imageList, err := testQueries.ListImage(context.Background(), ListImageParams{
		Limit:  args.Limit,
		Offset: args.Offset,
	})
	require.NoError(t, err)
	require.NotEmpty(t, imageList)
	require.Len(t, imageList, 5)

	for _, image := range imageList {
		require.NotEmpty(t, image.ImgID)
	}
}

func TestQueries_GetImage(t *testing.T) {
	createdImage := createRandomImage(t)

	imageFetched, err := testQueries.GetImage(context.Background(), createdImage.ImgID)
	require.NoError(t, err)
	require.NotEmpty(t, imageFetched)

	require.Equal(t, createdImage.ImgName, imageFetched.ImgName)
	require.Equal(t, createdImage.ImgUrl, imageFetched.ImgUrl)
	require.Equal(t, createdImage.AltText, imageFetched.AltText)
}

func TestQueries_UpdateImage(t *testing.T) {
	originalImg := createRandomImage(t)

	arg := UpdateImageParams{
		ImgName: sql.NullString{
			String: util.RandomString(7),
			Valid:  true,
		},
		ImgUrl: sql.NullString{
			String: util.RandomString(7),
			Valid:  true,
		},
		ImgID: originalImg.ImgID,
	}

	updateImg, err := testQueries.UpdateImage(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, updateImg)

	require.Equal(t, arg.ImgName, updateImg.ImgName)
	require.Equal(t, arg.ImgUrl, updateImg.ImgUrl)
	require.NotZero(t, updateImg.UpdatedAt)
	require.True(t, updateImg.UpdatedAt.After(originalImg.UpdatedAt))

}

func TestQueries_DeleteImageTemporarily(t *testing.T) {
	randomImage := createRandomImage(t)

	deletedImage, err1 := testQueries.DeleteImageTemporarily(context.Background(), randomImage.ImgID)
	require.NoError(t, err1)
	require.NotEmpty(t, deletedImage)
	require.NotZero(t, deletedImage.DeletedAt)

	//When the image is set as deleted twice
	reDeletedImage, err2 := testQueries.DeleteImageTemporarily(context.Background(), randomImage.ImgID)
	require.Error(t, err2)
	require.EqualError(t, err2, sql.ErrNoRows.Error())
	require.Empty(t, reDeletedImage)

	fetchedImage, err3 := testQueries.GetImage(context.Background(), randomImage.ImgID)
	require.Error(t, err3)
	require.EqualError(t, err3, sql.ErrNoRows.Error())
	require.Empty(t, fetchedImage)

}

func TestQueries_RestoreImage(t *testing.T) {
	randomImage := createRandomImage(t)
	testQueries.DeleteImageTemporarily(context.Background(), randomImage.ImgID)

	restoredImage, err4 := testQueries.RestoreImage(context.Background(), randomImage.ImgID)
	require.NoError(t, err4)
	require.NotEmpty(t, restoredImage)
	require.Empty(t, restoredImage.DeletedAt)
}

func TestQueries_DeleteImage(t *testing.T) {
	randomImage := createRandomImage(t)

	err1 := testQueries.DeleteImage(context.Background(), randomImage.ImgID)
	require.NoError(t, err1)

	fetchedImage, err2 := testQueries.GetImage(context.Background(), randomImage.ImgID)
	require.Error(t, err2)
	require.EqualError(t, err2, sql.ErrNoRows.Error())
	require.Empty(t, fetchedImage)
}
