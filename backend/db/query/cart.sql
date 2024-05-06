-- name: CreateCart :one
INSERT INTO cart (
                    usr_id
) VALUES (
             $1
         )
RETURNING *;

-- name: GetCart :one
SELECT * FROM cart
WHERE cart_id = $1;

-- name: ListCarts :many
SELECT * FROM cart
ORDER BY usr_id
LIMIT $1
OFFSET $2;

-- name: ListCartItemsForSpecificUserCart :many
SELECT
    cart.cart_id,
    cart_item.quantity,
    product_variant.price,
    attribute.att_value,
    attribute.abbreviations,
    product.pd_name,
    product.short_description,
    image.img_name,
    image.img_url,
    image.alt_text,
    category.category_name
FROM cart
JOIN cart_item ON cart.cart_id = cart_item.cart_id
JOIN product_variant ON cart_item.product_variant_id = product_variant.product_variant_id
JOIN product ON product_variant.pd_id = product.pd_id
JOIN attribute ON product_variant.att_id = attribute.att_id
JOIN image ON product.img_id = image.img_id
JOIN category ON product.category_id = category.category_id
WHERE cart.usr_id = $1
    AND product_variant.deleted_at IS NULL
    AND attribute.deleted_at IS NULL
    AND product.deleted_at IS NULL
    AND image.deleted_at IS NULL
    AND category.deleted_at IS NULL
ORDER BY  product.pd_id, att_value;

-- name: DeleteCart :exec
DELETE FROM cart
WHERE cart_id = $1;