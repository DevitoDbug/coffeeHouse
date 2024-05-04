package db

import (
	"coffeeHouse_API/util"
	"context"
	"database/sql"
	"github.com/stretchr/testify/require"
	"testing"
)

func createRandomProduct(t *testing.T) Product {
	randomCategory := createRandomCategory(t)
	randomImage := createRandomImage(t)

	product := Product{
		PdName: util.RandomString(7),
		ShortDescription: sql.NullString{
			String: util.RandomString(100),
			Valid:  true,
		},
		LongDescription: sql.NullString{
			String: util.RandomString(200),
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

	arg := CreateProductParams{
		PdName:           product.PdName,
		ShortDescription: product.ShortDescription,
		LongDescription:  product.LongDescription,
		ImgID:            product.ImgID,
		CategoryID:       product.CategoryID,
	}

	createdProduct, err := testQueries.CreateProduct(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, createdProduct)

	require.NotEmpty(t, createdProduct.PdName)
	require.NotEmpty(t, createdProduct.ShortDescription)
	require.NotEmpty(t, createdProduct.LongDescription)

	require.Equal(t, product.PdName, createdProduct.PdName)
	require.Equal(t, randomCategory.CategoryID, createdProduct.CategoryID.Int64)
	require.Equal(t, randomImage.ImgID, createdProduct.ImgID.Int64)

	return createdProduct
}

// createRandomProductForSpecificCategory generates random products but keeps the
// category same for all the products generated
// without this all categories used int randomly generated products would likely be unique
func createRandomProductsForSpecificCategory(t *testing.T) ([]Product, Category) {
	var products []Product
	randomCategory := createRandomCategory(t)

	for i := 0; i < 20; i++ {
		//Randomise the image for every product
		randomImage := createRandomImage(t)

		product := Product{
			PdName: util.RandomString(7),
			ShortDescription: sql.NullString{
				String: util.RandomString(100),
				Valid:  true,
			},
			LongDescription: sql.NullString{
				String: util.RandomString(200),
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

		arg := CreateProductParams{
			PdName:           product.PdName,
			ShortDescription: product.ShortDescription,
			LongDescription:  product.LongDescription,
			ImgID:            product.ImgID,
			CategoryID:       product.CategoryID,
		}

		createdProduct, err := testQueries.CreateProduct(context.Background(), arg)
		require.NoError(t, err)
		require.NotEmpty(t, createdProduct)

		require.NotEmpty(t, createdProduct.PdName)
		require.NotEmpty(t, createdProduct.ShortDescription)
		require.NotEmpty(t, createdProduct.LongDescription)

		require.Equal(t, product.PdName, createdProduct.PdName)
		require.Equal(t, randomCategory.CategoryID, createdProduct.CategoryID.Int64)
		require.Equal(t, randomImage.ImgID, createdProduct.ImgID.Int64)
		products = append(products, createdProduct)
	}

	return products, randomCategory
}

func TestQueries_CreateProduct(t *testing.T) {
	createRandomProduct(t)
}

func TestQueries_GetProduct(t *testing.T) {
	createdProduct := createRandomProduct(t)

	fetchedProduct, err := testQueries.GetProduct(context.Background(), createdProduct.PdID)
	require.NoError(t, err)
	require.NotEmpty(t, fetchedProduct)

	require.Equal(t, createdProduct.PdID, fetchedProduct.PdID)
	require.Equal(t, createdProduct.ImgID, fetchedProduct.ImgID)
	require.Equal(t, createdProduct.CategoryID, fetchedProduct.CategoryID)
	require.Equal(t, createdProduct.LongDescription, fetchedProduct.LongDescription)
	require.Equal(t, createdProduct.ShortDescription, fetchedProduct.ShortDescription)
}

func TestQueries_ListProducts(t *testing.T) {
	for i := 0; i < 20; i++ {
		createRandomProduct(t)
	}

	arg := ListProductsParams{
		Limit:  5,
		Offset: 5,
	}

	fetchedProducts, err := testQueries.ListProducts(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, fetchedProducts)

	for _, product := range fetchedProducts {
		require.NotEmpty(t, product)
		require.Empty(t, product.DeletedAt)
	}
}

func TestQueries_ListProductForSpecificCategory(t *testing.T) {
	_, category := createRandomProductsForSpecificCategory(t)

	fetchedProducts, err := testQueries.ListProductForSpecificCategory(context.Background(), sql.NullInt64{
		Int64: category.CategoryID,
		Valid: true,
	})
	require.NoError(t, err)
	require.NotEmpty(t, fetchedProducts)

	//createRandomProductsForSpecificCategory generated at least 20 for a category
	require.True(t, len(fetchedProducts) >= 20)

	for _, product := range fetchedProducts {
		require.NotEmpty(t, product)
		require.Equal(t, category.CategoryName, product.CategoryName)
	}
}

func TestQueries_UpdateProduct(t *testing.T) {
	originalProduct := createRandomProduct(t)

	//foreign key constraint requires we use images and categories already
	//existing in the db, hence we create them below
	randomImage := createRandomImage(t)
	randomCategory := createRandomCategory(t)

	changes := Product{
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

	arg := UpdateProductParams{
		PdName:           changes.PdName,
		ShortDescription: changes.ShortDescription,
		LongDescription:  changes.LongDescription,
		CategoryID:       changes.CategoryID,
		ImgID:            changes.ImgID,
		PdID:             originalProduct.PdID,
	}

	updatedProduct, err := testQueries.UpdateProduct(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, updatedProduct)

	require.Equal(t, originalProduct.PdID, updatedProduct.PdID)
	require.Equal(t, changes.PdName, updatedProduct.PdName)
	require.Equal(t, changes.ShortDescription, updatedProduct.ShortDescription)
	require.Equal(t, changes.LongDescription, updatedProduct.LongDescription)
	require.Equal(t, changes.CategoryID, updatedProduct.CategoryID)

	require.True(t, updatedProduct.UpdatedAt.After(originalProduct.UpdatedAt))
}

func TestQueries_DeleteProductTemporarily(t *testing.T) {
	createdProduct := createRandomProduct(t)

	deletedProduct, err1 := testQueries.DeleteProductTemporarily(context.Background(), createdProduct.PdID)
	require.NoError(t, err1)
	require.NotEmpty(t, deletedProduct)
	require.NotEmpty(t, deletedProduct.DeletedAt)

	fetchedProduct, err2 := testQueries.GetProduct(context.Background(), createdProduct.PdID)
	require.Error(t, err2)
	require.EqualError(t, err2, sql.ErrNoRows.Error())
	require.Empty(t, fetchedProduct)
}

func TestQueries_RestoreProduct(t *testing.T) {
	createdProduct := createRandomProduct(t)
	testQueries.DeleteProductTemporarily(context.Background(), createdProduct.PdID)

	restoredProduct, err := testQueries.RestoreProduct(context.Background(), createdProduct.PdID)
	require.NoError(t, err)
	require.NotEmpty(t, restoredProduct)
	require.Empty(t, restoredProduct.DeletedAt)
}

func TestQueries_DeleteProduct(t *testing.T) {
	createdProduct := createRandomProduct(t)

	err1 := testQueries.DeleteProduct(context.Background(), createdProduct.PdID)
	require.NoError(t, err1)

	fetchedProduct, err2 := testQueries.GetProduct(context.Background(), createdProduct.PdID)
	require.Error(t, err2)
	require.EqualError(t, err2, sql.ErrNoRows.Error())
	require.Empty(t, fetchedProduct)
}
