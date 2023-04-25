/*
  Warnings:

  - You are about to drop the column `lot` on the `tickets_type` table. All the data in the column will be lost.
  - Added the required column `lot_number` to the `tickets_type` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tickets_type" DROP COLUMN "lot",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "lot_number" INTEGER NOT NULL;
