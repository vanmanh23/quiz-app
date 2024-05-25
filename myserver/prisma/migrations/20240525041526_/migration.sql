-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "uri" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "testnameId" TEXT,
    "questionId" TEXT,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestName" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "testName" TEXT NOT NULL,
    "numOfQuestions" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "TestName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Option" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "questionId" TEXT NOT NULL,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "hint" TEXT NOT NULL,
    "answerDescription" TEXT NOT NULL,
    "testNameId" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_testnameId_key" ON "Image"("testnameId");

-- CreateIndex
CREATE UNIQUE INDEX "Image_questionId_key" ON "Image"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "TestName_testName_key" ON "TestName"("testName");
