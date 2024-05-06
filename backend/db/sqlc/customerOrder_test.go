package db

import (
	"coffeeHouse_API/util"
	"context"
	"database/sql"
	"github.com/stretchr/testify/require"
	"strconv"
	"testing"
)

func createRandomCustomerOrder(t *testing.T) CustomerOrder {
	randomUser := createRandomUser(t)

	createdCustomerOrder, err := testQueries.CreateCustomerOrder(context.Background(), sql.NullInt64{
		Int64: randomUser.UsrID,
		Valid: true,
	})
	require.NoError(t, err)
	require.NotEmpty(t, createdCustomerOrder)

	require.NotZero(t, createdCustomerOrder.CustomerOrderID)
	require.NotEmpty(t, createdCustomerOrder.UsrID)
	require.NotEmpty(t, createdCustomerOrder.CreatedAt)

	return createdCustomerOrder
}

// createRandomCustomerOrderForSpecificCustomer generates 20 orders for a specific user and returns user
// create a random attribute, category and image
// use category and image to create product
// use product and attribute to create product variant
// use product variant to create order item
// use order item to create customer order
// do all this to ensure that we have data linked together for testing purposes
func createRandomCustomerOrdersForSpecificCustomer(t *testing.T) User {
	randomUser := createRandomUser(t)
	for i := 0; i < 20; i++ {
		createdCustomerOrder, err := testQueries.CreateCustomerOrder(context.Background(), sql.NullInt64{
			Int64: randomUser.UsrID,
			Valid: true,
		})

		randomAttribute := createRandomAttribute(t)
		randomCategory := createRandomCategory(t)
		randomImage := createRandomImage(t)

		arg := CreateProductParams{
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
		createdProduct, _ := testQueries.CreateProduct(context.Background(), arg)

		productVariantArg := CreateProductVariantParams{
			Price: strconv.Itoa(int(util.RandomInt(10000, 200))),
			PdID: sql.NullInt64{
				Int64: createdProduct.PdID,
				Valid: true,
			},
			AttID: sql.NullInt64{
				Int64: randomAttribute.AttID,
				Valid: true,
			},
		}
		createdProductVariant, _ := testQueries.CreateProductVariant(context.Background(), productVariantArg)

		orderItemArg := CreateOrderItemParams{
			Quantity: sql.NullInt32{
				Int32: int32(util.RandomInt(10, 2)),
				Valid: true,
			},
			PricePerItem: strconv.Itoa(int(util.RandomInt(10000, 200))),
			ProductVariantID: sql.NullInt64{
				Int64: createdProductVariant.ProductVariantID,
				Valid: true,
			},
			CustomerOrderID: sql.NullInt64{
				Int64: createdCustomerOrder.CustomerOrderID,
				Valid: true,
			},
		}

		testQueries.CreateOrderItem(context.Background(), orderItemArg)

		require.NoError(t, err)
		require.NotEmpty(t, createdCustomerOrder)

		require.NotZero(t, createdCustomerOrder.CustomerOrderID)
		require.NotEmpty(t, createdCustomerOrder.UsrID)
		require.NotEmpty(t, createdCustomerOrder.CreatedAt)
	}

	return randomUser
}

func TestQueries_CreateCustomerOrder(t *testing.T) {
	createRandomCustomerOrder(t)
}

func TestQueries_GetSpecificCustomerOrder(t *testing.T) {
	createdCustomerOrder := createRandomCustomerOrder(t)

	fetchedCustomerOrder, err := testQueries.GetSpecificCustomerOrder(context.Background(), createdCustomerOrder.CustomerOrderID)
	require.NoError(t, err)
	require.NotEmpty(t, fetchedCustomerOrder)

	require.Equal(t, createdCustomerOrder.CustomerOrderID, fetchedCustomerOrder.CustomerOrderID)
	require.Equal(t, createdCustomerOrder.UsrID, fetchedCustomerOrder.UsrID)
	require.Equal(t, createdCustomerOrder.CreatedAt, fetchedCustomerOrder.CreatedAt)
}

func TestQueries_ListAllCustomerOrders(t *testing.T) {
	//	TODO: How do we even test this shit
}

func TestQueries_ListCustomerOrdersForSpecificUser(t *testing.T) {
	randomCustomer := createRandomCustomerOrdersForSpecificCustomer(t)

	arg := ListCustomerOrdersForSpecificUserParams{
		UsrID: sql.NullInt64{
			Int64: randomCustomer.UsrID,
			Valid: true,
		},
		Limit:  10,
		Offset: 0,
	}
	fetchedCustomerOrderHistory, err := testQueries.ListCustomerOrdersForSpecificUser(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, fetchedCustomerOrderHistory)
	require.Len(t, fetchedCustomerOrderHistory, 10)

	for _, customerOrder := range fetchedCustomerOrderHistory {
		require.NotEmpty(t, customerOrder)
		require.Equal(t, randomCustomer.UsrID, customerOrder.UsrID.Int64)
	}
}

func TestQueries_DeleteCustomerOrder(t *testing.T) {
	createdCustomerOrder := createRandomCustomerOrder(t)

	err := testQueries.DeleteCustomerOrder(context.Background(), createdCustomerOrder.CustomerOrderID)
	require.NoError(t, err)

	fetchedCustomerOrder, err2 := testQueries.GetSpecificCustomerOrder(context.Background(), createdCustomerOrder.CustomerOrderID)
	require.Error(t, err2)
	require.EqualError(t, err2, sql.ErrNoRows.Error())
	require.Empty(t, fetchedCustomerOrder)
}
