-- name: CreateOrderItem :one
INSERT INTO order_item  (
              quantity, price_per_item, product_variant_id, customer_order_id
) VALUES (
             $1 , $2 , $3 , $4
         )
RETURNING *;

-- name: GetOrderItem :one
SELECT * FROM order_item
WHERE order_item_id = $1;

-- name: ListOrderItems :many
SELECT * FROM order_item
ORDER BY customer_order_id, product_variant_id
LIMIT $1
OFFSET $2;

-- name: ListOrderItemsForSpecificCustomerOrder :many
SELECT * FROM order_item
WHERE customer_order_id = $1
ORDER BY product_variant_id
LIMIT $2
OFFSET $3;

-- name: DeleteOrderItem :exec
DELETE FROM order_item
WHERE order_item_id = $1;