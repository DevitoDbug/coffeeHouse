-- name: CreateCustomerOrder :one
INSERT INTO customer_order (
    usr_id
) VALUES (
             $1
         )
RETURNING *;

-- name: GetSpecificCustomerOrder :one
SELECT * FROM customer_order
WHERE customer_order_id = $1
ORDER BY created_at;

-- name: ListAllCustomerOrders :many
SELECT * FROM customer_order
ORDER BY usr_id, created_at
LIMIT $1
OFFSET $2;

-- name: ListCustomerOrdersForSpecificUser :many
SELECT
    customer_order.usr_id,
    order_item.order_item_id,
    order_item.quantity,
    order_item.price_per_item,
    product.pd_name,
    image.img_name,
    image.img_url,
    image.alt_text,
    category.category_name,
    attribute.att_value,
    attribute.abbreviations
FROM customer_order
JOIN order_item ON customer_order.customer_order_id = order_item.customer_order_id
JOIN product_variant ON order_item.product_variant_id = product_variant.product_variant_id
JOIN product ON product_variant.pd_id = product.pd_id
JOIN image ON product.img_id = image.img_id
JOIN category ON product.category_id = category.category_id
JOIN attribute ON product_variant.att_id = attribute.att_id
WHERE customer_order.usr_id = $1
ORDER BY customer_order.created_at DESC, attribute.abbreviations
LIMIT $2
OFFSET $3;

-- name: DeleteCustomerOrder :exec
DELETE FROM customer_order
WHERE customer_order_id = $1;