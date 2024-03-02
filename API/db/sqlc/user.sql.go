// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.25.0
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

const deleteUser = `-- name: DeleteUser :one
DELETE FROM "user" WHERE usr_id = $1 RETURNING usr_id, created_at, updated_at, deleted_at, fname, sname, email, password, "photoURL"
`

func (q *Queries) DeleteUser(ctx context.Context, usrID int64) (User, error) {
	row := q.db.QueryRowContext(ctx, deleteUser, usrID)
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
	var items []User
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
SET deleted_at = NULL
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

const updateUserEmail = `-- name: UpdateUserEmail :one
UPDATE "user"
SET email = $2, updated_at = now()
WHERE usr_id = $1 AND deleted_at IS NULL
RETURNING  usr_id, created_at, updated_at, deleted_at, fname, sname, email, password, "photoURL"
`

type UpdateUserEmailParams struct {
	UsrID int64  `json:"usr_id"`
	Email string `json:"email"`
}

func (q *Queries) UpdateUserEmail(ctx context.Context, arg UpdateUserEmailParams) (User, error) {
	row := q.db.QueryRowContext(ctx, updateUserEmail, arg.UsrID, arg.Email)
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

const updateUserNames = `-- name: UpdateUserNames :one
UPDATE "user"
SET fname = $2, sname= $3 ,updated_at = now()
WHERE usr_id = $1 AND deleted_at IS NULL
RETURNING  usr_id, created_at, updated_at, deleted_at, fname, sname, email, password, "photoURL"
`

type UpdateUserNamesParams struct {
	UsrID int64          `json:"usr_id"`
	Fname sql.NullString `json:"fname"`
	Sname sql.NullString `json:"sname"`
}

func (q *Queries) UpdateUserNames(ctx context.Context, arg UpdateUserNamesParams) (User, error) {
	row := q.db.QueryRowContext(ctx, updateUserNames, arg.UsrID, arg.Fname, arg.Sname)
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

const updateUserPassword = `-- name: UpdateUserPassword :one
UPDATE "user"
SET password = $2, updated_at = now()
WHERE usr_id = $1 AND deleted_at IS NULL
RETURNING  usr_id, created_at, updated_at, deleted_at, fname, sname, email, password, "photoURL"
`

type UpdateUserPasswordParams struct {
	UsrID    int64  `json:"usr_id"`
	Password string `json:"password"`
}

func (q *Queries) UpdateUserPassword(ctx context.Context, arg UpdateUserPasswordParams) (User, error) {
	row := q.db.QueryRowContext(ctx, updateUserPassword, arg.UsrID, arg.Password)
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

const updateUserPhotoURL = `-- name: UpdateUserPhotoURL :one
UPDATE "user"
SET "photoURL" = $2, updated_at = now()
WHERE usr_id = $1 AND deleted_at IS NULL
RETURNING  usr_id, created_at, updated_at, deleted_at, fname, sname, email, password, "photoURL"
`

type UpdateUserPhotoURLParams struct {
	UsrID    int64          `json:"usr_id"`
	PhotoURL sql.NullString `json:"photoURL"`
}

func (q *Queries) UpdateUserPhotoURL(ctx context.Context, arg UpdateUserPhotoURLParams) (User, error) {
	row := q.db.QueryRowContext(ctx, updateUserPhotoURL, arg.UsrID, arg.PhotoURL)
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