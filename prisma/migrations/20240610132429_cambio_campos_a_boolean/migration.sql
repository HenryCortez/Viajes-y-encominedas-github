/*
  Warnings:

  - You are about to drop the column `dateFile` on the `drivers` table. All the data in the column will be lost.
  - The `status` column on the `drivers` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `requests` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `dataFile` to the `drivers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "drivers" DROP COLUMN "dateFile",
ADD COLUMN     "dataFile" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "requests" DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT false;
