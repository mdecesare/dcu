---
title: DCU Backups
description: "DCU Backups is an internal tool used by DataCenterUpdate to create and verify backups of its own working files in its own Google Drive account."
---

DCU Backups is an internal tool used by DataCenterUpdate ("DCU") to create and verify backups of its
own working files.

## What it does

DCU maintains copies of the source documents supporting the intelligence it publishes, together with
its monitoring records. DCU Backups copies that material into DCU's own Google Drive account and
verifies that each stored copy is complete and readable.

## Google Drive access

The tool uses the Google Drive permission **drive.file**. That permission allows it to create,
upload, download, verify, and manage the backup files it creates in DCU's own Google Drive account.
It does not request access to unrelated files in that account.

Information obtained through Google APIs is used only to create and verify these backups. It is not
sold, used for advertising, or used to train artificial-intelligence or machine-learning models.

DCU's use of information received from Google APIs adheres to the
[Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy),
including the Limited Use requirements.

## Not a reader-facing service

DCU Backups is operated solely by DCU for its own records. It is not offered to readers, and it is
not part of the DataCenterUpdate website or newsletter.

**Website visitors and newsletter subscribers are never asked to authorize Google Drive access, and
nothing on the DataCenterUpdate website requests access to a visitor's Google account.**

## More information

How DCU handles information, including the data covered by this tool, is described in our
[Privacy Policy](/privacy). The terms applying to the DataCenterUpdate website are set out in our
[Terms of Use](/terms).

Questions: hello@datacenterupdate.com
