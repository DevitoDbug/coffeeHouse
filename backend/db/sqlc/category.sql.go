// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: category.sql

package db

import (
	"context"
)

const createCategory = `-- name: CreateCategory :one
INSERT INTO category (
    category_name
) VALUES (
             $1
         )
RETURNING category_id, created_at, updated_at, deleted_at, category_name
`

func (q *Queries) CreateCategory(ctx context.Context, categoryName string) (Category, error) {
	row := q.db.QueryRowContext(ctx, createCategory, categoryName)
	var i Category
	err := row.Scan(
		&i.CategoryID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.DeletedAt,
		&i.CategoryName,
	)
	return i, err
}

const deleteCategory = `-- name: DeleteCategory :exec
DELETE FROM category
WHERE category_id = $1
`

func (q *Queries) DeleteCategory(ctx context.Context, categoryID int64) error {
	_, err := q.db.ExecContext(ctx, deleteCategory, categoryID)
	return err
}

const deleteCategoryTemporarily = `-- name: DeleteCategoryTemporarily :one
UPDATE category
SET deleted_at = now()
WHERE category_id = $1
RETURNING  category_id, created_at, updated_at, deleted_at, category_name
`

func (q *Queries) DeleteCategoryTemporarily(ctx context.Context, categoryID int64) (Category, error) {
	row := q.db.QueryRowContext(ctx, deleteCategoryTemporarily, categoryID)
	var i Category
	err := row.Scan(
		&i.CategoryID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.DeletedAt,
		&i.CategoryName,
	)
	return i, err
}

const getCategory = `-- name: GetCategory :one
SELECT category_id, created_at, updated_at, deleted_at, category_name FROM category
WHERE category_id = $1 AND deleted_at IS NULL
ORDER BY category_id
`

func (q *Queries) GetCategory(ctx context.Context, categoryID int64) (Category, error) {
	row := q.db.QueryRowContext(ctx, getCategory, categoryID)
	var i Category
	err := row.Scan(
		&i.CategoryID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.DeletedAt,
		&i.CategoryName,
	)
	return i, err
}

const listCategory = `-- name: ListCategory :many
SELECT category_id, created_at, updated_at, deleted_at, category_name FROM category
WHERE deleted_at IS NULL
ORDER BY category_id
LIMIT $1
OFFSET $2
`

type ListCategoryParams struct {
	Limit  int32 `json:"limit"`
	Offset int32 `json:"offset"`
}

func (q *Queries) ListCategory(ctx context.Context, arg ListCategoryParams) ([]Category, error) {
	rows, err := q.db.QueryContext(ctx, listCategory, arg.Limit, arg.Offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Category
	for rows.Next() {
		var i Category
		if err := rows.Scan(
			&i.CategoryID,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.DeletedAt,
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

const restoreCategory = `-- name: RestoreCategory :one
UPDATE category
SET deleted_at = NULL
WHERE category_id = $1 AND deleted_at IS NOT NULL
RETURNING  category_id, created_at, updated_at, deleted_at, category_name
`

func (q *Queries) RestoreCategory(ctx context.Context, categoryID int64) (Category, error) {
	row := q.db.QueryRowContext(ctx, restoreCategory, categoryID)
	var i Category
	err := row.Scan(
		&i.CategoryID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.DeletedAt,
		&i.CategoryName,
	)
	return i, err
}

const updateCategory = `-- name: UpdateCategory :one
UPDATE category
SET category_name = $1, updated_at = now()
WHERE category_id = $2 AND deleted_at IS NULL
RETURNING  category_id, created_at, updated_at, deleted_at, category_name
`

type UpdateCategoryParams struct {
	CategoryName string `json:"category_name"`
	CategoryID   int64  `json:"category_id"`
}

func (q *Queries) UpdateCategory(ctx context.Context, arg UpdateCategoryParams) (Category, error) {
	row := q.db.QueryRowContext(ctx, updateCategory, arg.CategoryName, arg.CategoryID)
	var i Category
	err := row.Scan(
		&i.CategoryID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.DeletedAt,
		&i.CategoryName,
	)
	return i, err
}