/*
  Warnings:

  - You are about to drop the `Template` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `template` to the `TypeDocument` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Template" DROP CONSTRAINT "Template_typeDocumentId_fkey";

-- AlterTable
ALTER TABLE "TypeDocument" ADD COLUMN     "template" TEXT NOT NULL;

-- DropTable
DROP TABLE "Template";
