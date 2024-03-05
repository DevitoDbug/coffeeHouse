// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.25.0
// source: rating.sql

package db

import (
	"context"
	"database/sql"
	"time"
)

const createRating = `-- name: CreateRating :one
INSERT INTO rating (
    rating_value, pd_id, usr_id
) VALUES (
             $1 , $2 , $3
         )
RETURNING rating_id, created_at, updated_at, deleted_at, rating_value, liked, comment, pd_id, usr_id
`

type CreateRatingParams struct {
	RatingValue sql.NullString `json:"rating_value"`
	PdID        sql.NullInt64  `json:"pd_id"`
	UsrID       sql.NullInt64  `json:"usr_id"`
}

func (q *Queries) CreateRating(ctx context.Context, arg CreateRatingParams) (Rating, error) {
	row := q.db.QueryRowContext(ctx, createRating, arg.RatingValue, arg.PdID, arg.UsrID)
	var i Rating
	err := row.Scan(
		&i.RatingID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.DeletedAt,
		&i.RatingValue,
		&i.Liked,
		&i.Comment,
		&i.PdID,
		&i.UsrID,
	)
	return i, err
}

const deleteRating = `-- name: DeleteRating :exec
DELETE FROM rating
WHERE rating_id = $1
`

func (q *Queries) DeleteRating(ctx context.Context, ratingID int64) error {
	_, err := q.db.ExecContext(ctx, deleteRating, ratingID)
	return err
}

const deleteRatingTemporarily = `-- name: DeleteRatingTemporarily :one
UPDATE rating
SET deleted_at = now()
WHERE rating_id = $1 AND deleted_at IS NULL
RETURNING  rating_id, created_at, updated_at, deleted_at, rating_value, liked, comment, pd_id, usr_id
`

func (q *Queries) DeleteRatingTemporarily(ctx context.Context, ratingID int64) (Rating, error) {
	row := q.db.QueryRowContext(ctx, deleteRatingTemporarily, ratingID)
	var i Rating
	err := row.Scan(
		&i.RatingID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.DeletedAt,
		&i.RatingValue,
		&i.Liked,
		&i.Comment,
		&i.PdID,
		&i.UsrID,
	)
	return i, err
}

const listLikedProductsForSpecificUser = `-- name: ListLikedProductsForSpecificUser :many
SELECT
    rating.rating_id,
    rating.comment,
    rating.rating_value,
    rating.updated_at,
    product.pd_name,
    product.short_description,
    image. img_name,
    image.img_url,
    image.alt_text,
    category.category_name,
    rating.usr_id
FROM rating
JOIN product ON rating.pd_id = product.pd_id
JOIN image ON product.img_id = image.img_id
JOIN category ON product.category_id = category.category_id
WHERE liked = true AND usr_id = $1 AND deleted_at IS NULL
ORDER BY rating.updated_at DESC
`

type ListLikedProductsForSpecificUserRow struct {
	RatingID         int64          `json:"rating_id"`
	Comment          sql.NullString `json:"comment"`
	RatingValue      sql.NullString `json:"rating_value"`
	UpdatedAt        time.Time      `json:"updated_at"`
	PdName           string         `json:"pd_name"`
	ShortDescription sql.NullString `json:"short_description"`
	ImgName          sql.NullString `json:"img_name"`
	ImgUrl           sql.NullString `json:"img_url"`
	AltText          sql.NullString `json:"alt_text"`
	CategoryName     string         `json:"category_name"`
	UsrID            sql.NullInt64  `json:"usr_id"`
}

func (q *Queries) ListLikedProductsForSpecificUser(ctx context.Context, usrID sql.NullInt64) ([]ListLikedProductsForSpecificUserRow, error) {
	rows, err := q.db.QueryContext(ctx, listLikedProductsForSpecificUser, usrID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []ListLikedProductsForSpecificUserRow
	for rows.Next() {
		var i ListLikedProductsForSpecificUserRow
		if err := rows.Scan(
			&i.RatingID,
			&i.Comment,
			&i.RatingValue,
			&i.UpdatedAt,
			&i.PdName,
			&i.ShortDescription,
			&i.ImgName,
			&i.ImgUrl,
			&i.AltText,
			&i.CategoryName,
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

const listRating = `-- name: ListRating :many
SELECT rating_id, created_at, updated_at, deleted_at, rating_value, liked, comment, pd_id, usr_id FROM rating
WHERE deleted_at IS NULL
ORDER BY pd_id
LIMIT $1
OFFSET $2
`

type ListRatingParams struct {
	Limit  int32 `json:"limit"`
	Offset int32 `json:"offset"`
}

func (q *Queries) ListRating(ctx context.Context, arg ListRatingParams) ([]Rating, error) {
	rows, err := q.db.QueryContext(ctx, listRating, arg.Limit, arg.Offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Rating
	for rows.Next() {
		var i Rating
		if err := rows.Scan(
			&i.RatingID,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.DeletedAt,
			&i.RatingValue,
			&i.Liked,
			&i.Comment,
			&i.PdID,
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

const listUserLikeStatus = `-- name: ListUserLikeStatus :many
SELECT rating_id, created_at, updated_at, deleted_at, rating_value, liked, comment, pd_id, usr_id FROM rating
WHERE liked = true AND deleted_at IS NULL
ORDER BY pd_id
LIMIT $1
OFFSET $2
`

type ListUserLikeStatusParams struct {
	Limit  int32 `json:"limit"`
	Offset int32 `json:"offset"`
}

func (q *Queries) ListUserLikeStatus(ctx context.Context, arg ListUserLikeStatusParams) ([]Rating, error) {
	rows, err := q.db.QueryContext(ctx, listUserLikeStatus, arg.Limit, arg.Offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Rating
	for rows.Next() {
		var i Rating
		if err := rows.Scan(
			&i.RatingID,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.DeletedAt,
			&i.RatingValue,
			&i.Liked,
			&i.Comment,
			&i.PdID,
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

const listUserNotLikedStatus = `-- name: ListUserNotLikedStatus :many
SELECT rating_id, created_at, updated_at, deleted_at, rating_value, liked, comment, pd_id, usr_id FROM rating
WHERE liked = false AND deleted_at IS NULL
ORDER BY pd_id
LIMIT $1
OFFSET $2
`

type ListUserNotLikedStatusParams struct {
	Limit  int32 `json:"limit"`
	Offset int32 `json:"offset"`
}

func (q *Queries) ListUserNotLikedStatus(ctx context.Context, arg ListUserNotLikedStatusParams) ([]Rating, error) {
	rows, err := q.db.QueryContext(ctx, listUserNotLikedStatus, arg.Limit, arg.Offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Rating
	for rows.Next() {
		var i Rating
		if err := rows.Scan(
			&i.RatingID,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.DeletedAt,
			&i.RatingValue,
			&i.Liked,
			&i.Comment,
			&i.PdID,
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

const numberOfProductRating = `-- name: NumberOfProductRating :one
SELECT COUNT(rating_value) as number_of_ratting
FROM rating
WHERE pd_id = $1
`

func (q *Queries) NumberOfProductRating(ctx context.Context, pdID sql.NullInt64) (int64, error) {
	row := q.db.QueryRowContext(ctx, numberOfProductRating, pdID)
	var number_of_ratting int64
	err := row.Scan(&number_of_ratting)
	return number_of_ratting, err
}

const productRating = `-- name: ProductRating :many
SELECT AVG(rating_value) as average_value
FROM rating
WHERE pd_id = $1 AND deleted_at IS NULL
`

func (q *Queries) ProductRating(ctx context.Context, pdID sql.NullInt64) ([]float64, error) {
	rows, err := q.db.QueryContext(ctx, productRating, pdID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []float64
	for rows.Next() {
		var average_value float64
		if err := rows.Scan(&average_value); err != nil {
			return nil, err
		}
		items = append(items, average_value)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const restoreRating = `-- name: RestoreRating :one
UPDATE rating
SET deleted_at = NULL
WHERE rating_id = $1 AND deleted_at IS NOT NULL
RETURNING  rating_id, created_at, updated_at, deleted_at, rating_value, liked, comment, pd_id, usr_id
`

func (q *Queries) RestoreRating(ctx context.Context, ratingID int64) (Rating, error) {
	row := q.db.QueryRowContext(ctx, restoreRating, ratingID)
	var i Rating
	err := row.Scan(
		&i.RatingID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.DeletedAt,
		&i.RatingValue,
		&i.Liked,
		&i.Comment,
		&i.PdID,
		&i.UsrID,
	)
	return i, err
}

const updateComment = `-- name: UpdateComment :one
UPDATE rating
SET liked = $1, updated_at = now()
WHERE usr_id = $2 AND pd_id= $3 AND deleted_at IS NULL
RETURNING  rating_id, created_at, updated_at, deleted_at, rating_value, liked, comment, pd_id, usr_id
`

type UpdateCommentParams struct {
	Liked sql.NullBool  `json:"liked"`
	UsrID sql.NullInt64 `json:"usr_id"`
	PdID  sql.NullInt64 `json:"pd_id"`
}

func (q *Queries) UpdateComment(ctx context.Context, arg UpdateCommentParams) (Rating, error) {
	row := q.db.QueryRowContext(ctx, updateComment, arg.Liked, arg.UsrID, arg.PdID)
	var i Rating
	err := row.Scan(
		&i.RatingID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.DeletedAt,
		&i.RatingValue,
		&i.Liked,
		&i.Comment,
		&i.PdID,
		&i.UsrID,
	)
	return i, err
}

const updateLiked = `-- name: UpdateLiked :one
UPDATE rating
SET liked = $1, updated_at = now()
WHERE usr_id = $2 AND pd_id= $3 AND deleted_at IS NULL
RETURNING  rating_id, created_at, updated_at, deleted_at, rating_value, liked, comment, pd_id, usr_id
`

type UpdateLikedParams struct {
	Liked sql.NullBool  `json:"liked"`
	UsrID sql.NullInt64 `json:"usr_id"`
	PdID  sql.NullInt64 `json:"pd_id"`
}

func (q *Queries) UpdateLiked(ctx context.Context, arg UpdateLikedParams) (Rating, error) {
	row := q.db.QueryRowContext(ctx, updateLiked, arg.Liked, arg.UsrID, arg.PdID)
	var i Rating
	err := row.Scan(
		&i.RatingID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.DeletedAt,
		&i.RatingValue,
		&i.Liked,
		&i.Comment,
		&i.PdID,
		&i.UsrID,
	)
	return i, err
}

const updateRatingValue = `-- name: UpdateRatingValue :one
UPDATE rating
SET rating_value = $1, updated_at = now()
WHERE usr_id = $2 AND pd_id= $3 AND deleted_at IS NULL
RETURNING  rating_id, created_at, updated_at, deleted_at, rating_value, liked, comment, pd_id, usr_id
`

type UpdateRatingValueParams struct {
	RatingValue sql.NullString `json:"rating_value"`
	UsrID       sql.NullInt64  `json:"usr_id"`
	PdID        sql.NullInt64  `json:"pd_id"`
}

func (q *Queries) UpdateRatingValue(ctx context.Context, arg UpdateRatingValueParams) (Rating, error) {
	row := q.db.QueryRowContext(ctx, updateRatingValue, arg.RatingValue, arg.UsrID, arg.PdID)
	var i Rating
	err := row.Scan(
		&i.RatingID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.DeletedAt,
		&i.RatingValue,
		&i.Liked,
		&i.Comment,
		&i.PdID,
		&i.UsrID,
	)
	return i, err
}
