/*
  Warnings:

  - You are about to drop the column `batch` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `batch` on the `tickets_type` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `tickets_type` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `zip_code` on the `users` table. All the data in the column will be lost.
  - Added the required column `amount` to the `tickets_type` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lot` to the `tickets_type` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "batch";

-- AlterTable
ALTER TABLE "tickets_type" DROP COLUMN "batch",
DROP COLUMN "gender",
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "lot" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "address",
DROP COLUMN "created_at",
DROP COLUMN "zip_code";

-- DropEnum
DROP TYPE "Gender";
