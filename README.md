# Today was a great day 👍

https://great-ten.vercel.app/

_Work in progress - probably don't use yet..._

This is a gratitude journal app made using web components (specifically [Lit](https://lit.dev/)) and inspired by the Android app: [Presently](https://play.google.com/store/apps/details?id=journal.gratitude.com.gratitudejournal&hl=en_GB&gl=US).

It was mostly made as I moved to iOS, and there isn't a decent Presently alternative. I wanted to continue the same journal I'd used for a couple of years.

Here is a demo version with some data to check out: https://great-git-demo-atomcorp.vercel.app

## Using

The data is kept in the same format as Presently, CSV with the headings entryDate (yyyy-mm-dd) and entryContent. You can upload a Presently backup in this apps settings page. The record is saved in plaintext in your localstorage so it is only intended to be used on a device you trust, i.e. your phone. I have set it up a reminder on my phone to prompt me to fill in each day.

## Todo

- [ ] Some testing to ensure changes don't wipe people's precious thoughts
- [ ] Some actual styling
- [ ] Backup entries
- [ ] Wipe entries
- [ ] Dates should be stored in ISO
