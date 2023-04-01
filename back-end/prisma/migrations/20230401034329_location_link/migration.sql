/*
  Warnings:

  - Added the required column `location_link` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" ADD COLUMN     "location_link" TEXT NOT NULL;
