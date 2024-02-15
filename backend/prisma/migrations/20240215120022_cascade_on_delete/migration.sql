/*
  Warnings:

  - You are about to drop the column `teamsId` on the `players` table. All the data in the column will be lost.
  - Added the required column `teamId` to the `players` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "players" DROP CONSTRAINT "players_teamsId_fkey";

-- AlterTable
ALTER TABLE "players" DROP COLUMN "teamsId",
ADD COLUMN     "teamId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;
