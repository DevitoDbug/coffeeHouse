-- name: CreateRating :one
INSERT INTO "rating" (
    rating_value, pd_id, usr_id
) VALUES (
             $1 , $2 , $3
         )
RETURNING *;

-- name: ListLikedProductsForSpecificUser :many
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
FROM "rating"
JOIN product ON rating.pd_id = product.pd_id
JOIN image ON product.img_id = image.img_id
JOIN category ON product.category_id = category.category_id
WHERE liked = true AND usr_id = $1 AND deleted_at IS NULL
ORDER BY rating.updated_at DESC;

-- name: ListUserLikeStatus :many
SELECT * FROM "rating"
WHERE liked = true AND deleted_at IS NULL
ORDER BY pd_id
LIMIT $1
OFFSET $2;

-- name: ListUserNotLikedStatus :many
SELECT * FROM "rating"
WHERE liked = false AND deleted_at IS NULL
ORDER BY pd_id
LIMIT $1
OFFSET $2;

-- name: ListRating :many
SELECT * FROM "rating"
WHERE deleted_at IS NULL
ORDER BY pd_id
LIMIT $1
OFFSET $2;

-- name: ProductRating :many
SELECT AVG(rating_value) as average_value
FROM rating
WHERE pd_id = $1 AND deleted_at IS NULL;

-- name: NumberOfProductRating :one
SELECT COUNT(rating_value) as number_of_ratting
FROM rating
WHERE pd_id = $1;

-- name: UpdateRatingValue :one
UPDATE "rating"
SET rating_value = $1, updated_at = now()
WHERE usr_id = $2 AND pd_id= $3 AND deleted_at IS NULL
RETURNING  *;

-- name: UpdateLiked :one
UPDATE "rating"
SET liked = $1, updated_at = now()
WHERE usr_id = $2 AND pd_id= $3 AND deleted_at IS NULL
RETURNING  *;

-- name: UpdateComment :one
UPDATE "rating"
SET liked = $1, updated_at = now()
WHERE usr_id = $2 AND pd_id= $3 AND deleted_at IS NULL
RETURNING  *;

-- name: DeleteRatingTemporarily :one
UPDATE "rating"
SET deleted_at = now()
WHERE rating_id = $1 AND deleted_at IS NULL
RETURNING  *;

-- name: RestoreRating :one
UPDATE "rating"
SET deleted_at = NULL
WHERE rating_id = $1 AND deleted_at IS NOT NULL
RETURNING  *;

-- name: DeleteRating :one
DELETE FROM "rating" WHERE rating_id = $1 RETURNING *;