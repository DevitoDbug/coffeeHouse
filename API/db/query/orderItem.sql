-- name: CreateOrderItem :one
INSERT INTO "order_item" (
              quantity, price_per_item, product_variant_id, customer_order_id
) VALUES (
             $1 , $2 , $3 , $4
         )
RETURNING *;

-- name: ListOrderItems :many
SELECT * FROM "order_item"
ORDER BY customer_order_id, product_variant_id
LIMIT $1
OFFSET $2;

-- name: ListOrderItemsForSpecificOrder :many
SELECT * FROM "order_item"
WHERE customer_order_id = $1
ORDER BY product_variant_id
LIMIT $2
OFFSET $3;

-- name: DeleteOrderItem :one
DELETE FROM "order_item" WHERE order_item_id = $1 RETURNING *;