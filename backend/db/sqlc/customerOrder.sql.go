// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: customerOrder.sql

package db

import (
	"context"
	"database/sql"
)

const createCustomerOrder = `-- name: CreateCustomerOrder :one
INSERT INTO customer_order (
    usr_id
) VALUES (
             $1
         )
RETURNING customer_order_id, created_at, usr_id
`

func (q *Queries) CreateCustomerOrder(ctx context.Context, usrID sql.NullInt64) (CustomerOrder, error) {
	row := q.db.QueryRowContext(ctx, createCustomerOrder, usrID)
	var i CustomerOrder
	err := row.Scan(&i.CustomerOrderID, &i.CreatedAt, &i.UsrID)
	return i, err
}

const deleteCustomerOrder = `-- name: DeleteCustomerOrder :exec
DELETE FROM customer_order
WHERE customer_order_id = $1
`

func (q *Queries) DeleteCustomerOrder(ctx context.Context, customerOrderID int64) error {
	_, err := q.db.ExecContext(ctx, deleteCustomerOrder, customerOrderID)
	return err
}

const getSpecificCustomerOrder = `-- name: GetSpecificCustomerOrder :one
SELECT customer_order_id, created_at, usr_id FROM customer_order
WHERE customer_order_id = $1
ORDER BY created_at
`

func (q *Queries) GetSpecificCustomerOrder(ctx context.Context, customerOrderID int64) (CustomerOrder, error) {
	row := q.db.QueryRowContext(ctx, getSpecificCustomerOrder, customerOrderID)
	var i CustomerOrder
	err := row.Scan(&i.CustomerOrderID, &i.CreatedAt, &i.UsrID)
	return i, err
}

const listAllCustomerOrders = `-- name: ListAllCustomerOrders :many
SELECT customer_order_id, created_at, usr_id FROM customer_order
ORDER BY usr_id, created_at
LIMIT $1
OFFSET $2
`

type ListAllCustomerOrdersParams struct {
	Limit  int32 `json:"limit"`
	Offset int32 `json:"offset"`
}

func (q *Queries) ListAllCustomerOrders(ctx context.Context, arg ListAllCustomerOrdersParams) ([]CustomerOrder, error) {
	rows, err := q.db.QueryContext(ctx, listAllCustomerOrders, arg.Limit, arg.Offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []CustomerOrder{}
	for rows.Next() {
		var i CustomerOrder
		if err := rows.Scan(&i.CustomerOrderID, &i.CreatedAt, &i.UsrID); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const listCustomerOrdersForSpecificUser = `-- name: ListCustomerOrdersForSpecificUser :many
SELECT
    customer_order.usr_id,
    order_item.order_item_id,
    order_item.quantity,
    order_item.price_per_item,
    product.pd_name,
    image.img_name,
    image.img_url,
    image.alt_text,
    category.category_name,
    attribute.att_value,
    attribute.abbreviations
FROM customer_order
JOIN order_item ON customer_order.customer_order_id = order_item.customer_order_id
JOIN product_variant ON order_item.product_variant_id = product_variant.product_variant_id
JOIN product ON product_variant.pd_id = product.pd_id
JOIN image ON product.img_id = image.img_id
JOIN category ON product.category_id = category.category_id
JOIN attribute ON product_variant.att_id = attribute.att_id
WHERE customer_order.usr_id = $1
ORDER BY customer_order.created_at DESC, attribute.abbreviations
LIMIT $2
OFFSET $3
`

type ListCustomerOrdersForSpecificUserParams struct {
	UsrID  sql.NullInt64 `json:"usr_id"`
	Limit  int32         `json:"limit"`
	Offset int32         `json:"offset"`
}

type ListCustomerOrdersForSpecificUserRow struct {
	UsrID         sql.NullInt64  `json:"usr_id"`
	OrderItemID   int64          `json:"order_item_id"`
	Quantity      sql.NullInt32  `json:"quantity"`
	PricePerItem  string         `json:"price_per_item"`
	PdName        string         `json:"pd_name"`
	ImgName       sql.NullString `json:"img_name"`
	ImgUrl        sql.NullString `json:"img_url"`
	AltText       sql.NullString `json:"alt_text"`
	CategoryName  string         `json:"category_name"`
	AttValue      sql.NullString `json:"att_value"`
	Abbreviations sql.NullString `json:"abbreviations"`
}

func (q *Queries) ListCustomerOrdersForSpecificUser(ctx context.Context, arg ListCustomerOrdersForSpecificUserParams) ([]ListCustomerOrdersForSpecificUserRow, error) {
	rows, err := q.db.QueryContext(ctx, listCustomerOrdersForSpecificUser, arg.UsrID, arg.Limit, arg.Offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []ListCustomerOrdersForSpecificUserRow{}
	for rows.Next() {
		var i ListCustomerOrdersForSpecificUserRow
		if err := rows.Scan(
			&i.UsrID,
			&i.OrderItemID,
			&i.Quantity,
			&i.PricePerItem,
			&i.PdName,
			&i.ImgName,
			&i.ImgUrl,
			&i.AltText,
			&i.CategoryName,
			&i.AttValue,
			&i.Abbreviations,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}
