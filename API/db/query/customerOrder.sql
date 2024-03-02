-- name: CreateOrder :one
INSERT INTO customer_order (
    usr_id
) VALUES (
             $1
         )
RETURNING *;

-- name: ListOrders :many
SELECT * FROM customer_order
ORDER BY customer_order_id
LIMIT $1
OFFSET $2;

-- name: GetSpecificOrder :one
SELECT * FROM customer_order
WHERE usr_id = $1;

-- name: DeleteOrder :one
DELETE FROM customer_order WHERE customer_order_id = $1 RETURNING *;