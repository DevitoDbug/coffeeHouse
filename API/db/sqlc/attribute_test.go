package db

import (
	"coffeeHouse_API/util"
	"context"
	"database/sql"
	"github.com/stretchr/testify/require"
	"testing"
)

func createRandomAttribute(t *testing.T) Attribute {
	arg := CreateAttributeParams{
		AttValue: sql.NullString{
			String: util.RandomString(5),
			Valid:  true,
		},
		Abbreviations: sql.NullString{
			String: util.RandomString(1),
			Valid:  true,
		},
	}

	createdAttribute, err := testQueries.CreateAttribute(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, createdAttribute)

	require.NotZero(t, createdAttribute.CreatedAt)
	require.NotZero(t, createdAttribute.UpdatedAt)
	require.Empty(t, createdAttribute.DeletedAt)
	require.Equal(t, arg.AttValue, createdAttribute.AttValue)
	require.Equal(t, arg.Abbreviations, createdAttribute.Abbreviations)

	return createdAttribute
}

func TestQueries_CreateAttribute(t *testing.T) {
	createRandomAttribute(t)
}

func TestQueries_GetAttribute(t *testing.T) {
	attribute := createRandomAttribute(t)

	fetchedAttribute, err := testQueries.GetAttribute(context.Background(), attribute.AttID)
	require.NoError(t, err)
	require.NotEmpty(t, fetchedAttribute)

	require.Equal(t, attribute.AttValue, fetchedAttribute.AttValue)
	require.Equal(t, attribute.Abbreviations, fetchedAttribute.Abbreviations)
}

func TestQueries_ListAttribute(t *testing.T) {
	for i := 0; i < 5; i++ {
		createRandomAttribute(t)
	}

	args := ListAttributeParams{
		Limit:  5,
		Offset: 5,
	}

	attributeList, err := testQueries.ListAttribute(context.Background(), args)
	require.NoError(t, err)
	require.NotEmpty(t, attributeList)
	require.Len(t, attributeList, 5)

	for _, attribute := range attributeList {
		require.NotEmpty(t, attribute)
		require.Empty(t, attribute.DeletedAt)
	}
}

func TestQueries_UpdateAttribute(t *testing.T) {
	attribute := createRandomAttribute(t)
	attValue := util.RandomString(5)
	abbreviation := util.RandomString(1)
	arg := UpdateAttributeParams{
		AttValue: sql.NullString{
			String: attValue,
			Valid:  true,
		},
		Abbreviations: sql.NullString{
			String: abbreviation,
			Valid:  true,
		},
		AttID: attribute.AttID,
	}

	updatedAttribute, err := testQueries.UpdateAttribute(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, updatedAttribute)

	require.NotZero(t, updatedAttribute.UpdatedAt)
	require.True(t, updatedAttribute.UpdatedAt.After(attribute.UpdatedAt))
	require.Empty(t, updatedAttribute.DeletedAt)
	require.Equal(t, arg.AttValue, updatedAttribute.AttValue)
	require.Equal(t, arg.Abbreviations, updatedAttribute.Abbreviations)
}

func TestQueries_DeleteAttribute(t *testing.T) {
	attribute := createRandomAttribute(t)

	err1 := testQueries.DeleteAttribute(context.Background(), attribute.AttID)
	require.NoError(t, err1)

	fetchedAttribute, err2 := testQueries.GetAttribute(context.Background(), attribute.AttID)
	require.Error(t, err2)
	require.EqualError(t, err2, sql.ErrNoRows.Error())
	require.Empty(t, fetchedAttribute)
}

func TestQueries_DeleteAttributeTemporarily(t *testing.T) {
	attribute := createRandomAttribute(t)

	deletedAttribute, err1 := testQueries.DeleteAttributeTemporarily(context.Background(), attribute.AttID)
	require.NoError(t, err1)
	require.NotEmpty(t, deletedAttribute)
	require.NotEmpty(t, deletedAttribute.DeletedAt)

	reDeletedAttribute, err2 := testQueries.DeleteAttributeTemporarily(context.Background(), attribute.AttID)
	require.Error(t, err2)
	require.EqualError(t, err2, sql.ErrNoRows.Error())
	require.Empty(t, reDeletedAttribute)

	fetchedAttribute, err3 := testQueries.GetAttribute(context.Background(), attribute.AttID)
	require.Error(t, err3)
	require.EqualError(t, err3, sql.ErrNoRows.Error())
	require.Empty(t, fetchedAttribute)
}

func TestQueries_RestoreAttribute(t *testing.T) {
	attribute := createRandomAttribute(t)

	testQueries.DeleteAttributeTemporarily(context.Background(), attribute.AttID)
	restoredAttribute, err := testQueries.RestoreAttribute(context.Background(), attribute.AttID)
	require.NoError(t, err)
	require.NotEmpty(t, restoredAttribute)
	require.Empty(t, restoredAttribute.DeletedAt)

	require.Equal(t, attribute.AttID, restoredAttribute.AttID)
	require.Equal(t, attribute.Abbreviations, restoredAttribute.Abbreviations)
}
