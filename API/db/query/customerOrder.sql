-- name: CreateCustomerOrder :one
INSERT INTO customer_order (
    usr_id
) VALUES (
             $1
         )
RETURNING *;

-- name: ListCustomerOrders :many
SELECT * FROM customer_order
ORDER BY usr_id, created_at
LIMIT $1
OFFSET $2;

-- name: GetSpecificCustomerOrder :one
SELECT * FROM customer_order
WHERE usr_id = $1
ORDER BY created_at;

-- name: DeleteCustomerOrder :one
DELETE FROM customer_order WHERE customer_order_id = $1 RETURNING *;