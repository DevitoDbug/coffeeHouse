package api

import (
	db "coffeeHouse_API/db/sqlc"
	"database/sql"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
	"time"
)

type OrderItemForAGivenUser struct {
	ProductVariantID int64   `json:"product_variant_id" binding:"required,min=1"`
	Quantity         int32   `json:"quantity" binding:"required,min=1"`
	PricePerItem     float64 `json:"price_per_item" binding:"required,min=1"`
}

type CreateOrderRequest struct {
	UserId     int64                    `json:"user_id" binding:"required,min=1"`
	OrderItems []OrderItemForAGivenUser `json:"order_items" binding:"required"`
}

type CreatedOrderResponse struct {
	UserId     int64                    `json:"user_id" `
	CreatedAt  time.Time                `json:"createdAt"`
	OrderItems []OrderItemForAGivenUser `json:"order_items"`
}

func (s *Server) createOrder(ctx *gin.Context) {
	var createOrderRequest CreateOrderRequest
	if err := ctx.ShouldBind(&createOrderRequest); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	//create a customer order
	createCustomerOrderParam := sql.NullInt64{
		Int64: createOrderRequest.UserId,
		Valid: true,
	}
	createdCustomerOrder, err2 := s.store.CreateCustomerOrder(ctx, createCustomerOrderParam)
	if err2 != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err2))
		return
	}

	var orderItemsForUser []OrderItemForAGivenUser
	for _, item := range createOrderRequest.OrderItems {
		arg := db.CreateOrderItemParams{
			Quantity: sql.NullInt32{
				Int32: item.Quantity,
				Valid: true,
			},
			PricePerItem: fmt.Sprintf("%f", item.PricePerItem),
			ProductVariantID: sql.NullInt64{
				Int64: item.ProductVariantID,
				Valid: true,
			},
			CustomerOrderID: createdCustomerOrder.UsrID,
		}
		createdOrderItem, err3 := s.store.CreateOrderItem(ctx, arg)
		if err3 != nil {
			ctx.JSON(http.StatusInternalServerError, errorResponse(err3))
			return
		}

		price, err4 := strconv.ParseFloat(createdOrderItem.PricePerItem, 64)
		if err4 != nil {
			price = 0
			return
		}
		orderItemsForUser = append(orderItemsForUser, OrderItemForAGivenUser{
			Quantity:         createdOrderItem.Quantity.Int32,
			PricePerItem:     price,
			ProductVariantID: createdOrderItem.ProductVariantID.Int64,
		})
	}

	res := CreatedOrderResponse{
		UserId:     createdCustomerOrder.UsrID.Int64,
		OrderItems: orderItemsForUser,
		CreatedAt:  createdCustomerOrder.CreatedAt,
	}
	ctx.JSON(http.StatusOK, res)
}
