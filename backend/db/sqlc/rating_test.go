package db

import (
	"coffeeHouse_API/util"
	"context"
	"database/sql"
	"github.com/stretchr/testify/require"
	"strconv"
	"testing"
)

func createRandomRating(t *testing.T) Rating {
	randomProduct := createRandomProduct(t)
	randomUser := createRandomUser(t)

	arg := CreateRatingParams{
		RatingValue: sql.NullString{
			String: strconv.Itoa(int(util.RandomInt(10, 1))),
			Valid:  true,
		},
		PdID: sql.NullInt64{
			Int64: randomProduct.PdID,
			Valid: true,
		},
		UsrID: sql.NullInt64{
			Int64: randomUser.UsrID,
			Valid: true,
		},
		Liked: sql.NullBool{
			Bool:  true,
			Valid: true,
		},
	}

	createdRating, err := testQueries.CreateRating(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, createdRating)

	require.NotZero(t, createdRating.RatingID)
	require.NotEmpty(t, createdRating.CreatedAt)
	require.NotEmpty(t, createdRating.UpdatedAt)
	require.Empty(t, createdRating.DeletedAt)
	require.Equal(t, arg.RatingValue, createdRating.RatingValue)
	require.Equal(t, arg.PdID, createdRating.PdID)
	require.Equal(t, arg.UsrID, createdRating.UsrID)

	return createdRating
}

func createRandomRatingAverageCalculator(t *testing.T) (Product, float64) {
	randomProduct := createRandomProduct(t)
	var sum = 0.0

	for i := 0; i < 100; i++ {
		randomUser := createRandomUser(t)
		ratingValue := util.RandomInt(10, 1)

		arg := CreateRatingParams{
			RatingValue: sql.NullString{
				String: strconv.Itoa(int(ratingValue)),
				Valid:  true,
			},
			PdID: sql.NullInt64{
				Int64: randomProduct.PdID,
				Valid: true,
			},
			UsrID: sql.NullInt64{
				Int64: randomUser.UsrID,
				Valid: true,
			},
			Liked: sql.NullBool{
				Bool:  true,
				Valid: true,
			},
		}

		createdRating, err := testQueries.CreateRating(context.Background(), arg)
		require.NoError(t, err)
		require.NotEmpty(t, createdRating)

		require.NotZero(t, createdRating.RatingID)
		require.NotEmpty(t, createdRating.CreatedAt)
		require.NotEmpty(t, createdRating.UpdatedAt)
		require.Empty(t, createdRating.DeletedAt)
		require.Equal(t, arg.RatingValue, createdRating.RatingValue)
		require.Equal(t, arg.PdID, createdRating.PdID)
		require.Equal(t, arg.UsrID, createdRating.UsrID)

		sum += float64(ratingValue)
	}

	return randomProduct, sum / 100
}

func createRandomRatingForSpecificUserAndSpecificProduct(t *testing.T) (Rating, User, Product) {
	randomProduct := createRandomProduct(t)
	randomUser := createRandomUser(t)

	arg := CreateRatingParams{
		RatingValue: sql.NullString{
			String: strconv.Itoa(int(util.RandomInt(10, 1))),
			Valid:  true,
		},
		PdID: sql.NullInt64{
			Int64: randomProduct.PdID,
			Valid: true,
		},
		UsrID: sql.NullInt64{
			Int64: randomUser.UsrID,
			Valid: true,
		},
		Liked: sql.NullBool{
			Bool:  util.RandomBoolean(),
			Valid: true,
		},
	}

	createdRating, err := testQueries.CreateRating(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, createdRating)

	require.NotZero(t, createdRating.RatingID)
	require.NotEmpty(t, createdRating.CreatedAt)
	require.NotEmpty(t, createdRating.UpdatedAt)
	require.Empty(t, createdRating.DeletedAt)
	require.Equal(t, arg.RatingValue, createdRating.RatingValue)
	require.Equal(t, arg.PdID, createdRating.PdID)
	require.Equal(t, arg.UsrID, createdRating.UsrID)

	return createdRating, randomUser, randomProduct
}

// createRandomRatingForSpecificUserAndSpecificProduct creates a ratting for a product which we know its image and category
// image and category is no longer random for this created product as far as testing is concerned
func createRandomLikedProductForSpecificUser(t *testing.T) User {
	randomUser := createRandomUser(t)

	for i := 0; i < 20; i++ {
		randomImage := createRandomImage(t)
		randomCategory := createRandomCategory(t)

		createdProductArg := CreateProductParams{
			PdName: util.RandomString(7),
			ShortDescription: sql.NullString{
				String: util.RandomString(200),
				Valid:  true,
			},
			LongDescription: sql.NullString{
				String: util.RandomString(400),
				Valid:  true,
			},
			ImgID: sql.NullInt64{
				Int64: randomImage.ImgID,
				Valid: true,
			},
			CategoryID: sql.NullInt64{
				Int64: randomCategory.CategoryID,
				Valid: true,
			},
		}
		createdProduct, _ := testQueries.CreateProduct(context.Background(), createdProductArg)

		arg := CreateRatingParams{
			RatingValue: sql.NullString{
				String: strconv.Itoa(int(util.RandomInt(10, 1))),
				Valid:  true,
			},
			PdID: sql.NullInt64{
				Int64: createdProduct.PdID,
				Valid: true,
			},
			UsrID: sql.NullInt64{
				Int64: randomUser.UsrID,
				Valid: true,
			},
			Liked: sql.NullBool{
				Bool:  true,
				Valid: true,
			},
		}

		createdRating, err := testQueries.CreateRating(context.Background(), arg)
		require.NoError(t, err)
		require.NotEmpty(t, createdRating)

		require.NotZero(t, createdRating.RatingID)
		require.NotEmpty(t, createdRating.CreatedAt)
		require.NotEmpty(t, createdRating.UpdatedAt)
		require.Empty(t, createdRating.DeletedAt)
		require.Equal(t, arg.RatingValue, createdRating.RatingValue)
		require.Equal(t, arg.PdID, createdRating.PdID)
		require.Equal(t, arg.UsrID, createdRating.UsrID)
	}

	return randomUser
}

func TestQueries_CreateRating(t *testing.T) {
	createRandomRating(t)
}

func TestQueries_GetRatingForSpecificProductForSpecificUser(t *testing.T) {
	rating, user, product := createRandomRatingForSpecificUserAndSpecificProduct(t)

	arg := GetRatingForSpecificProductForSpecificUserParams{
		UsrID: sql.NullInt64{
			Int64: user.UsrID,
			Valid: true,
		},
		PdID: sql.NullInt64{
			Int64: product.PdID,
			Valid: true,
		},
	}

	fetchedRating, err := testQueries.GetRatingForSpecificProductForSpecificUser(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, fetchedRating)

	require.Equal(t, rating.UsrID, fetchedRating.UsrID)
	require.Equal(t, rating.PdID, fetchedRating.PdID)
	require.Equal(t, rating.Liked, fetchedRating.Liked)
}

func TestQueries_ListLikedProductsForSpecificUser(t *testing.T) {
	user := createRandomLikedProductForSpecificUser(t)

	arg := ListLikedProductsForSpecificUserParams{
		UsrID: sql.NullInt64{
			Int64: user.UsrID,
			Valid: true,
		},
		Limit:  10,
		Offset: 0,
	}

	fetchedRatings, err := testQueries.ListLikedProductsForSpecificUser(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, fetchedRatings)
	require.Len(t, fetchedRatings, 10)

	for _, rating := range fetchedRatings {
		require.NotEmpty(t, rating)
		require.True(t, rating.Liked.Bool)
		require.Equal(t, user.UsrID, rating.UsrID.Int64)
	}
}

func TestQueries_AverageProductRatingForSpecificProduct(t *testing.T) {
	product, expectedAverageRating := createRandomRatingAverageCalculator(t)

	arg := sql.NullInt64{
		Int64: product.PdID,
		Valid: true,
	}

	fetchedAverageRating, err := testQueries.AverageProductRatingForSpecificProduct(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, fetchedAverageRating)

	require.Equal(t, expectedAverageRating, fetchedAverageRating)
}

func TestQueries_NumberOfProductRating(t *testing.T) {
	product, _ := createRandomRatingAverageCalculator(t)

	arg := sql.NullInt64{
		Int64: product.PdID,
		Valid: true,
	}

	fetchedNumberOfProductRating, err := testQueries.NumberOfProductRating(context.Background(), arg)

	require.NoError(t, err)
	require.NotEmpty(t, fetchedNumberOfProductRating)
	require.True(t, 100 == fetchedNumberOfProductRating)
}

func TestQueries_UpdateRating(t *testing.T) {
	createdRating, user, product := createRandomRatingForSpecificUserAndSpecificProduct(t)

	arg := UpdateRatingParams{
		RatingValue: sql.NullString{
			String: strconv.Itoa(int(util.RandomInt(10, 1))),
			Valid:  true,
		},
		Liked: sql.NullBool{
			Bool:  util.RandomBoolean(),
			Valid: true,
		},
		Comment: sql.NullString{
			String: util.RandomString(500),
			Valid:  true,
		},
		UsrID: sql.NullInt64{
			Int64: user.UsrID,
			Valid: true,
		},
		PdID: sql.NullInt64{
			Int64: product.PdID,
			Valid: true,
		},
	}

	updatedRating, err := testQueries.UpdateRating(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, updatedRating)
	require.True(t, updatedRating.UpdatedAt.After(createdRating.UpdatedAt))

	require.NotZero(t, updatedRating.RatingID)
	require.Equal(t, arg.RatingValue, updatedRating.RatingValue)
	require.Equal(t, arg.Liked, updatedRating.Liked)
	require.Equal(t, arg.Comment, updatedRating.Comment)
	require.Equal(t, arg.UsrID, updatedRating.UsrID)
	require.Equal(t, arg.PdID, updatedRating.PdID)
}
