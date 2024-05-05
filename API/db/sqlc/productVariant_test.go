package db

import (
	"coffeeHouse_API/util"
	"context"
	"database/sql"
	"github.com/stretchr/testify/require"
	"strconv"
	"testing"
)

func createRandomProductVariant(t *testing.T) ProductVariant {
	randomProduct := createRandomProduct(t)
	randomAttribute := createRandomAttribute(t)

	arg := CreateProductVariantParams{
		Price: strconv.Itoa(int(util.RandomInt(10000, 200))),
		PdID: sql.NullInt64{
			Int64: randomProduct.PdID,
			Valid: true,
		},
		AttID: sql.NullInt64{
			Int64: randomAttribute.AttID,
			Valid: true,
		},
	}

	createdProductVariant, err := testQueries.CreateProductVariant(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, createdProductVariant)

	require.NotEmpty(t, createdProductVariant.Price)
	require.NotEmpty(t, createdProductVariant.AttID)
	require.NotEmpty(t, createdProductVariant.PdID)
	require.NotEmpty(t, createdProductVariant.CreatedAt)
	require.NotEmpty(t, createdProductVariant.UpdatedAt)
	require.Empty(t, createdProductVariant.DeletedAt)
	require.NotZero(t, createdProductVariant.ProductVariantID)

	return createdProductVariant
}

func TestQueries_CreateProductVariant(t *testing.T) {
	createRandomProductVariant(t)
}

func TestQueries_GetProductVariant(t *testing.T) {
	createdProductVariant := createRandomProductVariant(t)

	fetchedProductVariant, err := testQueries.GetProductVariant(context.Background(), createdProductVariant.ProductVariantID)
	require.NoError(t, err)
	require.NotEmpty(t, fetchedProductVariant)

	require.Equal(t, createdProductVariant.Price, fetchedProductVariant.Price)
	require.Equal(t, createdProductVariant.PdID, fetchedProductVariant.PdID)
	require.Equal(t, createdProductVariant.AttID, fetchedProductVariant.AttID)
	require.Empty(t, createdProductVariant.DeletedAt)
}

func TestQueries_ListProductsVariant(t *testing.T) {
	for i := 0; i < 20; i++ {
		createRandomProductVariant(t)
	}

	arg := ListProductsVariantParams{
		Limit:  5,
		Offset: 0,
	}

	fetchedProductVariants, err := testQueries.ListProductsVariant(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, fetchedProductVariants)
	require.Len(t, fetchedProductVariants, 5)

	for _, variant := range fetchedProductVariants {
		require.NotEmpty(t, variant)
	}
}

func TestQueries_UpdateProductVariant(t *testing.T) {
	randomProduct := createRandomProduct(t)
	randomAttribute := createRandomAttribute(t)
	originalProductVariant := createRandomProductVariant(t)

	arg := UpdateProductVariantParams{
		Price: strconv.Itoa(int(util.RandomInt(10000, 100))),
		PdID: sql.NullInt64{
			Int64: randomProduct.PdID,
			Valid: true,
		},
		AttID: sql.NullInt64{
			Int64: randomAttribute.AttID,
			Valid: true,
		},
		ProductVariantID: originalProductVariant.ProductVariantID,
	}

	updatedProductVariant, err := testQueries.UpdateProductVariant(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, updatedProductVariant)

	require.Equal(t, originalProductVariant.ProductVariantID, updatedProductVariant.ProductVariantID)
	require.NotEqual(t, originalProductVariant.UpdatedAt, updatedProductVariant.UpdatedAt)
	require.True(t, updatedProductVariant.UpdatedAt.After(originalProductVariant.UpdatedAt))

	require.Equal(t, arg.Price, updatedProductVariant.Price)
	require.Equal(t, arg.PdID, updatedProductVariant.PdID)
	require.Equal(t, arg.AttID, updatedProductVariant.AttID)

}

func TestQueries_DeleteProductVariantTemporarily(t *testing.T) {
	createdProductVariant := createRandomProductVariant(t)

	deletedProductVariant, err1 := testQueries.DeleteProductVariantTemporarily(context.Background(), createdProductVariant.ProductVariantID)
	require.NoError(t, err1)
	require.NotEmpty(t, deletedProductVariant)

	require.NotEmpty(t, deletedProductVariant.DeletedAt)
	require.Equal(t, createdProductVariant.Price, deletedProductVariant.Price)
	require.Equal(t, createdProductVariant.PdID, deletedProductVariant.PdID)
	require.Equal(t, createdProductVariant.AttID, deletedProductVariant.AttID)
}

func TestQueries_RestoreProductVariant(t *testing.T) {
	createdProductVariant := createRandomProductVariant(t)
	testQueries.DeleteProductVariantTemporarily(context.Background(), createdProductVariant.ProductVariantID)

	restoredProductVariant, err := testQueries.RestoreProductVariant(context.Background(), createdProductVariant.ProductVariantID)
	require.NoError(t, err)
	require.NotEmpty(t, restoredProductVariant)

	require.Empty(t, restoredProductVariant.DeletedAt)
	require.Equal(t, createdProductVariant.Price, restoredProductVariant.Price)
	require.Equal(t, createdProductVariant.PdID, restoredProductVariant.PdID)
	require.Equal(t, createdProductVariant.AttID, restoredProductVariant.AttID)
}

func TestQueries_DeleteProductVariant(t *testing.T) {
	createdProductVariant := createRandomProductVariant(t)

	err1 := testQueries.DeleteProductVariant(context.Background(), createdProductVariant.ProductVariantID)
	require.NoError(t, err1)

	fetchedProductVariant, err2 := testQueries.GetProductVariant(context.Background(), createdProductVariant.ProductVariantID)
	require.Error(t, err2)
	require.EqualError(t, err2, sql.ErrNoRows.Error())
	require.Empty(t, fetchedProductVariant)
}
