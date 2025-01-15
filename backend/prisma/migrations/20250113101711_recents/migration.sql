-- CreateTable
CREATE TABLE "recentActivity" (
    "id" SERIAL NOT NULL,
    "action" TEXT NOT NULL,
    "changesBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recentActivity_pkey" PRIMARY KEY ("id")
);
