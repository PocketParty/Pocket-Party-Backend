-- CreateTable
CREATE TABLE "addresses" (
    "address_id" SERIAL NOT NULL,
    "enterprise_id" INTEGER NOT NULL,
    "estado" VARCHAR(100) NOT NULL,
    "cidade" VARCHAR(100) NOT NULL,
    "bairro" VARCHAR(100) NOT NULL,
    "rua" VARCHAR(100) NOT NULL,
    "numero" VARCHAR(20) NOT NULL,
    "cep" VARCHAR(20) NOT NULL,
    "complemento" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("address_id")
);

-- CreateTable
CREATE TABLE "contacts" (
    "contact_id" SERIAL NOT NULL,
    "enterprise_id" INTEGER NOT NULL,
    "contact_type" VARCHAR(50) NOT NULL,
    "contact_value" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("contact_id")
);

-- CreateTable
CREATE TABLE "enterprises" (
    "enterprise_id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "cnpj" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "enterprises_pkey" PRIMARY KEY ("enterprise_id")
);

-- CreateTable
CREATE TABLE "enterprises_tags" (
    "enterprise_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,

    CONSTRAINT "enterprises_tags_pkey" PRIMARY KEY ("enterprise_id","tag_id")
);

-- CreateTable
CREATE TABLE "product_tags" (
    "product_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,

    CONSTRAINT "product_tags_pkey" PRIMARY KEY ("product_id","tag_id")
);

-- CreateTable
CREATE TABLE "products" (
    "product_id" SERIAL NOT NULL,
    "enterprise_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "photo_url" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "tags" (
    "tag_id" SERIAL NOT NULL,
    "tag_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("tag_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "enterprises_username_key" ON "enterprises"("username");

-- CreateIndex
CREATE UNIQUE INDEX "enterprises_cnpj_key" ON "enterprises"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "tags_tag_name_key" ON "tags"("tag_name");

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_enterprise_id_fkey" FOREIGN KEY ("enterprise_id") REFERENCES "enterprises"("enterprise_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_enterprise_id_fkey" FOREIGN KEY ("enterprise_id") REFERENCES "enterprises"("enterprise_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "enterprises_tags" ADD CONSTRAINT "enterprises_tags_enterprise_id_fkey" FOREIGN KEY ("enterprise_id") REFERENCES "enterprises"("enterprise_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "enterprises_tags" ADD CONSTRAINT "enterprises_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("tag_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_tags" ADD CONSTRAINT "product_tags_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_tags" ADD CONSTRAINT "product_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("tag_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_enterprise_id_fkey" FOREIGN KEY ("enterprise_id") REFERENCES "enterprises"("enterprise_id") ON DELETE CASCADE ON UPDATE NO ACTION;

--populate_tags
INSERT INTO "tags" (tag_name) VALUES('Aniversário'),('Casamento'),('Formatura'),('Festa Infantil'),('Pool Party'),('Noivado'),('Cerimônias'),('Cerimônias Religiosas'),('Balões'),('Serviços'),('Bebidas'),('Buffet'),('Descartáveis'),('Decoração'),('Brinquedos');