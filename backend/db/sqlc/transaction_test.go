package db

import (
	"coffeeHouse_API/util"
	"database/sql"
	"strconv"
	"testing"
)

func createRandomOrderItems(t *testing.T, numberOfItems int) (items []OrderItemForBulkOrders) {
	for i := 0; i < numberOfItems; i++ {
		randomProductVariant := createRandomProductVariant(t)
		newItem := OrderItemForBulkOrders{
			Quantity: sql.NullInt32{
				Int32: int32(util.RandomInt(10, 2)),
				Valid: true,
			},
			PricePerItem: strconv.Itoa(int(util.RandomInt(10000, 100))),
			ProductVariantID: sql.NullInt64{
				Int64: randomProductVariant.ProductVariantID,
				Valid: true,
			},
		}
		items = append(items, newItem)
	}
	return
}

func TestStore_BulkOrderInsertTx(t *testing.T) {
	randomCustomer := createRandomUser(t)
	randomOrderItems := createRandomOrderItems(t, 100)

	arg := BulkOrderInsertForOneUserParams{
		CustomerId: sql.NullInt64{
			Int64: randomCustomer.UsrID,
			Valid: true,
		},
		OrderItems: randomOrderItems,
	}

	sentOrders, err := BulkOrderInsertTx
}
