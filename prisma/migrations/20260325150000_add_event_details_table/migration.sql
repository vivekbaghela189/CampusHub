CREATE TABLE "EventDetails" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "eventDate" TEXT,
    "eventTime" TEXT,
    "venue" TEXT,
    "rules" TEXT,
    "privacyNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventDetails_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "EventDetails_eventId_key" ON "EventDetails"("eventId");

ALTER TABLE "EventDetails"
ADD CONSTRAINT "EventDetails_eventId_fkey"
FOREIGN KEY ("eventId") REFERENCES "Event"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
