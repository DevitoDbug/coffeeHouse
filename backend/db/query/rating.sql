-- name: CreateRating :one
INSERT INTO rating (
    liked,rating_value, pd_id, usr_id
) VALUES (
             $1 , $2 , $3 , $4
         )
RETURNING *;

-- name: GetRatingForSpecificProductForSpecificUser :one
SELECT * FROM rating
where usr_id = $1 AND pd_id = $2;

-- name: ListLikedProductsForSpecificUser :many
SELECT
    rating.rating_id,
    rating.comment,
    rating.rating_value,
    rating.updated_at,
    rating.liked,
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
WHERE rating.liked = true AND rating.usr_id = $1 AND rating.deleted_at IS NULL
ORDER BY rating.updated_at DESC
LIMIT $2
OFFSET $3;

-- name: ListUserLikeStatus :many
SELECT * FROM rating
WHERE liked = true AND deleted_at IS NULL
ORDER BY pd_id
LIMIT $1
OFFSET $2;

-- name: AverageProductRatingForSpecificProduct :one
SELECT AVG(rating_value) as average_value
FROM rating
WHERE pd_id = $1 AND deleted_at IS NULL;

-- name: NumberOfProductRating :one
SELECT COUNT(rating_value) as number_of_ratting
FROM rating
WHERE pd_id = $1;

-- name: UpdateRating :one
UPDATE rating
SET rating_value = $1,
    liked = $2,
    comment = $3,
    updated_at = now()
WHERE usr_id = $4 AND pd_id= $5 AND deleted_at IS NULL
RETURNING  *;
