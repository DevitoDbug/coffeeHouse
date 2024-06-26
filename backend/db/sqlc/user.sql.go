// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: user.sql

package db

import (
	"context"
	"database/sql"
)

const createUser = `-- name: CreateUser :one
INSERT INTO "user" (
fname, sname , email , password, "photoURL"
) VALUES (
    $1 , $2 , $3 , $4 ,$5
)
RETURNING usr_id, created_at, updated_at, deleted_at, fname, sname, email, password, "photoURL"
`

type CreateUserParams struct {
	Fname    sql.NullString `json:"fname"`
	Sname    sql.NullString `json:"sname"`
	Email    string         `json:"email"`
	Password string         `json:"password"`
	PhotoURL sql.NullString `json:"photoURL"`
}

func (q *Queries) CreateUser(ctx context.Context, arg CreateUserParams) (User, error) {
	row := q.db.QueryRowContext(ctx, createUser,
		arg.Fname,
		arg.Sname,
		arg.Email,
		arg.Password,
		arg.PhotoURL,
	)
	var i User
	err := row.Scan(
		&i.UsrID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.DeletedAt,
		&i.Fname,
		&i.Sname,
		&i.Email,
		&i.Password,
		&i.PhotoURL,
	)
	return i, err
}

const deleteUser = `-- name: DeleteUser :exec
DELETE FROM "user"
WHERE usr_id = $1
`

func (q *Queries) DeleteUser(ctx context.Context, usrID int64) error {
	_, err := q.db.ExecContext(ctx, deleteUser, usrID)
	return err
}

const deleteUserTemporarily = `-- name: DeleteUserTemporarily :one
UPDATE "user"
SET deleted_at = now()
WHERE usr_id = $1 AND deleted_at IS NULL
RETURNING  usr_id, created_at, updated_at, deleted_at, fname, sname, email, password, "photoURL"
`

func (q *Queries) DeleteUserTemporarily(ctx context.Context, usrID int64) (User, error) {
	row := q.db.QueryRowContext(ctx, deleteUserTemporarily, usrID)
	var i User
	err := row.Scan(
		&i.UsrID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.DeletedAt,
		&i.Fname,
		&i.Sname,
		&i.Email,
		&i.Password,
		&i.PhotoURL,
	)
	return i, err
}

const getUser = `-- name: GetUser :one
SELECT usr_id, created_at, updated_at, deleted_at, fname, sname, email, password, "photoURL" FROM "user"
WHERE usr_id = $1 AND deleted_at IS NULL
`

func (q *Queries) GetUser(ctx context.Context, usrID int64) (User, error) {
	row := q.db.QueryRowContext(ctx, getUser, usrID)
	var i User
	err := row.Scan(
		&i.UsrID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.DeletedAt,
		&i.Fname,
		&i.Sname,
		&i.Email,
		&i.Password,
		&i.PhotoURL,
	)
	return i, err
}

const listAllPossibleUsers = `-- name: ListAllPossibleUsers :many
SELECT usr_id, created_at, updated_at, deleted_at, fname, sname, email, password, "photoURL" FROM "user"
WHERE deleted_at IS NULL
ORDER BY usr_id
LIMIT $1
OFFSET $2
`

type ListAllPossibleUsersParams struct {
	Limit  int32 `json:"limit"`
	Offset int32 `json:"offset"`
}

func (q *Queries) ListAllPossibleUsers(ctx context.Context, arg ListAllPossibleUsersParams) ([]User, error) {
	rows, err := q.db.QueryContext(ctx, listAllPossibleUsers, arg.Limit, arg.Offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []User{}
	for rows.Next() {
		var i User
		if err := rows.Scan(
			&i.UsrID,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.DeletedAt,
			&i.Fname,
			&i.Sname,
			&i.Email,
			&i.Password,
			&i.PhotoURL,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const listUsers = `-- name: ListUsers :many
SELECT usr_id, created_at, updated_at, deleted_at, fname, sname, email, password, "photoURL" FROM "user"
WHERE deleted_at IS NULL
ORDER BY usr_id
LIMIT $1
OFFSET $2
`

type ListUsersParams struct {
	Limit  int32 `json:"limit"`
	Offset int32 `json:"offset"`
}

func (q *Queries) ListUsers(ctx context.Context, arg ListUsersParams) ([]User, error) {
	rows, err := q.db.QueryContext(ctx, listUsers, arg.Limit, arg.Offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []User{}
	for rows.Next() {
		var i User
		if err := rows.Scan(
			&i.UsrID,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.DeletedAt,
			&i.Fname,
			&i.Sname,
			&i.Email,
			&i.Password,
			&i.PhotoURL,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const restoreUser = `-- name: RestoreUser :one
UPDATE "user"
SET deleted_at = NULL, updated_at = now()
WHERE usr_id = $1 AND deleted_at IS NOT NULL
RETURNING  usr_id, created_at, updated_at, deleted_at, fname, sname, email, password, "photoURL"
`

func (q *Queries) RestoreUser(ctx context.Context, usrID int64) (User, error) {
	row := q.db.QueryRowContext(ctx, restoreUser, usrID)
	var i User
	err := row.Scan(
		&i.UsrID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.DeletedAt,
		&i.Fname,
		&i.Sname,
		&i.Email,
		&i.Password,
		&i.PhotoURL,
	)
	return i, err
}

const updateUser = `-- name: UpdateUser :one
UPDATE "user"
SET fname = $1, sname= $2 ,"photoURL" = $3 ,password = $4 ,email=$5 ,updated_at = now()
WHERE usr_id = $6 AND deleted_at IS NULL
RETURNING  usr_id, created_at, updated_at, deleted_at, fname, sname, email, password, "photoURL"
`

type UpdateUserParams struct {
	Fname    sql.NullString `json:"fname"`
	Sname    sql.NullString `json:"sname"`
	PhotoURL sql.NullString `json:"photoURL"`
	Password string         `json:"password"`
	Email    string         `json:"email"`
	UsrID    int64          `json:"usr_id"`
}

func (q *Queries) UpdateUser(ctx context.Context, arg UpdateUserParams) (User, error) {
	row := q.db.QueryRowContext(ctx, updateUser,
		arg.Fname,
		arg.Sname,
		arg.PhotoURL,
		arg.Password,
		arg.Email,
		arg.UsrID,
	)
	var i User
	err := row.Scan(
		&i.UsrID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.DeletedAt,
		&i.Fname,
		&i.Sname,
		&i.Email,
		&i.Password,
		&i.PhotoURL,
	)
	return i, err
}
