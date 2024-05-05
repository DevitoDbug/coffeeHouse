-- name: CreateProductVariant :one
INSERT INTO product_variant (
                               price, pd_id , att_id
) VALUES (
             $1 , $2 , $3
         )
RETURNING *;

-- name: GetProductVariant :one
SELECT * FROM product_variant
WHERE product_variant_id = $1
AND deleted_at IS NULL;

-- name: ListProductsVariant :many
SELECT * FROM product_variant
WHERE deleted_at IS NULL
ORDER BY pd_id
LIMIT $1
OFFSET $2;

-- name: UpdateProductVariant :one
UPDATE product_variant
SET price = $1,
    pd_id = $2,
    att_id = $3,
    updated_at = now()
WHERE product_variant_id = $4 AND deleted_at IS NULL
RETURNING  *;

-- name: DeleteProductVariantTemporarily :one
UPDATE product_variant
SET deleted_at = now()
WHERE product_variant_id = $1 AND deleted_at IS NULL
RETURNING  *;

-- name: RestoreProductVariant :one
UPDATE product_variant
SET deleted_at = NULL
WHERE product_variant_id = $1 AND deleted_at IS NOT NULL
RETURNING  *;

-- name: DeleteProductVariant :exec
DELETE FROM product_variant
WHERE product_variant_id = $1;