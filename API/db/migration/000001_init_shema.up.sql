CREATE TABLE "user" (
                        "usr_id" bigserial PRIMARY KEY,
                        "created_at" timestamptz NOT NULL DEFAULT (now()),
                        "updated_at" timestamptz DEFAULT (now()),
                        "deleted_at" timestamptz,
                        "fname" varchar,
                        "sname" varchar,
                        "email" varchar UNIQUE NOT NULL,
                        "password" varchar UNIQUE NOT NULL,
                        "photoURL" varchar
);

CREATE TABLE "product" (
                           "pd_id" bigserial PRIMARY KEY,
                           "created_at" timestamptz NOT NULL DEFAULT (now()),
                           "updated_at" timestamptz DEFAULT (now()),
                           "deleted_at" timestamptz,
                           "pd_name" varchar UNIQUE NOT NULL,
                           "short_description" text,
                           "long_description" text,
                           "img_id" bigserial,
                           "category_id" bigserial
);

CREATE TABLE "product_variant" (
                                   "product_variant_id" bigserial PRIMARY KEY,
                                   "created_at" timestamptz NOT NULL DEFAULT (now()),
                                   "updated_at" timestamptz DEFAULT (now()),
                                   "deleted_at" timestamptz,
                                   "price" decimal NOT NULL DEFAULT 0,
                                   "pd_id" bigserial
);

CREATE TABLE "attribute" (
                             "att_id" bigserial PRIMARY KEY,
                             "created_at" timestamptz NOT NULL DEFAULT (now()),
                             "updated_at" timestamptz DEFAULT (now()),
                             "deleted_at" timestamptz,
                             "att_value" varchar,
                             "abbreviations" varchar,
                             "product_variant_id" bigserial
);

CREATE TABLE "category" (
                            "category_id" bigserial PRIMARY KEY,
                            "created_at" timestamptz DEFAULT (now()),
                            "updated_at" timestamptz DEFAULT (now()),
                            "deleted_at" timestamptz,
                            "category_name" varchar UNIQUE NOT NULL
);

CREATE TABLE "rating" (
                          "rating_id" bigserial PRIMARY KEY,
                          "created_at" timestamptz NOT NULL DEFAULT (now()),
                          "updated_at" timestamptz DEFAULT (now()),
                          "deleted_at" timestamptz,
                          "rating_value" decimal,
                          "pd_id" bigserial,
                          "usr_id" bigserial
);

CREATE TABLE "image" (
                         "img_id" bigserial PRIMARY KEY,
                         "created_at" timestamptz NOT NULL DEFAULT (now()),
                         "updated_at" timestamptz DEFAULT (now()),
                         "deleted_at" timestamptz,
                         "img_name" varchar,
                         "alt_text" varchar
);

CREATE TABLE "order" (
                         "order_id" bigserial PRIMARY KEY,
                         "created_at" timestamptz NOT NULL,
                         "usr_id" bigserial
);

CREATE TABLE "order_item" (
                              "order_item_id" bigserial PRIMARY KEY,
                              "created_at" timestamptz NOT NULL,
                              "quantity" int DEFAULT 1,
                              "price_per_item" decimal NOT NULL DEFAULT 0,
                              "product_variant_id" bigserial,
                              "order_id" bigserial
);

CREATE TABLE "cart" (
                        "cart_id" bigserial PRIMARY KEY,
                        "created_at" timestamptz NOT NULL,
                        "quantity" int DEFAULT 1,
                        "product_varriant_id" bigserial,
                        "usr_id" bigserial
);

CREATE INDEX ON "user" ("deleted_at");

CREATE INDEX ON "product" ("pd_name");

CREATE INDEX ON "product" ("deleted_at");

CREATE INDEX ON "product" ("category_id");

CREATE INDEX ON "product_variant" ("deleted_at");

CREATE INDEX ON "product_variant" ("pd_id");

CREATE INDEX ON "product_variant" ("price");

CREATE INDEX ON "category" ("category_name");

CREATE INDEX ON "rating" ("pd_id");

CREATE INDEX ON "image" ("img_name");

CREATE INDEX ON "order" ("usr_id");

CREATE INDEX ON "order_item" ("order_id");

CREATE INDEX ON "order_item" ("product_variant_id");

CREATE INDEX ON "cart" ("product_varriant_id");

CREATE INDEX ON "cart" ("usr_id");

CREATE INDEX ON "cart" ("created_at");

ALTER TABLE "product" ADD FOREIGN KEY ("img_id") REFERENCES "image" ("img_id");

ALTER TABLE "product" ADD FOREIGN KEY ("category_id") REFERENCES "category" ("category_id");

ALTER TABLE "product_variant" ADD FOREIGN KEY ("pd_id") REFERENCES "product" ("pd_id");

ALTER TABLE "attribute" ADD FOREIGN KEY ("product_variant_id") REFERENCES "product_variant" ("product_variant_id");

ALTER TABLE "rating" ADD FOREIGN KEY ("pd_id") REFERENCES "product" ("pd_id");

ALTER TABLE "rating" ADD FOREIGN KEY ("usr_id") REFERENCES "user" ("usr_id");

ALTER TABLE "order" ADD FOREIGN KEY ("usr_id") REFERENCES "user" ("usr_id");

ALTER TABLE "order_item" ADD FOREIGN KEY ("product_variant_id") REFERENCES "product_variant" ("product_variant_id");

ALTER TABLE "order_item" ADD FOREIGN KEY ("order_id") REFERENCES "order" ("order_id");

ALTER TABLE "cart" ADD FOREIGN KEY ("product_varriant_id") REFERENCES "product_variant" ("product_variant_id");

ALTER TABLE "cart" ADD FOREIGN KEY ("usr_id") REFERENCES "user" ("usr_id");