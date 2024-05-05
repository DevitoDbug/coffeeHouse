package db

import (
	"coffeeHouse_API/util"
	"context"
	"database/sql"
	"github.com/stretchr/testify/require"
	"strconv"
	"testing"
)

func createRandomOrderItem(t *testing.T) OrderItem {
	randomProductVariant := createRandomProductVariant(t)
	randomCustomerOrder := createRandomCustomerOrder(t)

	arg := CreateOrderItemParams{
		Quantity: sql.NullInt32{
			Int32: int32(util.RandomInt(20, 5)),
			Valid: true,
		},
		PricePerItem: strconv.Itoa(int(util.RandomInt(10000, 100))),
		ProductVariantID: sql.NullInt64{
			Int64: randomProductVariant.ProductVariantID,
			Valid: true,
		},
		CustomerOrderID: sql.NullInt64{
			Int64: randomCustomerOrder.CustomerOrderID,
			Valid: true,
		},
	}

	createdOrderItem, err := testQueries.CreateOrderItem(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, createdOrderItem)

	require.NotZero(t, createdOrderItem.OrderItemID)
	require.Equal(t, arg.Quantity, createdOrderItem.Quantity)
	require.Equal(t, arg.PricePerItem, createdOrderItem.PricePerItem)
	require.Equal(t, arg.ProductVariantID, createdOrderItem.ProductVariantID)
	require.Equal(t, arg.CustomerOrderID, createdOrderItem.CustomerOrderID)
	require.NotEmpty(t, createdOrderItem.CreatedAt)

	return createdOrderItem
}

func createRandomOrderItemForSpecificCustomerOrder(t *testing.T) CustomerOrder {
	randomCustomerOrder := createRandomCustomerOrder(t)

	for i := 0; i < 20; i++ {
		randomProductVariant := createRandomProductVariant(t)

		arg := CreateOrderItemParams{
			Quantity: sql.NullInt32{
				Int32: int32(util.RandomInt(20, 5)),
				Valid: true,
			},
			PricePerItem: strconv.Itoa(int(util.RandomInt(10000, 100))),
			ProductVariantID: sql.NullInt64{
				Int64: randomProductVariant.ProductVariantID,
				Valid: true,
			},
			CustomerOrderID: sql.NullInt64{
				Int64: randomCustomerOrder.CustomerOrderID,
				Valid: true,
			},
		}

		createdOrderItem, err := testQueries.CreateOrderItem(context.Background(), arg)
		require.NoError(t, err)
		require.NotEmpty(t, createdOrderItem)

		require.NotZero(t, createdOrderItem.OrderItemID)
		require.Equal(t, arg.Quantity, createdOrderItem.Quantity)
		require.Equal(t, arg.PricePerItem, createdOrderItem.PricePerItem)
		require.Equal(t, arg.ProductVariantID, createdOrderItem.ProductVariantID)
		require.Equal(t, arg.CustomerOrderID, createdOrderItem.CustomerOrderID)
		require.NotEmpty(t, createdOrderItem.CreatedAt)
	}
	return randomCustomerOrder
}

func TestQueries_CreateOrderItem(t *testing.T) {
	createRandomOrderItem(t)
}

func TestQueries_ListOrderItems(t *testing.T) {
	for i := 0; i < 20; i++ {
		createRandomOrderItem(t)
	}

	arg := ListOrderItemsParams{
		Limit:  10,
		Offset: 0,
	}

	fetchedOrderItems, err := testQueries.ListOrderItems(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, fetchedOrderItems)
	require.Len(t, fetchedOrderItems, 10)

	for _, item := range fetchedOrderItems {
		require.NotEmpty(t, item)
	}
}

func TestQueries_ListOrderItemsForSpecificCustomerOrder(t *testing.T) {
	randomCustomerOrder := createRandomOrderItemForSpecificCustomerOrder(t)

	arg := ListOrderItemsForSpecificCustomerOrderParams{
		Limit:  10,
		Offset: 0,
		CustomerOrderID: sql.NullInt64{
			Int64: randomCustomerOrder.CustomerOrderID,
			Valid: true,
		},
	}

	fetchedOrderItems, err := testQueries.ListOrderItemsForSpecificCustomerOrder(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, fetchedOrderItems)
	require.Len(t, fetchedOrderItems, 10)

	for _, item := range fetchedOrderItems {
		require.NotEmpty(t, item)
		require.Equal(t, randomCustomerOrder.CustomerOrderID, item.CustomerOrderID.Int64)
	}
}

func TestQueries_DeleteOrderItem(t *testing.T) {
	createdOrderItem := createRandomOrderItem(t)

	err1 := testQueries.DeleteOrderItem(context.Background(), createdOrderItem.OrderItemID)
	require.NoError(t, err1)

	fetchedOrderItems, err2 := testQueries.GetUser(context.Background(), createdOrderItem.OrderItemID)
	require.Error(t, err2)
	require.EqualError(t, err2, sql.ErrNoRows.Error())
	require.Empty(t, fetchedOrderItems)
}
