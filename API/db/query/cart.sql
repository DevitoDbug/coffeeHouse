-- name: CreateCart :one
INSERT INTO "cart" (
                    usr_id
) VALUES (
             $1
         )
RETURNING *;

-- name: GetCarts :one
SELECT * FROM "cart"
WHERE cart_id = $1;

-- name: ListCarts :many
SELECT * FROM "cart"
ORDER BY usr_id
LIMIT $1
OFFSET $2;

-- name: DeleteCart :one
DELETE FROM "cart" WHERE cart_id = $1 RETURNING *;