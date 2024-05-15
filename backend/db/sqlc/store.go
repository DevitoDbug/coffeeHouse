package db

import (
	"database/sql"
)

type Store struct {
	db *sql.DB
	*Queries
}

func NewStore(db *sql.DB) *Store {
	return &Store{
		db:      db,
		Queries: New(db),
	}
}

//Your code seems to attempt bulk insertion of order items belonging to one user. However, there are a few issues and improvements to consider:
//
//Transaction Handling: When you're performing multiple related operations like creating customer orders and inserting order items, it's typically a good practice to wrap them in a transaction. This ensures data consistency and atomicity, meaning that either all operations succeed or none of them do. In your code, if an error occurs after some order items have been inserted, the customer order would still be created, leading to inconsistency.
//
//Error Handling: It seems there's an error in your return statement. You're currently returning an empty CreatedOrderForUser struct, but you should return the created order instead.
//
//Unused Customer ID: You're not assigning the arg.CustomerId to createdOrderForUser.CustomerId. It seems you intended to return the customer ID along with the order items.
//
//Handling the Rows: In your loop where you're scanning the rows, you're not checking for errors returned by rows.Next().
//
//Returning Error: You're returning nil in case of an error when creating the customer order in the order table (err4). You should return the actual error instead.
//
//Here's an improved version of your function considering these points:
//
//go
//Copy code
//func (s *Store) BulkOrderInsertForOneUser(ctx context.Context, arg BulkOrderInsertForOneUserParams) (CreatedOrderForUser, error) {
//	var createdOrderForUser CreatedOrderForUser
//
//	// Start a transaction
//	tx, err := s.db.BeginTx(ctx, nil)
//	if err != nil {
//		return createdOrderForUser, err
//	}
//	defer tx.Rollback() // Rollback the transaction if function returns before committing
//
//	// Creating the customer order
//	customerOrder, err := s.Queries.CreateCustomerOrder(ctx, arg.CustomerId)
//	if err != nil {
//		return createdOrderForUser, err
//	}
//
//	placeholders := make([]string, len(arg.OrderItems))
//	values := make([]interface{}, 0, len(arg.OrderItems)*4) // 4 placeholders per item
//
//	for _, item := range arg.OrderItems {
//		placeholders = append(placeholders, "(?, ?, ?, ?)")
//		values = append(values, item.Quantity.Int32)
//		values = append(values, item.PricePerItem)
//		values = append(values, item.ProductVariantID.Int64)
//		values = append(values, customerOrder.CustomerOrderID)
//	}
//
//	// Construct the query with placeholders
//	query := fmt.Sprintf(bulkOrderInsertQueryString, strings.Join(placeholders, ", "))
//
//	// Execute the query with prepared statement in the transaction
//	rows, err := tx.QueryContext(ctx, query, values...)
//	if err != nil {
//		return createdOrderForUser, err
//	}
//	defer rows.Close()
//
//	// Scan the rows and collect inserted order items
//	items := []OrderItem{}
//	for rows.Next() {
//		var i OrderItem
//		if err := rows.Scan(
//			&i.OrderItemID,
//			&i.CreatedAt,
//			&i.Quantity,
//			&i.PricePerItem,
//			&i.ProductVariantID,
//			&i.CustomerOrderID,
//		); err != nil {
//			return createdOrderForUser, err
//		}
//		items = append(items, i)
//	}
//
//	// Commit the transaction
//	if err := tx.Commit(); err != nil {
//		return createdOrderForUser, err
//	}
//
//	// Populate the created order for user
//	createdOrderForUser.CustomerId = customerOrder.CustomerId
//	createdOrderForUser.OrderItems = items
//
//	return createdOrderForUser, nil
//}
//In this version, I've wrapped the operations in a transaction (tx) to ensure data consistency. The transaction is committed only if all operations succeed, otherwise, it will be rolled back. Additionally, I've improved error handling and fixed the issues mentioned earlier.
//
//
//
//
//
//
