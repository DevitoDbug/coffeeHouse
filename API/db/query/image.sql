-- name: CreateImage :one
INSERT INTO "image" (
    img_name, alt_text
) VALUES (
             $1 , $2
         )
RETURNING *;

-- name: ListImage :many
SELECT * FROM "image"
WHERE deleted_at IS NULL
ORDER BY img_name
LIMIT $1
OFFSET $2;

-- name: GetImage :one
SELECT * FROM "image"
WHERE img_name = $1;

-- name: UpdateImageName :one
UPDATE "image"
SET img_name = $2, updated_at = now()
WHERE img_id = $1 AND deleted_at IS NULL
RETURNING  *;

-- name: UpdateImageURL :one
UPDATE "image"
SET img_url = $2, updated_at = now()
WHERE img_id = $1 AND deleted_at IS NULL
RETURNING  *;

-- name: UpdateImageAltText :one
UPDATE "image"
SET alt_text = $2, updated_at = now()
WHERE img_id = $1 AND deleted_at IS NULL
RETURNING  *;

-- name: DeleteImageTemporarily :one
UPDATE "image"
SET deleted_at = now()
WHERE img_id = $1 AND deleted_at IS NULL
RETURNING  *;

-- name: RestoreImage :one
UPDATE "image"
SET deleted_at = NULL
WHERE img_id = $1 AND deleted_at IS NOT NULL
RETURNING  *;

-- name: DeleteImage :one
DELETE FROM "image" WHERE img_id = $1 RETURNING *;