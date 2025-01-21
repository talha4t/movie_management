/*
  Warnings:

  - You are about to drop the column `is_report` on the `reports` table. All the data in the column will be lost.
  - You are about to drop the column `resolved_at` on the `reports` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "reports" DROP COLUMN "is_report",
DROP COLUMN "resolved_at";
