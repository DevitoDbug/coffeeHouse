-- name: CreateRating :one
INSERT INTO "rating" (
    rating_value, pd_id, usr_id
) VALUES (
             $1 , $2 , $3
         )
RETURNING *;

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
SET rating_value = $3, updated_at = now()
WHERE usr_id = $1 AND pd_id= $2 AND deleted_at IS NULL
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