package db

import (
	"coffeeHouse_API/util"
	"context"
	"database/sql"
	"github.com/stretchr/testify/require"
	"testing"
)

func createRandomCartItem(t *testing.T) CartItem {
	randomProductVariant := createRandomProductVariant(t)
	randomCart := createRandomCart(t)

	arg := CreateCartItemParams{
		Quantity: sql.NullInt32{
			Int32: int32(util.RandomInt(10, 0)),
			Valid: true,
		},
		ProductVariantID: sql.NullInt64{
			Int64: randomProductVariant.ProductVariantID,
			Valid: true,
		},
		CartID: sql.NullInt64{
			Int64: randomCart.CartID,
			Valid: true,
		},
	}

	createdCartItem, err := testQueries.CreateCartItem(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, createdCartItem)

	require.Equal(t, arg.Quantity, createdCartItem.Quantity)
	require.Equal(t, arg.ProductVariantID, createdCartItem.ProductVariantID)
	require.Equal(t, arg.CartID, createdCartItem.CartID)

	require.NotZero(t, createdCartItem.CartItemID)
	require.NotEmpty(t, createdCartItem.CreatedAt)
	require.NotEmpty(t, createdCartItem.UpdatedAt)
	require.NotEmpty(t, createdCartItem.Quantity)
	require.NotEmpty(t, createdCartItem.ProductVariantID)
	require.NotEmpty(t, createdCartItem.CartID)

	return createdCartItem
}

// createRandomCartItemsForSpecificCart generates at 20 cart items for a specific cart
func createRandomCartItemsForSpecificCart(t *testing.T) Cart {
	randomProductVariant := createRandomProductVariant(t)
	randomCart := createRandomCart(t)

	for i := 0; i < 20; i++ {
		arg := CreateCartItemParams{
			Quantity: sql.NullInt32{
				Int32: int32(util.RandomInt(10, 0)),
				Valid: true,
			},
			ProductVariantID: sql.NullInt64{
				Int64: randomProductVariant.ProductVariantID,
				Valid: true,
			},
			CartID: sql.NullInt64{
				Int64: randomCart.CartID,
				Valid: true,
			},
		}

		createdCartItem, err := testQueries.CreateCartItem(context.Background(), arg)
		require.NoError(t, err)
		require.NotEmpty(t, createdCartItem)

		require.Equal(t, arg.Quantity, createdCartItem.Quantity)
		require.Equal(t, arg.ProductVariantID, createdCartItem.ProductVariantID)
		require.Equal(t, arg.CartID, createdCartItem.CartID)

		require.NotZero(t, createdCartItem.CartItemID)
		require.NotEmpty(t, createdCartItem.CreatedAt)
		require.NotEmpty(t, createdCartItem.UpdatedAt)
		require.NotEmpty(t, createdCartItem.Quantity)
		require.NotEmpty(t, createdCartItem.ProductVariantID)
		require.NotEmpty(t, createdCartItem.CartID)

	}

	return randomCart
}

func TestQueries_CreateCartItem(t *testing.T) {
	createRandomCartItem(t)
}

func TestQueries_GetCartItem(t *testing.T) {
	createdCartItem := createRandomCartItem(t)

	fetchedCartItem, err := testQueries.GetCartItem(context.Background(), createdCartItem.CartItemID)
	require.NoError(t, err)
	require.NotEmpty(t, fetchedCartItem)

	require.NotZero(t, createdCartItem.CartItemID, fetchedCartItem.CartItemID)
	require.Equal(t, createdCartItem.Quantity, fetchedCartItem.Quantity)
	require.Equal(t, createdCartItem.ProductVariantID, fetchedCartItem.ProductVariantID)
	require.Equal(t, createdCartItem.CartID, fetchedCartItem.CartID)
}

func TestQueries_ListCartItemForSpecificCart(t *testing.T) {
	parentCart := createRandomCartItemsForSpecificCart(t)
	arg := ListCartItemForSpecificCartParams{
		CartID: sql.NullInt64{
			Int64: parentCart.CartID,
			Valid: true,
		},
		Limit:  5,
		Offset: 0,
	}

	fetchedCartItems, err := testQueries.ListCartItemForSpecificCart(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, fetchedCartItems)
	require.Len(t, fetchedCartItems, 5)

	for _, item := range fetchedCartItems {
		require.NotEmpty(t, item)
		require.Equal(t, parentCart.CartID, item.CartID.Int64)
	}
}

func TestQueries_UpdateCartItemQuantity(t *testing.T) {
	createdCartItem := createRandomCartItem(t)

	arg := UpdateCartItemQuantityParams{
		Quantity: sql.NullInt32{
			Int32: int32(util.RandomInt(20, 5)),
			Valid: true,
		},
		CartItemID: createdCartItem.CartItemID,
	}

	updatedCartItem, err := testQueries.UpdateCartItemQuantity(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, updatedCartItem)

	require.Equal(t, createdCartItem.CartItemID, updatedCartItem.CartItemID)
	require.NotEqual(t, createdCartItem.Quantity, updatedCartItem.Quantity)
	require.Equal(t, createdCartItem.CartID, updatedCartItem.CartID)
	require.True(t, updatedCartItem.UpdatedAt.After(createdCartItem.UpdatedAt))
}

func TestQueries_DeleteCartItem(t *testing.T) {
	createdCartItem := createRandomCartItem(t)

	err := testQueries.DeleteCartItem(context.Background(), createdCartItem.CartItemID)
	require.NoError(t, err)

	fetchedCartItem, err2 := testQueries.GetCartItem(context.Background(), createdCartItem.CartItemID)
	require.Error(t, err2)
	require.EqualError(t, err2, sql.ErrNoRows.Error())
	require.Empty(t, fetchedCartItem)
}
