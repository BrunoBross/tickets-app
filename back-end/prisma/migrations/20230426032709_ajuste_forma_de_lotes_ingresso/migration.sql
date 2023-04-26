/*
  Warnings:

  - You are about to drop the column `event_id` on the `tickets` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_type_id` on the `tickets` table. All the data in the column will be lost.
  - You are about to drop the column `active` on the `tickets_type` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `tickets_type` table. All the data in the column will be lost.
  - You are about to drop the column `event_id` on the `tickets_type` table. All the data in the column will be lost.
  - You are about to drop the column `lot_number` on the `tickets_type` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `tickets_type` table. All the data in the column will be lost.
  - You are about to drop the column `tax` on the `tickets_type` table. All the data in the column will be lost.
  - Added the required column `ticket_lot_id` to the `tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `tickets_type` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_event_id_fkey";

-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_ticket_type_id_fkey";

-- DropForeignKey
ALTER TABLE "tickets_type" DROP CONSTRAINT "tickets_type_event_id_fkey";

-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "event_id",
DROP COLUMN "ticket_type_id",
ADD COLUMN     "ticket_lot_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tickets_type" DROP COLUMN "active",
DROP COLUMN "amount",
DROP COLUMN "event_id",
DROP COLUMN "lot_number",
DROP COLUMN "price",
DROP COLUMN "tax",
ADD COLUMN     "description" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ticket_lot" (
    "id" TEXT NOT NULL,
    "amount_available" INTEGER NOT NULL,
    "lot_number" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "tax" DOUBLE PRECISION NOT NULL,
    "total_price" DOUBLE PRECISION NOT NULL,
    "ticket_type_id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,

    CONSTRAINT "ticket_lot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ticket_lot" ADD CONSTRAINT "ticket_lot_ticket_type_id_fkey" FOREIGN KEY ("ticket_type_id") REFERENCES "tickets_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_lot" ADD CONSTRAINT "ticket_lot_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_ticket_lot_id_fkey" FOREIGN KEY ("ticket_lot_id") REFERENCES "ticket_lot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
