-- name: CreateCategory :one
INSERT INTO category (
    category_name
) VALUES (
             $1
         )
RETURNING *;

-- name: GetCategory :many
SELECT * FROM category
WHERE category_id = $1 AND deleted_at IS NULL
ORDER BY category_id
LIMIT $2
OFFSET $3;

-- name: ListCategory :many
SELECT * FROM category
WHERE deleted_at IS NULL
ORDER BY category_id
LIMIT $1
OFFSET $2;

-- name: UpdateCategoryName :one
UPDATE category
SET category_name = $1, updated_at = now()
WHERE category_id = $2 AND deleted_at IS NULL
RETURNING  *;

-- name: DeleteCategoryTemporarily :one
UPDATE category
SET deleted_at = now()
WHERE category_id = $1 AND deleted_at IS NULL
RETURNING  *;

-- name: RestoreCategory :one
UPDATE category
SET deleted_at = NULL
WHERE category_id = $1 AND deleted_at IS NOT NULL
RETURNING  *;

-- name: DeleteCategory :one
DELETE FROM category WHERE category_id = $1 RETURNING *;