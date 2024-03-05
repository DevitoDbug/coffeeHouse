// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.25.0
// source: cart.sql

package db

import (
	"context"
	"database/sql"
)

const createCart = `-- name: CreateCart :one
INSERT INTO cart (
                    usr_id
) VALUES (
             $1
         )
RETURNING cart_id, created_at, updated_at, usr_id
`

func (q *Queries) CreateCart(ctx context.Context, usrID sql.NullInt64) (Cart, error) {
	row := q.db.QueryRowContext(ctx, createCart, usrID)
	var i Cart
	err := row.Scan(
		&i.CartID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.UsrID,
	)
	return i, err
}

const deleteCart = `-- name: DeleteCart :exec
DELETE FROM cart
WHERE cart_id = $1
`

func (q *Queries) DeleteCart(ctx context.Context, cartID int64) error {
	_, err := q.db.ExecContext(ctx, deleteCart, cartID)
	return err
}

const getCarts = `-- name: GetCarts :one
SELECT cart_id, created_at, updated_at, usr_id FROM cart
WHERE cart_id = $1
`

func (q *Queries) GetCarts(ctx context.Context, cartID int64) (Cart, error) {
	row := q.db.QueryRowContext(ctx, getCarts, cartID)
	var i Cart
	err := row.Scan(
		&i.CartID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.UsrID,
	)
	return i, err
}

const listCartItemsForSpecificUserCart = `-- name: ListCartItemsForSpecificUserCart :many
SELECT
    cart.cart_id,
    cart_item.quantity,
    product_variant.price,
    attribute.att_value,
    attribute.abbreviations,
    product.pd_name,
    product.short_description,
    image.img_name,
    image.img_url,
    image.alt_text,
    category.category_name
FROM cart
JOIN cart_item ON cart.cart_id = cart_item.cart_id
JOIN product_variant ON cart_item.product_variant_id = product_variant.product_variant_id
JOIN product ON product_variant.pd_id = product.pd_id
JOIN attribute ON product_variant.att_id = attribute.att_id
JOIN image ON product.img_id = image.img_id
JOIN category ON product.category_id = category.category_id
WHERE cart.usr_id = $1
    AND product_variant.deleted_at IS NULL
    AND attribute.deleted_at IS NULL
    AND product.deleted_at IS NULL
    AND image.deleted_at IS NULL
    AND category.deleted_at IS NULL
ORDER BY  product.pd_id, att_value
`

type ListCartItemsForSpecificUserCartRow struct {
	CartID           int64          `json:"cart_id"`
	Quantity         sql.NullInt32  `json:"quantity"`
	Price            string         `json:"price"`
	AttValue         sql.NullString `json:"att_value"`
	Abbreviations    sql.NullString `json:"abbreviations"`
	PdName           string         `json:"pd_name"`
	ShortDescription sql.NullString `json:"short_description"`
	ImgName          sql.NullString `json:"img_name"`
	ImgUrl           sql.NullString `json:"img_url"`
	AltText          sql.NullString `json:"alt_text"`
	CategoryName     string         `json:"category_name"`
}

func (q *Queries) ListCartItemsForSpecificUserCart(ctx context.Context, usrID sql.NullInt64) ([]ListCartItemsForSpecificUserCartRow, error) {
	rows, err := q.db.QueryContext(ctx, listCartItemsForSpecificUserCart, usrID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []ListCartItemsForSpecificUserCartRow
	for rows.Next() {
		var i ListCartItemsForSpecificUserCartRow
		if err := rows.Scan(
			&i.CartID,
			&i.Quantity,
			&i.Price,
			&i.AttValue,
			&i.Abbreviations,
			&i.PdName,
			&i.ShortDescription,
			&i.ImgName,
			&i.ImgUrl,
			&i.AltText,
			&i.CategoryName,
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

const listCarts = `-- name: ListCarts :many
SELECT cart_id, created_at, updated_at, usr_id FROM cart
ORDER BY usr_id
LIMIT $1
OFFSET $2
`

type ListCartsParams struct {
	Limit  int32 `json:"limit"`
	Offset int32 `json:"offset"`
}

func (q *Queries) ListCarts(ctx context.Context, arg ListCartsParams) ([]Cart, error) {
	rows, err := q.db.QueryContext(ctx, listCarts, arg.Limit, arg.Offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Cart
	for rows.Next() {
		var i Cart
		if err := rows.Scan(
			&i.CartID,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.UsrID,
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
