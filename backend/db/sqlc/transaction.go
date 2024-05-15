package db

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"strings"
)

type OrderItemForBulkOrders struct {
	Quantity         sql.NullInt32 `json:"quantity"`
	PricePerItem     string        `json:"price_per_item"`
	ProductVariantID sql.NullInt64 `json:"product_variant_id"`
}

type BulkOrderInsertForOneUserParams struct {
	CustomerId sql.NullInt64            `json:"customer_id"`
	OrderItems []OrderItemForBulkOrders `json:"order_items"`
}

type CreatedOrderForUser struct {
	CustomerId sql.NullInt64 `json:"customer_id"`
	OrderItems []OrderItem   `json:"order_items"`
}

var bulkOrderInsertQueryString = `INSERT INTO order_item (quantity, price_per_item, product_variant_id, customer_order_id) VALUES %s RETURNING *`

// BulkOrderInsertTx provides a way to insert several orders belonging to one user
func (s *Store) BulkOrderInsertTx(ctx context.Context, arg BulkOrderInsertForOneUserParams) (CreatedOrderForUser, error) {
	var createdOrderForUser CreatedOrderForUser

	// start a transaction
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return createdOrderForUser, err
	}
	defer func(tx *sql.Tx) {
		err := tx.Rollback()
		if err != nil {
			log.Printf("Could not rollback the transaction")
			return
		}
	}(tx)

	// creating the order to the customerOrderTable
	customerOrder, err := s.Queries.CreateCustomerOrder(ctx, arg.CustomerId)
	if err != nil {
		return createdOrderForUser, err
	}

	placeholders := make([]string, len(arg.OrderItems))
	values := make([]interface{}, 0, len(arg.OrderItems)*4) // 4 placeholders per item

	for i, item := range arg.OrderItems {
		placeholders[i] = "(?, ?, ?, ?)"
		values = append(values, item.Quantity.Int32)
		values = append(values, item.PricePerItem)
		values = append(values, item.ProductVariantID.Int64)
		values = append(values, customerOrder.CustomerOrderID)
	}
	// Construct the query with placeholders
	query := fmt.Sprintf(bulkOrderInsertQueryString, strings.Join(placeholders, ", "))

	// Execute the query with prepared statement
	rows, err4 := s.Queries.db.QueryContext(ctx, query, values...)
	if err4 != nil {
		return createdOrderForUser, err4
	}
	defer func(rows *sql.Rows) {
		err2 := rows.Close()
		if err2 != nil {
			log.Printf("Could not close rows")
			return
		}
	}(rows)

	items := []OrderItem{}
	for rows.Next() {
		var i OrderItem
		if err3 := rows.Scan(
			&i.OrderItemID,
			&i.CreatedAt,
			&i.Quantity,
			&i.PricePerItem,
			&i.ProductVariantID,
			&i.CustomerOrderID,
		); err3 != nil {
			return createdOrderForUser, err3
		}
		items = append(items, i)
	}

	// Commit the transaction
	if err := tx.Commit(); err != nil {
		return createdOrderForUser, err
	}

	createdOrderForUser.CustomerId = customerOrder.UsrID
	createdOrderForUser.OrderItems = items

	return createdOrderForUser, nil
}
