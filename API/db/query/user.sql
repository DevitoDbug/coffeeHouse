-- name: CreateUser :one
INSERT INTO "user" (
fname, sname , email , password, "photoURL"
) VALUES (
    $1 , $2 , $3 , $4 ,$5
)
RETURNING *;

-- name: ListUsers :many
SELECT * FROM "user"
WHERE deleted_at IS NULL
ORDER BY usr_id
LIMIT $1
OFFSET $2;

-- name: UpdateUserNames :one
UPDATE "user"
SET fname = $2, sname= $3 ,updated_at = now()
WHERE usr_id = $1 AND deleted_at IS NULL
RETURNING  *;

-- name: UpdateUserEmail :one
UPDATE "user"
SET email = $2, updated_at = now()
WHERE usr_id = $1 AND deleted_at IS NULL
RETURNING  *;

-- name: UpdateUserPassword :one
UPDATE "user"
SET password = $2, updated_at = now()
WHERE usr_id = $1 AND deleted_at IS NULL
RETURNING  *;

-- name: UpdateUserPhotoURL :one
UPDATE "user"
SET "photoURL" = $2, updated_at = now()
WHERE usr_id = $1 AND deleted_at IS NULL
RETURNING  *;

-- name: DeleteUserTemporarily :one
UPDATE "user"
SET deleted_at = now()
WHERE usr_id = $1 AND deleted_at IS NULL
RETURNING  *;

-- name: RestoreUser :one
UPDATE "user"
SET deleted_at = NULL
WHERE usr_id = $1 AND deleted_at IS NOT NULL
RETURNING  *;

-- name: DeleteUser :one
DELETE FROM "user" WHERE usr_id = $1 RETURNING *;