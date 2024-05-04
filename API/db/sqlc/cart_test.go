package db

import (
	"context"
	"database/sql"
	"github.com/stretchr/testify/require"
	"testing"
)

func createRandomCart(t *testing.T) Cart {
	user := createRandomUser(t)
	createdCart := Cart{
		UsrID: sql.NullInt64{
			Int64: user.UsrID,
			Valid: true,
		},
	}
	createdCart, err := testQueries.CreateCart(context.Background(), createdCart.UsrID)
	require.NoError(t, err)
	require.NotEmpty(t, createdCart)
	require.NotEmpty(t, createdCart.UsrID)
	require.NotEmpty(t, createdCart.CreatedAt)
	require.NotEmpty(t, createdCart.UpdatedAt)

	return createdCart
}

func TestQueries_CreateCart(t *testing.T) {
	createRandomCart(t)
}

func TestQueries_GetCart(t *testing.T) {
	createdCart := createRandomCart(t)

	fetchedCart, err := testQueries.GetCart(context.Background(), createdCart.CartID)
	require.NoError(t, err)
	require.NotEmpty(t, fetchedCart)

	require.Equal(t, createdCart.UsrID, fetchedCart.UsrID)
}

func TestQueries_ListCarts(t *testing.T) {
	for i := 0; i < 20; i++ {
		createRandomCart(t)
	}
	arg := ListCartsParams{
		Limit:  5,
		Offset: 0,
	}
	createdCarts, err := testQueries.ListCarts(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, createdCarts)
	require.Len(t, createdCarts, 5)

	for _, createdCart := range createdCarts {
		require.NotEmpty(t, createdCart)
	}
}

// TODO: Create the unit test for the long stupid ListCartItemsForSpecificUserCart

func TestQueries_DeleteCart(t *testing.T) {
	createdCart := createRandomCart(t)

	err := testQueries.DeleteCart(context.Background(), createdCart.CartID)
	require.NoError(t, err)

	fetchedCart, err2 := testQueries.GetCart(context.Background(), createdCart.CartID)
	require.Error(t, err2)
	require.EqualError(t, err2, sql.ErrNoRows.Error())
	require.Empty(t, fetchedCart)
}
