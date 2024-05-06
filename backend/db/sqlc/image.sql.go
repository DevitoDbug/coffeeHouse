// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: image.sql

package db

import (
	"context"
	"database/sql"
)

const createImage = `-- name: CreateImage :one
INSERT INTO image (
    img_name, alt_text , img_url
) VALUES (
             $1 , $2 , $3
         )
RETURNING img_id, created_at, updated_at, deleted_at, img_name, img_url, alt_text
`

type CreateImageParams struct {
	ImgName sql.NullString `json:"img_name"`
	AltText sql.NullString `json:"alt_text"`
	ImgUrl  sql.NullString `json:"img_url"`
}

func (q *Queries) CreateImage(ctx context.Context, arg CreateImageParams) (Image, error) {
	row := q.db.QueryRowContext(ctx, createImage, arg.ImgName, arg.AltText, arg.ImgUrl)
	var i Image
	err := row.Scan(
		&i.ImgID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.DeletedAt,
		&i.ImgName,
		&i.ImgUrl,
		&i.AltText,
	)
	return i, err
}

const deleteImage = `-- name: DeleteImage :exec
DELETE FROM image
WHERE img_id = $1
`

func (q *Queries) DeleteImage(ctx context.Context, imgID int64) error {
	_, err := q.db.ExecContext(ctx, deleteImage, imgID)
	return err
}

const deleteImageTemporarily = `-- name: DeleteImageTemporarily :one
UPDATE image
SET deleted_at = now()
WHERE img_id = $1 AND deleted_at IS NULL
RETURNING  img_id, created_at, updated_at, deleted_at, img_name, img_url, alt_text
`

func (q *Queries) DeleteImageTemporarily(ctx context.Context, imgID int64) (Image, error) {
	row := q.db.QueryRowContext(ctx, deleteImageTemporarily, imgID)
	var i Image
	err := row.Scan(
		&i.ImgID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.DeletedAt,
		&i.ImgName,
		&i.ImgUrl,
		&i.AltText,
	)
	return i, err
}

const getImage = `-- name: GetImage :one
SELECT img_id, created_at, updated_at, deleted_at, img_name, img_url, alt_text FROM image
WHERE img_id = $1 AND deleted_at IS NULL
`

func (q *Queries) GetImage(ctx context.Context, imgID int64) (Image, error) {
	row := q.db.QueryRowContext(ctx, getImage, imgID)
	var i Image
	err := row.Scan(
		&i.ImgID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.DeletedAt,
		&i.ImgName,
		&i.ImgUrl,
		&i.AltText,
	)
	return i, err
}

const listImage = `-- name: ListImage :many
SELECT img_id, created_at, updated_at, deleted_at, img_name, img_url, alt_text FROM image
WHERE deleted_at IS NULL
ORDER BY img_name
LIMIT $1
OFFSET $2
`

type ListImageParams struct {
	Limit  int32 `json:"limit"`
	Offset int32 `json:"offset"`
}

func (q *Queries) ListImage(ctx context.Context, arg ListImageParams) ([]Image, error) {
	rows, err := q.db.QueryContext(ctx, listImage, arg.Limit, arg.Offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Image
	for rows.Next() {
		var i Image
		if err := rows.Scan(
			&i.ImgID,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.DeletedAt,
			&i.ImgName,
			&i.ImgUrl,
			&i.AltText,
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

const restoreImage = `-- name: RestoreImage :one
UPDATE image
SET deleted_at = NULL
WHERE img_id = $1 AND deleted_at IS NOT NULL
RETURNING  img_id, created_at, updated_at, deleted_at, img_name, img_url, alt_text
`

func (q *Queries) RestoreImage(ctx context.Context, imgID int64) (Image, error) {
	row := q.db.QueryRowContext(ctx, restoreImage, imgID)
	var i Image
	err := row.Scan(
		&i.ImgID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.DeletedAt,
		&i.ImgName,
		&i.ImgUrl,
		&i.AltText,
	)
	return i, err
}

const updateImage = `-- name: UpdateImage :one
UPDATE image
SET img_name = $1, img_url = $2 ,updated_at = now()
WHERE img_id = $3 AND deleted_at IS NULL
RETURNING  img_id, created_at, updated_at, deleted_at, img_name, img_url, alt_text
`

type UpdateImageParams struct {
	ImgName sql.NullString `json:"img_name"`
	ImgUrl  sql.NullString `json:"img_url"`
	ImgID   int64          `json:"img_id"`
}

func (q *Queries) UpdateImage(ctx context.Context, arg UpdateImageParams) (Image, error) {
	row := q.db.QueryRowContext(ctx, updateImage, arg.ImgName, arg.ImgUrl, arg.ImgID)
	var i Image
	err := row.Scan(
		&i.ImgID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.DeletedAt,
		&i.ImgName,
		&i.ImgUrl,
		&i.AltText,
	)
	return i, err
}