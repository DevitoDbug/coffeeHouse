-- name: CreateCustomerOrder :one
INSERT INTO customer_order (
    usr_id
) VALUES (
             $1
         )
RETURNING *;

-- name: ListCustomerOrders :many
SELECT * FROM customer_order
ORDER BY customer_order_id
LIMIT $1
OFFSET $2;

-- name: GetSpecificCustomerOrder :one
SELECT * FROM customer_order
WHERE usr_id = $1;

-- name: DeleteCustomerOrder :one
DELETE FROM customer_order WHERE customer_order_id = $1 RETURNING *;