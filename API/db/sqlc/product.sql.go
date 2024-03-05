// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.25.0
// source: product.sql

package db

import (
	"context"
	"database/sql"
)

const createProduct = `-- name: CreateProduct :one
INSERT INTO product (
    pd_name, short_description, long_description, img_id , category_id
) VALUES (
             $1 , $2 , $3 , $4 ,$5
         )
RETURNING pd_id, created_at, updated_at, deleted_at, pd_name, short_description, long_description, img_id, category_id
`

type CreateProductParams struct {
	PdName           string         `json:"pd_name"`
	ShortDescription sql.NullString `json:"short_description"`
	LongDescription  sql.NullString `json:"long_description"`
	ImgID            sql.NullInt64  `json:"img_id"`
	CategoryID       sql.NullInt64  `json:"category_id"`
}

func (q *Queries) CreateProduct(ctx context.Context, arg CreateProductParams) (Product, error) {
	row := q.db.QueryRowContext(ctx, createProduct,
		arg.PdName,
		arg.ShortDescription,
		arg.LongDescription,
		arg.ImgID,
		arg.CategoryID,
	)
	var i Product
	err := row.Scan(
		&i.PdID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.DeletedAt,
		&i.PdName,
		&i.ShortDescription,
		&i.LongDescription,
		&i.ImgID,
		&i.CategoryID,
	)
	return i, err
}

const deleteProduct = `-- name: DeleteProduct :exec
DELETE FROM product
WHERE pd_id = $1
`

func (q *Queries) DeleteProduct(ctx context.Context, pdID int64) error {
	_, err := q.db.ExecContext(ctx, deleteProduct, pdID)
	return err
}

const deleteProductTemporarily = `-- name: DeleteProductTemporarily :one
UPDATE product
SET deleted_at = now()
WHERE pd_id = $1 AND deleted_at IS NULL
RETURNING  pd_id, created_at, updated_at, deleted_at, pd_name, short_description, long_description, img_id, category_id
`

func (q *Queries) DeleteProductTemporarily(ctx context.Context, pdID int64) (Product, error) {
	row := q.db.QueryRowContext(ctx, deleteProductTemporarily, pdID)
	var i Product
	err := row.Scan(
		&i.PdID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.DeletedAt,
		&i.PdName,
		&i.ShortDescription,
		&i.LongDescription,
		&i.ImgID,
		&i.CategoryID,
	)
	return i, err
}

const getProduct = `-- name: GetProduct :one
SELECT pd_id, created_at, updated_at, deleted_at, pd_name, short_description, long_description, img_id, category_id FROM product
WHERE pd_id = $1
`

func (q *Queries) GetProduct(ctx context.Context, pdID int64) (Product, error) {
	row := q.db.QueryRowContext(ctx, getProduct, pdID)
	var i Product
	err := row.Scan(
		&i.PdID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.DeletedAt,
		&i.PdName,
		&i.ShortDescription,
		&i.LongDescription,
		&i.ImgID,
		&i.CategoryID,
	)
	return i, err
}

const listProductForSpecificCategory = `-- name: ListProductForSpecificCategory :many
SELECT
    product.pd_id,
    product.pd_name,
    product.short_description,
    product.long_description,
    image.img_url,
    image.img_name,
    image.alt_text,
    category.category_name
FROM product
JOIN category ON product.category_id = category.category_id
JOIN image on product.img_id = image.img_id
WHERE product.category_id =$1
ORDER BY product.pd_name
`

type ListProductForSpecificCategoryRow struct {
	PdID             int64          `json:"pd_id"`
	PdName           string         `json:"pd_name"`
	ShortDescription sql.NullString `json:"short_description"`
	LongDescription  sql.NullString `json:"long_description"`
	ImgUrl           sql.NullString `json:"img_url"`
	ImgName          sql.NullString `json:"img_name"`
	AltText          sql.NullString `json:"alt_text"`
	CategoryName     string         `json:"category_name"`
}

func (q *Queries) ListProductForSpecificCategory(ctx context.Context, categoryID sql.NullInt64) ([]ListProductForSpecificCategoryRow, error) {
	rows, err := q.db.QueryContext(ctx, listProductForSpecificCategory, categoryID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []ListProductForSpecificCategoryRow
	for rows.Next() {
		var i ListProductForSpecificCategoryRow
		if err := rows.Scan(
			&i.PdID,
			&i.PdName,
			&i.ShortDescription,
			&i.LongDescription,
			&i.ImgUrl,
			&i.ImgName,
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

const listProducts = `-- name: ListProducts :many
SELECT pd_id, created_at, updated_at, deleted_at, pd_name, short_description, long_description, img_id, category_id FROM product
WHERE deleted_at IS NULL
ORDER BY category_id, pd_id
LIMIT $1
OFFSET $2
`

type ListProductsParams struct {
	Limit  int32 `json:"limit"`
	Offset int32 `json:"offset"`
}

func (q *Queries) ListProducts(ctx context.Context, arg ListProductsParams) ([]Product, error) {
	rows, err := q.db.QueryContext(ctx, listProducts, arg.Limit, arg.Offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Product
	for rows.Next() {
		var i Product
		if err := rows.Scan(
			&i.PdID,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.DeletedAt,
			&i.PdName,
			&i.ShortDescription,
			&i.LongDescription,
			&i.ImgID,
			&i.CategoryID,
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

const restoreProduct = `-- name: RestoreProduct :one
UPDATE product
SET deleted_at = NULL
WHERE pd_id = $1 AND deleted_at IS NOT NULL
RETURNING  pd_id, created_at, updated_at, deleted_at, pd_name, short_description, long_description, img_id, category_id
`

func (q *Queries) RestoreProduct(ctx context.Context, pdID int64) (Product, error) {
	row := q.db.QueryRowContext(ctx, restoreProduct, pdID)
	var i Product
	err := row.Scan(
		&i.PdID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.DeletedAt,
		&i.PdName,
		&i.ShortDescription,
		&i.LongDescription,
		&i.ImgID,
		&i.CategoryID,
	)
	return i, err
}

const updateProductCategoryId = `-- name: UpdateProductCategoryId :one
UPDATE product
SET category_id = $1, updated_at = now()
WHERE pd_id = $2 AND deleted_at IS NULL
RETURNING  pd_id, created_at, updated_at, deleted_at, pd_name, short_description, long_description, img_id, category_id
`

type UpdateProductCategoryIdParams struct {
	CategoryID sql.NullInt64 `json:"category_id"`
	PdID       int64         `json:"pd_id"`
}

func (q *Queries) UpdateProductCategoryId(ctx context.Context, arg UpdateProductCategoryIdParams) (Product, error) {
	row := q.db.QueryRowContext(ctx, updateProductCategoryId, arg.CategoryID, arg.PdID)
	var i Product
	err := row.Scan(
		&i.PdID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.DeletedAt,
		&i.PdName,
		&i.ShortDescription,
		&i.LongDescription,
		&i.ImgID,
		&i.CategoryID,
	)
	return i, err
}

const updateProductImgId = `-- name: UpdateProductImgId :one
UPDATE product
SET img_id = $1, updated_at = now()
WHERE pd_id = $2 AND deleted_at IS NULL
RETURNING  pd_id, created_at, updated_at, deleted_at, pd_name, short_description, long_description, img_id, category_id
`

type UpdateProductImgIdParams struct {
	ImgID sql.NullInt64 `json:"img_id"`
	PdID  int64         `json:"pd_id"`
}

func (q *Queries) UpdateProductImgId(ctx context.Context, arg UpdateProductImgIdParams) (Product, error) {
	row := q.db.QueryRowContext(ctx, updateProductImgId, arg.ImgID, arg.PdID)
	var i Product
	err := row.Scan(
		&i.PdID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.DeletedAt,
		&i.PdName,
		&i.ShortDescription,
		&i.LongDescription,
		&i.ImgID,
		&i.CategoryID,
	)
	return i, err
}

const updateProductLongDescription = `-- name: UpdateProductLongDescription :one
UPDATE product
SET long_description = $1, updated_at = now()
WHERE pd_id = $2 AND deleted_at IS NULL
RETURNING  pd_id, created_at, updated_at, deleted_at, pd_name, short_description, long_description, img_id, category_id
`

type UpdateProductLongDescriptionParams struct {
	LongDescription sql.NullString `json:"long_description"`
	PdID            int64          `json:"pd_id"`
}

func (q *Queries) UpdateProductLongDescription(ctx context.Context, arg UpdateProductLongDescriptionParams) (Product, error) {
	row := q.db.QueryRowContext(ctx, updateProductLongDescription, arg.LongDescription, arg.PdID)
	var i Product
	err := row.Scan(
		&i.PdID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.DeletedAt,
		&i.PdName,
		&i.ShortDescription,
		&i.LongDescription,
		&i.ImgID,
		&i.CategoryID,
	)
	return i, err
}

const updateProductName = `-- name: UpdateProductName :one
UPDATE product
SET pd_name = $1, updated_at = now()
WHERE pd_id = $2 AND deleted_at IS NULL
RETURNING  pd_id, created_at, updated_at, deleted_at, pd_name, short_description, long_description, img_id, category_id
`

type UpdateProductNameParams struct {
	PdName string `json:"pd_name"`
	PdID   int64  `json:"pd_id"`
}

func (q *Queries) UpdateProductName(ctx context.Context, arg UpdateProductNameParams) (Product, error) {
	row := q.db.QueryRowContext(ctx, updateProductName, arg.PdName, arg.PdID)
	var i Product
	err := row.Scan(
		&i.PdID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.DeletedAt,
		&i.PdName,
		&i.ShortDescription,
		&i.LongDescription,
		&i.ImgID,
		&i.CategoryID,
	)
	return i, err
}

const updateProductShortDescription = `-- name: UpdateProductShortDescription :one
UPDATE product
SET short_description = $1, updated_at = now()
WHERE pd_id = $2 AND deleted_at IS NULL
RETURNING  pd_id, created_at, updated_at, deleted_at, pd_name, short_description, long_description, img_id, category_id
`

type UpdateProductShortDescriptionParams struct {
	ShortDescription sql.NullString `json:"short_description"`
	PdID             int64          `json:"pd_id"`
}

func (q *Queries) UpdateProductShortDescription(ctx context.Context, arg UpdateProductShortDescriptionParams) (Product, error) {
	row := q.db.QueryRowContext(ctx, updateProductShortDescription, arg.ShortDescription, arg.PdID)
	var i Product
	err := row.Scan(
		&i.PdID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.DeletedAt,
		&i.PdName,
		&i.ShortDescription,
		&i.LongDescription,
		&i.ImgID,
		&i.CategoryID,
	)
	return i, err
}
