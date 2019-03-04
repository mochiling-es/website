<img src="https://github.com/mochiling-es/website/blob/master/static/assets/favicon/android-chrome-192x192.png" alt="Mochilin" width=60/>

# Mochiling

A website for showing all experiences done by our members. Done with [Next.js](https://nextjs.org/) and deployed thanks to [now.sh](https://now.sh).

---

## Features

- New website created with React framework.
- Create/edit/remove members or experiences in the proper website.
- Real time changes in the members or experiences offers.
- Internationalized.
- Images for data stored in Google Storage.

---

## Pending

- [x] Localization
- [x] Read and write data from database
- [x] Migrate common components (Header, Footer, LastExperiences,...)
- [x] Migrate team page
- [x] Migrate member page
- [x] Add SEO capabilities
- [x] Create login/admin page
- [x] Create member edition/creation page
- [x] Enable CI (deploy to staging & production)
- [x] Migrate experience page
- [x] Create experience edition/creation page
- [x] Migrate 404 page
- [x] Migrate experiences page
- [x] Possibility to delete experience
- [ ] Migrate proposals page
- [ ] Migrate home
- [ ] Change static map to a Leaflet one
- [ ] Add Cookies banner
- [ ] Create a better terms-of-user page


---

## Environments

### Development

Taking for granted you have installed [node](http://nodejs.org) and you are using one of the latest versions.

```bash
> yarn
> yarn dev
```

### Staging
If you want to test your changes in a staging server, you will need to:

- Create a pull request.
- In that PR, make a comment saying: `deploy staging`.
- Probot-empty will deploy it to staging :).
- Changes will appear at [mochiling-staging.now.sh](https://mochiling-staging.now.sh).

### Production

Any branch merged into `master` branch will trigger a production build thanks to [CircleCI](https://circleci.com/). Results will be visible at [mochiling.es](https://mochiling.es).

---

## Database (*)

We only use a "database" for storing members or experiences. It has been created with Firestore (a Firebase product, bought by Google) and it is located [here](https://console.firebase.google.com/u/0/project/mochiling-production/database), if you need any access, talk with [xavijam](mailto:xavijam@gmail.com).


---

## Credits

- [Blog done with Next.js and Firestore](https://github.com/suevalov/next-blog-firestore)