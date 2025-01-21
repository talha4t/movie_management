-- AlterEnum
ALTER TYPE "ReportStatus" ADD VALUE 'PENDING';

-- AlterTable
ALTER TABLE "reports" ALTER COLUMN "status" SET DEFAULT 'REJECTED';
