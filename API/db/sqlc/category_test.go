package db

import (
	"coffeeHouse_API/util"
	"context"
	"database/sql"
	"github.com/stretchr/testify/require"
	"testing"
)

func createRandomCategory(t *testing.T) Category {
	arg := Category{
		CategoryName: util.RandomString(5),
	}
	createdCategory, err := testQueries.CreateCategory(context.Background(), arg.CategoryName)
	require.NoError(t, err)
	require.NotEmpty(t, createdCategory)

	require.NotEmpty(t, createdCategory.CreatedAt)
	require.NotEmpty(t, createdCategory.UpdatedAt)
	require.NotEmpty(t, createdCategory.CategoryName)
	require.Empty(t, createdCategory.DeletedAt)

	return createdCategory
}

func TestQueries_CreateCategory(t *testing.T) {
	createRandomCategory(t)
}

func TestQueries_GetCategory(t *testing.T) {
	createdCategory := createRandomCategory(t)

	fetchedCategory, err := testQueries.GetCategory(context.Background(), createdCategory.CategoryID)
	require.NoError(t, err)
	require.NotEmpty(t, fetchedCategory)

	require.Equal(t, createdCategory.CategoryID, fetchedCategory.CategoryID)
	require.Equal(t, createdCategory.CategoryName, fetchedCategory.CategoryName)
}

// TODO: check that the get command does not return a deleted item in all the tables

func TestQueries_ListCategory(t *testing.T) {
	for i := 0; i < 20; i++ {
		createRandomCategory(t)
	}
	arg := ListCategoryParams{
		Limit:  10,
		Offset: 0,
	}

	fetchedCategories, err := testQueries.ListCategory(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, fetchedCategories)
	require.Len(t, fetchedCategories, 10)

	for _, category := range fetchedCategories {
		require.NotEmpty(t, category)
		require.Empty(t, category.DeletedAt)
	}
}

func TestQueries_UpdateCategory(t *testing.T) {
	createdCategory := createRandomCategory(t)
	arg := UpdateCategoryParams{
		CategoryName: util.RandomString(7),
		CategoryID:   createdCategory.CategoryID,
	}
	updatedCategory, err := testQueries.UpdateCategory(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, updatedCategory)

	require.Equal(t, createdCategory.CategoryID, updatedCategory.CategoryID)
	require.Equal(t, updatedCategory.CategoryName, arg.CategoryName)
	require.True(t, updatedCategory.UpdatedAt.After(createdCategory.UpdatedAt))
}

func TestQueries_DeleteCategoryTemporarily(t *testing.T) {
	createdCategory := createRandomCategory(t)

	deletedCategory, err1 := testQueries.DeleteCategoryTemporarily(context.Background(), createdCategory.CategoryID)
	require.NoError(t, err1)
	require.NotEmpty(t, deletedCategory)
	require.NotEmpty(t, deletedCategory.DeletedAt)

	fetchedCategory, err2 := testQueries.GetCategory(context.Background(), createdCategory.CategoryID)
	require.Error(t, err2)
	require.EqualError(t, err2, sql.ErrNoRows.Error())
	require.Empty(t, fetchedCategory)
}

func TestQueries_RestoreCategory(t *testing.T) {
	createdCategory := createRandomCategory(t)
	testQueries.DeleteCategoryTemporarily(context.Background(), createdCategory.CategoryID)

	restoredCategory, err := testQueries.RestoreCategory(context.Background(), createdCategory.CategoryID)
	require.NoError(t, err)
	require.NotEmpty(t, restoredCategory)

	require.Equal(t, createdCategory.CategoryID, restoredCategory.CategoryID)
	require.Equal(t, createdCategory.CategoryName, restoredCategory.CategoryName)
}

func TestQueries_DeleteCategory(t *testing.T) {
	createdCategory := createRandomCategory(t)

	err1 := testQueries.DeleteCategory(context.Background(), createdCategory.CategoryID)
	require.NoError(t, err1)

	fetchedCategory, err2 := testQueries.GetCategory(context.Background(), createdCategory.CategoryID)
	require.Error(t, err2)
	require.EqualError(t, err2, sql.ErrNoRows.Error())
	require.Empty(t, fetchedCategory)
}
