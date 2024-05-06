-- name: CreateUser :one
INSERT INTO "user" (
fname, sname , email , password, "photoURL"
) VALUES (
    $1 , $2 , $3 , $4 ,$5
)
RETURNING *;

-- name: GetUser :one
SELECT * FROM "user"
WHERE usr_id = $1 AND deleted_at IS NULL;

-- name: ListAllPossibleUsers :many
SELECT * FROM "user"
WHERE deleted_at IS NULL
ORDER BY usr_id
LIMIT $1
OFFSET $2;

-- name: ListUsers :many
SELECT * FROM "user"
WHERE deleted_at IS NULL
ORDER BY usr_id
LIMIT $1
OFFSET $2;

-- name: UpdateUser :one
UPDATE "user"
SET fname = $1, sname= $2 ,"photoURL" = $3 ,password = $4 ,email=$5 ,updated_at = now()
WHERE usr_id = $6 AND deleted_at IS NULL
RETURNING  *;

-- name: DeleteUserTemporarily :one
UPDATE "user"
SET deleted_at = now()
WHERE usr_id = $1 AND deleted_at IS NULL
RETURNING  *;

-- name: RestoreUser :one
UPDATE "user"
SET deleted_at = NULL, updated_at = now()
WHERE usr_id = $1 AND deleted_at IS NOT NULL
RETURNING  *;

-- name: DeleteUser :exec
DELETE FROM "user"
WHERE usr_id = $1;