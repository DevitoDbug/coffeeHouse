// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.25.0

package db

import (
	"database/sql"
	"time"
)

type Attribute struct {
	AttID         int64          `json:"att_id"`
	CreatedAt     time.Time      `json:"created_at"`
	UpdatedAt     sql.NullTime   `json:"updated_at"`
	DeletedAt     sql.NullTime   `json:"deleted_at"`
	AttValue      sql.NullString `json:"att_value"`
	Abbreviations sql.NullString `json:"abbreviations"`
}

type Cart struct {
	CartID            int64         `json:"cart_id"`
	CreatedAt         time.Time     `json:"created_at"`
	Quantity          sql.NullInt32 `json:"quantity"`
	ProductVarriantID sql.NullInt64 `json:"product_varriant_id"`
	UsrID             sql.NullInt64 `json:"usr_id"`
}

type Category struct {
	CategoryID   int64        `json:"category_id"`
	CreatedAt    sql.NullTime `json:"created_at"`
	UpdatedAt    sql.NullTime `json:"updated_at"`
	DeletedAt    sql.NullTime `json:"deleted_at"`
	CategoryName string       `json:"category_name"`
}

type Image struct {
	ImgID     int64          `json:"img_id"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt sql.NullTime   `json:"updated_at"`
	DeletedAt sql.NullTime   `json:"deleted_at"`
	ImgName   sql.NullString `json:"img_name"`
	AltText   sql.NullString `json:"alt_text"`
}

type Order struct {
	OrderID   int64         `json:"order_id"`
	CreatedAt time.Time     `json:"created_at"`
	UsrID     sql.NullInt64 `json:"usr_id"`
}

type OrderItem struct {
	OrderItemID      int64         `json:"order_item_id"`
	CreatedAt        time.Time     `json:"created_at"`
	Quantity         sql.NullInt32 `json:"quantity"`
	PricePerItem     string        `json:"price_per_item"`
	ProductVariantID sql.NullInt64 `json:"product_variant_id"`
	OrderID          sql.NullInt64 `json:"order_id"`
}

type Product struct {
	PdID             int64          `json:"pd_id"`
	CreatedAt        time.Time      `json:"created_at"`
	UpdatedAt        sql.NullTime   `json:"updated_at"`
	DeletedAt        sql.NullTime   `json:"deleted_at"`
	PdName           string         `json:"pd_name"`
	ShortDescription sql.NullString `json:"short_description"`
	LongDescription  sql.NullString `json:"long_description"`
	ImgID            sql.NullInt64  `json:"img_id"`
	CategoryID       sql.NullInt64  `json:"category_id"`
}

type ProductVariant struct {
	ProductVariantID int64         `json:"product_variant_id"`
	CreatedAt        time.Time     `json:"created_at"`
	UpdatedAt        sql.NullTime  `json:"updated_at"`
	DeletedAt        sql.NullTime  `json:"deleted_at"`
	Price            string        `json:"price"`
	PdID             sql.NullInt64 `json:"pd_id"`
	AttID            sql.NullInt64 `json:"att_id"`
}

type Rating struct {
	RatingID    int64          `json:"rating_id"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   sql.NullTime   `json:"updated_at"`
	DeletedAt   sql.NullTime   `json:"deleted_at"`
	RatingValue sql.NullString `json:"rating_value"`
	PdID        sql.NullInt64  `json:"pd_id"`
	UsrID       sql.NullInt64  `json:"usr_id"`
}

type User struct {
	UsrID     int64          `json:"usr_id"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt sql.NullTime   `json:"updated_at"`
	DeletedAt sql.NullTime   `json:"deleted_at"`
	Fname     sql.NullString `json:"fname"`
	Sname     sql.NullString `json:"sname"`
	Email     string         `json:"email"`
	Password  string         `json:"password"`
	PhotoURL  sql.NullString `json:"photoURL"`
}
