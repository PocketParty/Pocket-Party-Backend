/*
  Warnings:

  - Added the required column `senha` to the `Clientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Clientes" ADD COLUMN     "senha" TEXT NOT NULL;
