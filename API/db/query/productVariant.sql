-- name: CreateProductVariant :one
INSERT INTO "product_variant" (
                               price, pd_id , att_id
) VALUES (
             $1 , $2 , $3
         )
RETURNING *;

-- name: GetProductVariant :one
SELECT * FROM "product_variant"
WHERE product_variant_id = $1;

-- name: ListProductsVariant :many
SELECT * FROM "product_variant"
WHERE deleted_at IS NULL
ORDER BY pd_id
LIMIT $1
OFFSET $2;

-- name: UpdateProductVariantPrice :one
UPDATE "product_variant"
SET price = $2, updated_at = now()
WHERE product_variant_id = $1 AND deleted_at IS NULL
RETURNING  *;

-- name: UpdateProductVariantPdId :one
UPDATE "product_variant"
SET pd_id = $2, updated_at = now()
WHERE product_variant_id = $1 AND deleted_at IS NULL
RETURNING  *;

-- name: UpdateProductVariantAttId :one
UPDATE "product_variant"
SET att_id = $2, updated_at = now()
WHERE product_variant_id = $1 AND deleted_at IS NULL
RETURNING  *;

-- name: DeleteProductVariantTemporarily :one
UPDATE "product_variant"
SET deleted_at = now()
WHERE product_variant_id = $1 AND deleted_at IS NULL
RETURNING  *;

-- name: RestoreProductVariant :one
UPDATE "product_variant"
SET deleted_at = NULL
WHERE product_variant_id = $1 AND deleted_at IS NOT NULL
RETURNING  *;

-- name: DeleteProductVariant :one
DELETE FROM "product_variant" WHERE product_variant_id = $1 RETURNING *;