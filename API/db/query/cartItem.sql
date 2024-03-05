-- name: CreateCartItem :one
INSERT INTO cart_item (
    quantity , product_variant_id , cart_id
) VALUES (
             $1 , $2 , $3
         )
RETURNING *;

-- name: GetCartItem :one
SELECT * FROM cart_item
WHERE cart_item_id = $1;

-- name: ListCartItemForSpecificCart :many
SELECT * FROM cart_item
WHERE cart_id = $1
ORDER BY product_variant_id, cart_item.created_at DESC
LIMIT $2
OFFSET $3;

-- name: UpdateQuantity :one
UPDATE cart_item
SET quantity = $1 ,updated_at = now()
WHERE cart_id = $2
RETURNING  *;

-- name: DeleteCartItem :exec
DELETE FROM cart_item
WHERE cart_item_id = $1 ;