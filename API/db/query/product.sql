-- name: CreateProduct :one
INSERT INTO product (
    pd_name, short_description, long_description, img_id , category_id
) VALUES (
             $1 , $2 , $3 , $4 ,$5
         )
RETURNING *;

-- name: ListProducts :many
SELECT * FROM product
WHERE pd_id = $1;

-- name: ListProducts :many
SELECT * FROM product
WHERE deleted_at IS NULL
ORDER BY pd_id
LIMIT $1
OFFSET $2;

-- name: UpdateProductName :one
UPDATE product
SET pd_name = $2, updated_at = now()
WHERE pd_id = $1 AND deleted_at IS NULL
RETURNING  *;

-- name: UpdateProductShortDescription :one
UPDATE product
SET short_description = $2, updated_at = now()
WHERE pd_id = $1 AND deleted_at IS NULL
RETURNING  *;

-- name: UpdateProductLongDescription :one
UPDATE product
SET long_description = $2, updated_at = now()
WHERE pd_id = $1 AND deleted_at IS NULL
RETURNING  *;

-- name: UpdateProductImgId :one
UPDATE product
SET img_id = $2, updated_at = now()
WHERE pd_id = $1 AND deleted_at IS NULL
RETURNING  *;

-- name: UpdateProductCategoryId :one
UPDATE product
SET category_id = $2, updated_at = now()
WHERE pd_id = $1 AND deleted_at IS NULL
RETURNING  *;

-- name: DeleteProductTemporarily :one
UPDATE product
SET deleted_at = now()
WHERE pd_id = $1 AND deleted_at IS NULL
RETURNING  *;

-- name: RestoreProduct :one
UPDATE product
SET deleted_at = NULL
WHERE pd_id = $1 AND deleted_at IS NOT NULL
RETURNING  *;

-- name: DeleteProduct :one
DELETE FROM product WHERE pd_id = $1 RETURNING *;