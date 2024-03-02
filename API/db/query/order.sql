-- name: CreateOrder :one
INSERT INTO order (
    usr_id
) VALUES (
             $1
         )
RETURNING *;

-- name: ListOrders :many
SELECT * FROM order
ORDER BY order_id
LIMIT $1
OFFSET $2;

-- name: GetSpecificOrder :one
SELECT * FROM order
WHERE usr_id = $1;

-- name: DeleteOrder :one
DELETE FROM "order" WHERE order_id = $1 RETURNING *;