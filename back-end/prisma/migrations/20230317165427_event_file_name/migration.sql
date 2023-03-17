/*
  Warnings:

  - Added the required column `file_name` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" ADD COLUMN     "file_name" TEXT NOT NULL;
