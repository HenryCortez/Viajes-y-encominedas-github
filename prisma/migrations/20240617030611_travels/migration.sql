/*
  Warnings:

  - The `status` column on the `travels` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[assignmentHistoryId]` on the table `travels` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Activo', 'Viajando', 'Cancelado', 'Finalizado');

-- AlterTable
ALTER TABLE "assignment_histories" ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "travels" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Activo';

-- CreateIndex
CREATE UNIQUE INDEX "travels_assignmentHistoryId_key" ON "travels"("assignmentHistoryId");
