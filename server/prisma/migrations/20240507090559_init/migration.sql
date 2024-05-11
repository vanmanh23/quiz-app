-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "uri" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "flagtestid" INTEGER NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlagTest" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "testName" TEXT NOT NULL,
    "numOfQuestions" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "FlagTest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_flagtestid_key" ON "Image"("flagtestid");

-- CreateIndex
CREATE UNIQUE INDEX "FlagTest_id_key" ON "FlagTest"("id");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_flagtestid_fkey" FOREIGN KEY ("flagtestid") REFERENCES "FlagTest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
