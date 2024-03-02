-- name: CreateAttribute :one
INSERT INTO "attribute" (
    att_value, abbreviations
) VALUES (
             $1 , $2
         )
RETURNING *;

-- name: ListAttribute :many
SELECT * FROM "attribute"
WHERE deleted_at IS NULL
ORDER BY att_id
LIMIT $1
OFFSET $2;

-- name: UpdateAttValue :one
UPDATE "attribute"
SET att_value = $2, updated_at = now()
WHERE att_id = $1 AND deleted_at IS NULL
RETURNING  *;

-- name: UpdateAbbreviations :one
UPDATE "attribute"
SET abbreviations = $2, updated_at = now()
WHERE att_id = $1 AND deleted_at IS NULL
RETURNING  *;

-- name: DeleteAttributeTemporarily :one
UPDATE "attribute"
SET deleted_at = now()
WHERE att_id = $1 AND deleted_at IS NULL
RETURNING  *;

-- name: RestoreAttribute :one
UPDATE "attribute"
SET deleted_at = NULL
WHERE att_id = $1 AND deleted_at IS NOT NULL
RETURNING  *;

-- name: DeleteAttribute :one
DELETE FROM "attribute" WHERE att_id = $1 RETURNING *;